import assert from 'node:assert/strict';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import openapiTS, { astToString } from 'openapi-typescript';
import { verifyContract } from './lib/contract-policy.mjs';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const source = verifyContract(
  await readFile(join(root, 'contracts/openapi.json'), 'utf8'),
  JSON.parse(await readFile(join(root, 'contracts/manifest.json'), 'utf8')),
);
const target = join(root, 'packages/api/src/generated/openapi.ts');
const generated = '// Generated from the reviewed public API description. Do not edit manually.\n' + astToString(await openapiTS(source, { alphabetize: true }));
if (process.argv.includes('--check')) {
  assert.equal(await readFile(target, 'utf8'), generated, 'Generated public API types are stale. Run npm run generate.');
} else {
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, generated);
}
console.log(`Public contract checksum verified; generated types ${process.argv.includes('--check') ? 'are current' : 'updated'}.`);
