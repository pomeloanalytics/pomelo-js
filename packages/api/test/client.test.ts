import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import { createPomeloClient, PomeloApiError } from '../src/index.js';
import type { ApiData, ApiPath, PomeloClient, components, Fetch } from '../src/index.js';

const token = 'synthetic-test-token';
const siteId = 'site-test';
const tenantId = 'tenant-test';
const from = '2026-10-01';
const to = '2026-10-24';
const range = { siteId, tenantId, from, to };
const report = { ...range, compare: 'prev_period', traffic: 'humans', limit: 2000 } as const;

const availability: components['schemas']['ReportAvailability'] = {
  route: 'future-public-route-id',
  classification: 'mixed',
  currentProfile: 'extended',
  collectionProfileEffectiveAt: '2026-10-12T00:00:00Z',
  current: { requestedStart: '2026-10-01T00:00:00Z', requestedEnd: '2026-10-24T23:59:59Z', compatibleStart: '2026-10-01T00:00:00Z', compatibleEnd: '2026-10-24T23:59:59Z', status: 'available', reason: 'strict_safe_route' },
  compare: null,
  readModel: { strictSafe: ['future-baseline-slice'], extended: ['future-enriched-slice'] },
  sections: [{ id: 'future-public-section-id', classification: 'extended_only', current: { requestedStart: '2026-10-01T00:00:00Z', requestedEnd: '2026-10-24T23:59:59Z', compatibleStart: '2026-10-12T00:00:00Z', compatibleEnd: '2026-10-24T23:59:59Z', status: 'partially_available_after_effective_at', reason: 'requested_period_crosses_profile_change' }, compare: null }],
};
const meta: components['schemas']['MeteredMeta'] = {
  request_id: 'api-body-request',
  units_charged: 3,
  billable_overage: true,
  usage: { used_units: 110, overage_units: 10, included_units: 100, hard_cap_units: 200 },
};
const timeseries = { points: [{ ts: '2026-10-01T00:00:00Z', value: 12 }], availability, meta, future_field: { retained: true } } satisfies ApiData<'/v1/metrics/timeseries'> & { future_field: unknown };

function mock(payload: unknown = timeseries, status = 200): { client: PomeloClient; urls: URL[]; headers: Headers[] } {
  const urls: URL[] = [];
  const headers: Headers[] = [];
  const fetch: Fetch = async (input, init) => {
    urls.push(new URL(String(input)));
    headers.push(new Headers(init?.headers));
    assert.equal(init?.method, 'GET');
    return Response.json(payload, { status, headers: { 'X-Request-Id': 'header-request', 'X-RateLimit-Limit': '120', 'X-RateLimit-Remaining': '119', 'X-RateLimit-Reset': '1900000000' } });
  };
  return { client: createPomeloClient({ token, fetch }), urls, headers };
}

