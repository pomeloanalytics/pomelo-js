import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createPomeloClient, PomeloApiError } from '../src/index.js';
import type { ApiData, Fetch, TenantsWriteBody, components } from '../src/index.js';

const token = 'synthetic-test-token';
const product = {} as ApiData<'/v1/me'>['product'];
const quotas: components['schemas']['Quotas'] = { included_units: 100, used_units: 10, overage_units: 0, hard_cap_units: 200, reset_at: '2026-11-30T00:00:00Z' };
const usage: components['schemas']['UsageMeta'] = { used_units: 10, overage_units: 0, included_units: 100, hard_cap_units: 200 };

function client(payload: unknown, status = 200): { pomelo: ReturnType<typeof createPomeloClient>; calls: { url: URL; init: RequestInit | undefined }[] } {
  const calls: { url: URL; init: RequestInit | undefined }[] = [];
  const fetch: Fetch = async (input, init) => {
    calls.push({ url: new URL(String(input)), init });
    return Response.json(payload, { status, headers: { 'X-Request-Id': 'header-request' } });
  };
  return { pomelo: createPomeloClient({ token, fetch }), calls };
}

test('/v1/me with an unrestricted token carries quotas', async () => {
  const { pomelo } = client({ org_id: 'org-test', rate_limits: { rps: 5 }, docs_url: 'https://docs.example.test', product, quotas });
  const { data } = await pomelo.me();
  assert.deepEqual(data.quotas, quotas);
});

test('/v1/me with a token restricted to followed workspaces has no quotas', async () => {
  const { pomelo } = client({ org_id: 'org-test', rate_limits: { rps: 5 }, docs_url: 'https://docs.example.test', product });
  const { data } = await pomelo.me();
  // Consumers must narrow: quotas is optional in the public type.
  const used: number | undefined = data.quotas?.used_units;
  assert.equal(used, undefined);
  assert.equal(Object.hasOwn(data, 'quotas'), false);
});

test('metered meta keeps usage and billable_overage for an unrestricted token and omits them for a restricted one', async () => {
  const unrestricted = client({ points: [], meta: { request_id: 'r1', units_charged: 1, billable_overage: false, usage } });
  const full = await unrestricted.pomelo.metrics.timeseries({ siteId: 'site-test' });
  assert.deepEqual(full.metadata.metering?.usage, usage);
  assert.equal(full.metadata.metering?.billable_overage, false);

  const restricted = client({ points: [], meta: { request_id: 'r2', units_charged: 1 } });
  const limited = await restricted.pomelo.metrics.timeseries({ siteId: 'site-test' });
  assert.equal(limited.metadata.metering?.usage, undefined);
  assert.equal(limited.metadata.metering?.billable_overage, undefined);
  assert.equal(limited.metadata.metering?.units_charged, 1);
});

test('tenants.write sends one JSON POST with the wire body and returns the result counts', async () => {
  const body: TenantsWriteBody = { site_id: 'site-test', tenants: [{ tenant_id: 'tenant-a', tenant_slug: 'tenant-a', tenant_name: 'Tenant A' }, { tenant_id: 'tenant-b', tenant_slug: 'tenant-b', tenant_name: 'Tenant B', status: 'INACTIVE' }] };
  const payload = {
    items: body.tenants.map((tenant) => ({ status: 'ACTIVE', ...tenant, result: 'created' })),
    created: 2, updated: 0, unchanged: 0,
  };
  const { pomelo, calls } = client(payload);
  const response = await pomelo.tenants.write(body, { requestId: 'write-request' });
  assert.equal(calls.length, 1);
  assert.equal(calls[0]?.url.pathname, '/v1/tenants');
  assert.equal(calls[0]?.url.search, '');
  assert.equal(calls[0]?.init?.method, 'POST');
  assert.equal(calls[0]?.init?.body, JSON.stringify(body));
  const headers = new Headers(calls[0]?.init?.headers);
  assert.equal(headers.get('content-type'), 'application/json');
  assert.equal(headers.get('authorization'), `Bearer ${token}`);
  assert.equal(headers.get('x-request-id'), 'write-request');
  assert.equal(response.data.created, 2);
  assert.equal(response.data.items[0]?.result, 'created');
  assert.equal(response.metadata.requestId, 'header-request');
});

test('tenants.write exposes 403 for a restricted token and 409 conflicts without retrying', async () => {
  const forbidden = client({ error: { code: 'FORBIDDEN', message: 'synthetic', request_id: 'e1' } }, 403);
  await assert.rejects(forbidden.pomelo.tenants.write({ site_id: 'site-test', tenants: [] }), (error: unknown) => error instanceof PomeloApiError && error.status === 403 && error.code === 'FORBIDDEN');
  assert.equal(forbidden.calls.length, 1);
  const conflict = client({ error: { code: 'TENANT_SLUG_CONFLICT', message: 'synthetic', request_id: 'e2' } }, 409);
  await assert.rejects(conflict.pomelo.tenants.write({ site_id: 'site-test', tenants: [] }), (error: unknown) => error instanceof PomeloApiError && error.status === 409 && error.code === 'TENANT_SLUG_CONFLICT');
  assert.equal(conflict.calls.length, 1);
});

test('tenants.write refuses a body that cannot be serialized before any request', async () => {
  const { pomelo, calls } = client({});
  const circular: Record<string, unknown> = {};
  circular.self = circular;
  await assert.rejects(pomelo.tenants.write(circular as unknown as TenantsWriteBody), { code: 'INVALID_OPTIONS' });
  assert.equal(calls.length, 0);
});
