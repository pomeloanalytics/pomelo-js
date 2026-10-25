import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';

const expectedPaths = [
  '/v1/me', '/v1/sites', '/v1/tenants',
  '/v1/metrics/timeseries', '/v1/metrics/breakdown',
  '/v1/reports/overview', '/v1/reports/content', '/v1/reports/acquisition', '/v1/reports/actions',
  '/v1/goals', '/v1/goals/conversions', '/v1/usage/current', '/v1/usage/history',
].sort();

/** Verify the reviewed public input before any generation or reference resolution. */
export function verifyContract(text, manifest) {
  assert.equal(manifest.artifact?.path, 'openapi.json', 'Unexpected public contract artifact path.');
  assert.equal(createHash('sha256').update(text).digest('hex'), manifest.artifact?.sha256, 'Public contract checksum does not match its reviewed manifest.');
  const source = JSON.parse(text);
  assert.deepEqual(Object.keys(source.paths).sort(), expectedPaths, 'Only reviewed public operations may enter the SDK.');
  const operations = [];
  for (const [path, item] of Object.entries(source.paths)) {
    assert.ok(item.get, 'The initial public API client requires a GET operation for each path.');
    for (const method of ['post', 'put', 'patch', 'delete', 'head', 'options', 'trace']) assert.ok(!(method in item), 'The initial public API client supports GET only.');
    operations.push(`get ${path}`);
  }
  assert.deepEqual(manifest.operations.map(({ method, path }) => `${method} ${path}`).sort(), operations.sort(), 'Manifest operations do not match the public contract.');
  function checkReferences(value) {
    if (value === null || typeof value !== 'object') return;
    for (const [key, item] of Object.entries(value)) {
      if (key === '$ref') assert.ok(typeof item === 'string' && item.startsWith('#/'), 'External references are not accepted.');
      else checkReferences(item);
    }
  }
  checkReferences(source);
  return source;
}