const cases: { path: ApiPath; invoke: (client: PomeloClient) => Promise<unknown>; expected: Record<string, string> }[] = [
  { path: '/v1/me', invoke: (client) => client.me(), expected: {} },
  { path: '/v1/sites', invoke: (client) => client.sites.list(), expected: {} },
  { path: '/v1/tenants', invoke: (client) => client.tenants.list({ siteId }), expected: { site_id: siteId } },
  { path: '/v1/metrics/timeseries', invoke: (client) => client.metrics.timeseries({ ...range, metric: 'sessions', interval: 'hour', filters: '{"device":"mobile"}' }), expected: { site_id: siteId, tenant_id: tenantId, from, to, metric: 'sessions', interval: 'hour', filters: '{"device":"mobile"}' } },
  { path: '/v1/metrics/breakdown', invoke: (client) => client.metrics.breakdown({ ...range, metric: 'events', dimension: 'tenant', limit: 500, filters: '{"device":"mobile"}' }), expected: { site_id: siteId, tenant_id: tenantId, from, to, metric: 'events', dimension: 'tenant', limit: '500', filters: '{"device":"mobile"}' } },
  { path: '/v1/reports/overview', invoke: (client) => client.reports.overview(report), expected: { site_id: siteId, tenant_id: tenantId, from, to, compare: 'prev_period', traffic: 'humans', limit: '2000' } },
  { path: '/v1/reports/content', invoke: (client) => client.reports.content({ ...report, include: 'summary' }), expected: { site_id: siteId, tenant_id: tenantId, from, to, compare: 'prev_period', traffic: 'humans', limit: '2000', include: 'summary' } },
  { path: '/v1/reports/acquisition', invoke: (client) => client.reports.acquisition({ ...report, include: 'summary' }), expected: { site_id: siteId, tenant_id: tenantId, from, to, compare: 'prev_period', traffic: 'humans', limit: '2000', include: 'summary' } },
  { path: '/v1/reports/actions', invoke: (client) => client.reports.actions({ ...report, include: 'summary', actionFamily: 'forms', actionKey: 'contact_submit' }), expected: { site_id: siteId, tenant_id: tenantId, from, to, compare: 'prev_period', traffic: 'humans', limit: '2000', include: 'summary', action_family: 'forms', action_key: 'contact_submit' } },
  { path: '/v1/goals', invoke: (client) => client.goals.list({ siteId }), expected: { site_id: siteId } },
  { path: '/v1/goals/conversions', invoke: (client) => client.goals.conversions(report), expected: { site_id: siteId, tenant_id: tenantId, from, to, compare: 'prev_period', traffic: 'humans', limit: '2000' } },
  { path: '/v1/usage/current', invoke: (client) => client.usage.current(), expected: {} },
  { path: '/v1/usage/history', invoke: (client) => client.usage.history({ from, to }), expected: { from, to } },
];

interface Parameter { name: string; in: string; required?: boolean; $ref?: string }
interface Contract { paths: Record<string, { get: { parameters: Parameter[] } }>; components: { parameters: Record<string, Parameter> } }
const contract: Contract = JSON.parse(await readFile('contracts/openapi.json', 'utf8')) as Contract;

test('facade covers exactly the 13 reviewed public routes', () => {
  assert.deepEqual(cases.map(({ path }) => path).sort(), Object.keys(contract.paths).sort());
});

for (const { path, invoke, expected } of cases) {
  test(`${path} sends the exact contract parameters in one GET and preserves the body`, async () => {
    const { client, urls, headers } = mock();
    const response = await invoke(client);
    assert.equal(urls.length, 1);
    assert.equal(urls[0]?.pathname, path);
    assert.deepEqual(Object.fromEntries(urls[0]?.searchParams ?? []), expected);
    const parameters = contract.paths[path]?.get.parameters.map((parameter) => parameter.$ref ? contract.components.parameters[parameter.$ref.split('/').at(-1) ?? ''] : parameter).filter((parameter) => parameter?.in === 'query') ?? [];
    assert.deepEqual(Object.keys(expected).sort(), parameters.map((parameter) => parameter?.name).sort());
    assert.deepEqual(response, { data: timeseries, metadata: { requestId: 'header-request', rateLimit: { limit: 120, remaining: 119, reset: 1900000000 }, metering: meta } });
    assert.equal(headers[0]?.get('authorization'), `Bearer ${token}`);
    assert.match(headers[0]?.get('x-request-id') ?? '', /^[0-9a-f-]{36}$/);
  });
}

test('typed response preserves partial availability, opaque IDs, charging and additive fields', async () => {
  const { client } = mock();
  const response = await client.metrics.timeseries(range, { requestId: 'consumer-request' });
  assert.deepEqual(response.data, timeseries);
  assert.equal(response.data.availability.current.status, 'available');
  assert.equal(response.data.availability.sections[0]?.current.status, 'partially_available_after_effective_at');
  assert.equal(response.data.availability.route, 'future-public-route-id');
  assert.equal(response.data.meta.units_charged, 3);
  assert.deepEqual(response.metadata.metering, meta);
});

