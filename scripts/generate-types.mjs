import assert from 'node:assert/strict';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import openapiTS, { astToString } from 'openapi-typescript';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const source = JSON.parse(await readFile(join(root, 'contracts/public-openapi.json'), 'utf8'));
const target = join(root, 'packages/api/src/generated/openapi.ts');
const expectedPaths = [
  '/v1/me', '/v1/sites', '/v1/tenants',
  '/v1/metrics/timeseries', '/v1/metrics/breakdown',
  '/v1/reports/overview', '/v1/reports/content', '/v1/reports/acquisition', '/v1/reports/actions',
  '/v1/goals', '/v1/goals/conversions', '/v1/usage/current', '/v1/usage/history',
];
assert.deepEqual(Object.keys(source.paths).sort(), expectedPaths.sort(), 'Only reviewed public operations may enter the SDK.');
for (const item of Object.values(source.paths)) {
  for (const method of ['post', 'put', 'patch', 'delete', 'head', 'options', 'trace']) assert.ok(!(method in item), 'The initial public API client supports GET only.');
}
function checkReferences(value) {
  if (value === null || typeof value !== 'object') return;
  for (const [key, item] of Object.entries(value)) {
    if (key === '$ref') assert.ok(typeof item === 'string' && item.startsWith('#/'), 'External references are not accepted.');
    else checkReferences(item);
  }
}
checkReferences(source);
const generated = '// Generated from the reviewed public API description. Do not edit manually.\n' + astToString(await openapiTS(source, { alphabetize: true }));
if (process.argv.includes('--check')) {
  assert.equal(await readFile(target, 'utf8'), generated, 'Generated public API types are stale. Run npm run generate.');
} else {
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, generated);
}
