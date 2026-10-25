import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import { verifyContract } from '../lib/contract-policy.mjs';
import { assertNpmrc, assertSourceContent, assertSourceFilename } from '../lib/source-policy.mjs';

const text = await readFile(new URL('../../contracts/openapi.json', import.meta.url), 'utf8');
const manifest = JSON.parse(await readFile(new URL('../../contracts/manifest.json', import.meta.url), 'utf8'));

test('public contract accepts its reviewed checksum and operations', () => {
  const contract = verifyContract(text, manifest);
  assert.equal(Object.keys(contract.paths).length, 13);
});

test('contract checksum fails before accepting a modified artifact', () => {
  assert.throws(() => verifyContract(text + '\n', manifest), /checksum/);
});

test('contract rejects extra routes, non-GET operations, remote references and manifest drift', () => {
  const check = (change, pattern) => {
    const contract = JSON.parse(text);
    change(contract);
    const changed = JSON.stringify(contract);
    const updatedManifest = { ...manifest, artifact: { ...manifest.artifact, sha256: createHash('sha256').update(changed).digest('hex') } };
    assert.throws(() => verifyContract(changed, updatedManifest), pattern);
  };
  check((contract) => { contract.paths['/v1/unreviewed'] = { get: {} }; }, /reviewed public operations/);
  check((contract) => { contract.paths['/v1/me'].post = {}; }, /GET only/);
  check((contract) => { contract.components.schemas.Unreviewed = { $ref: 'https://example.test/schema.json' }; }, /External references/);
  assert.throws(() => verifyContract(text, { ...manifest, operations: [] }), /Manifest operations/);
});

test('npm config accepts only the two intended non-secret settings', () => {
  assertNpmrc('# repository defaults\nsave-exact=true\nignore-scripts=true\n');
  for (const extra of ['//registry.npmjs.org/:_authToken=${NODE_AUTH_TOKEN}', 'registry=https://example.test', 'ignore-scripts=false', 'save-exact=true']) {
    assert.throws(() => assertNpmrc(`save-exact=true\nignore-scripts=true\n${extra}\n`));
  }
});

test('sensitive filenames are refused independently of file contents, including empty files', () => {
  for (const filename of ['.env', '.env.local', '.env.production', 'server.pem', 'server.key', 'credentials', '.credentials', '.netrc', '_netrc']) {
    assertSourceContent('', filename);
    assert.throws(() => assertSourceFilename(filename));
  }
  for (const filename of ['.env.example', '.env.template', '.npmrc', 'LICENSE']) assertSourceFilename(filename);
});

test('source checks inspect secret-like dotenv and npm config without echoing their contents', () => {
  for (const content of ['NPM_TOKEN=synthetic-sensitive', '//registry.npmjs.org/:_authToken=synthetic-sensitive', 'AKIA' + 'A'.repeat(16), 'ghp_' + 'a'.repeat(40)]) {
    assert.throws(() => assertSourceContent(content, '.npmrc'), (error) => {
      assert.ok(!String(error).includes('synthetic-sensitive'));
      return true;
    });
  }
  assertSourceContent('save-exact=true\nignore-scripts=true\n', '.npmrc');
  assertSourceContent('const token = process.env.POMELO_API_TOKEN;', 'example.ts');
});