test('typed facade rejects an array in place of an API response object', async () => {
  const { client, urls } = mock([]);
  await assert.rejects(client.sites.list(), { code: 'INVALID_RESPONSE' });
  assert.equal(urls.length, 1);
});

test('optional query values remain omitted and server defaults are not materialized', async () => {
  const { client, urls } = mock();
  await client.metrics.timeseries({ siteId });
  await client.reports.content({ siteId, from: '2026-01-01', to: '2026-12-31' });
  await client.usage.history();
  assert.deepEqual(Object.fromEntries(urls[0]?.searchParams ?? []), { site_id: siteId });
  assert.deepEqual(Object.fromEntries(urls[1]?.searchParams ?? []), { site_id: siteId, from: '2026-01-01', to: '2026-12-31' });
  assert.equal(urls[2]?.search, '');
});

test('legacy include alias, boundary limits and encoded filters are sent without rewriting', async () => {
  const { client, urls } = mock();
  const filters = JSON.stringify({ referrer: 'example.test/a?x=1&y=2', device: 'mobile' });
  await client.reports.content({ siteId, from, to, include: 'details', limit: 2000 });
  await client.metrics.breakdown({ siteId: 'site /?&test', tenantId: 'tenant /?&test', filters, limit: 500 });
  assert.equal(urls[0]?.searchParams.get('include'), 'details');
  assert.equal(urls[0]?.searchParams.get('limit'), '2000');
  assert.equal(urls[1]?.searchParams.get('filters'), filters);
  assert.equal(urls[1]?.searchParams.get('site_id'), 'site /?&test');
  assert.equal(urls[1]?.searchParams.get('tenant_id'), 'tenant /?&test');
  assert.equal(urls[1]?.searchParams.get('limit'), '500');
});

for (const [status, code] of [[401, 'UNAUTHORIZED'], [402, 'HARD_CAP_REACHED'], [403, 'FORBIDDEN'], [409, 'REPORT_NOT_AVAILABLE_FOR_REQUESTED_PERIOD'], [422, 'RETENTION_EXCEEDED'], [429, 'RATE_LIMITED'], [500, 'NEW_SERVER_ERROR'], [503, 'ANALYTICS_UNAVAILABLE']] as const) {
  test(`facade exposes HTTP ${status} without fallback or extra requests`, async () => {
    const details = { availability, usage: meta.usage };
    const { client, urls } = mock({ error: { code, message: 'synthetic-server-message', request_id: 'error-request', details } }, status);
    await assert.rejects(client.metrics.timeseries(range), (error: unknown) => {
      assert.ok(error instanceof PomeloApiError);
      assert.equal(error.status, status);
      assert.equal(error.code, code);
      assert.equal(error.requestId, 'header-request');
      assert.deepEqual(error.details, details);
      return true;
    });
    assert.equal(urls.length, 1);
  });
}

test('invalid periods and oversized limits are left to server validation without clamping', async () => {
  const { client, urls } = mock({ error: { code: 'INVALID_PARAMS', message: 'synthetic-message', request_id: 'period-request' } }, 422);
  await assert.rejects(client.metrics.breakdown({ siteId, from: '2026-10-24', to: '2026-10-01', limit: 501 }), { status: 422, code: 'INVALID_PARAMS' });
  assert.equal(urls.length, 1);
  assert.equal(urls[0]?.searchParams.get('from'), '2026-10-24');
  assert.equal(urls[0]?.searchParams.get('to'), '2026-10-01');
  assert.equal(urls[0]?.searchParams.get('limit'), '501');
});

test('facade forwards request timeout and cancellation options', async () => {
  let calls = 0;
  const client = createPomeloClient({ token, timeoutMs: 5000, fetch: async () => { calls++; return new Promise<Response>(() => undefined); } });
  await assert.rejects(client.sites.list({ timeoutMs: 10 }), { code: 'TIMEOUT' });
  await assert.rejects(client.reports.overview({ siteId }, { signal: AbortSignal.abort() }), { code: 'ABORTED' });
  assert.equal(calls, 1);
});
