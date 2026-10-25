import assert from 'node:assert/strict';
import { inspect } from 'node:util';
import { test } from 'node:test';
import { createServer } from 'node:http';
import { once } from 'node:events';
import type { AddressInfo } from 'node:net';
import { PomeloApiError, PomeloTransportError } from '../src/errors.js';
import { Transport } from '../src/transport.js';
import type { Fetch } from '../src/types.js';

const token = 'synthetic-test-token';
const sensitive = 'synthetic-sensitive-body';

function fixture(payload: unknown, status = 200, headers: HeadersInit = {}): { transport: Transport; calls: { input: string | URL | Request; init?: RequestInit }[] } {
  const calls: { input: string | URL | Request; init?: RequestInit }[] = [];
  const fetch: Fetch = async (input, init) => {
    calls.push({ input, ...(init ? { init } : {}) });
    return Response.json(payload, { status, headers });
  };
  return { transport: new Transport({ token, fetch }), calls };
}

test('sends exactly one authenticated GET and preserves complete response fields', async () => {
  const payload = { data: [{ id: 'site-test' }], availability: { state: 'available', extra: true }, future_field: 'preserved', meta: { units_charged: 1, billable_overage: false, usage: { used_units: 3 } } };
  const { transport, calls } = fixture(payload, 200, {
    'X-Request-Id': 'server-request',
    'X-RateLimit-Limit': '120',
    'X-RateLimit-Remaining': '119',
    'X-RateLimit-Reset': '1900000000',
  });
  const result = await transport.get('/v1/me', { site_id: 'site-test', from: '2026-10-01T00:00:00Z', to: undefined }, { requestId: 'client-request' });
  assert.deepEqual(result.data, payload);
  assert.deepEqual(result.metadata, { requestId: 'server-request', rateLimit: { limit: 120, remaining: 119, reset: 1900000000 } });
  assert.equal(calls.length, 1);
  assert.equal(String(calls[0]?.input), 'https://api.pomeloanalytics.com/v1/me?site_id=site-test&from=2026-10-01T00%3A00%3A00Z');
  const init = calls[0]?.init;
  const headers = new Headers(init?.headers);
  assert.equal(headers.get('authorization'), `Bearer ${token}`);
  assert.equal(headers.get('x-request-id'), 'client-request');
  assert.equal(init?.method, 'GET');
  assert.equal(init?.credentials, 'omit');
  assert.equal(init?.redirect, 'error');
  assert.equal(init?.cache, 'no-store');
  assert.ok(init?.signal);
});

for (const [status, code] of [[401, 'UNAUTHORIZED'], [402, 'QUOTA_EXCEEDED'], [403, 'FORBIDDEN'], [409, 'MODE_NOT_ALLOWED'], [422, 'INVALID_PERIOD'], [429, 'RATE_LIMITED'], [500, 'INTERNAL_ERROR'], [503, 'FUTURE_ERROR_CODE']] as const) {
  test(`exposes structured HTTP ${status} without retry or sensitive default inspection`, async () => {
    const payload = { error: { code, message: `${sensitive} ${token}`, request_id: 'body-request', details: { reason: sensitive } } };
    const { transport, calls } = fixture(payload, status, { 'Retry-After': '12', 'X-RateLimit-Remaining': '0' });
    await assert.rejects(transport.get('/v1/me', {}), (error: unknown) => {
      assert.ok(error instanceof PomeloApiError);
      assert.equal(error.status, status);
      assert.equal(error.code, code);
      assert.equal(error.requestId, 'body-request');
      assert.equal(error.metadata.retryAfter, '12');
      assert.deepEqual(error.details, { reason: sensitive });
      assert.deepEqual(error.payload, payload);
      for (const rendered of [String(error), JSON.stringify(error), inspect(error)]) {
        assert.ok(!rendered.includes(sensitive));
        assert.ok(!rendered.includes(token));
      }
      assert.equal(error.cause, undefined);
      return true;
    });
    assert.equal(calls.length, 1);
  });
}

test('retains HTTP status if an error response is not JSON', async () => {
  const transport = new Transport({ token, fetch: async () => new Response(sensitive, { status: 503 }) });
  await assert.rejects(transport.get('/v1/me', {}), (error: unknown) => {
    assert.ok(error instanceof PomeloApiError);
    assert.equal(error.status, 503);
    assert.equal(error.code, 'HTTP_ERROR');
    assert.equal(error.payload, undefined);
    return true;
  });
});

test('invalid success JSON is a transport error', async () => {
  const transport = new Transport({ token, fetch: async () => new Response('{broken', { headers: { 'X-Request-Id': 'decode-request' } }) });
  await assert.rejects(transport.get('/v1/me', {}), (error: unknown) => {
    assert.ok(error instanceof PomeloTransportError);
    assert.equal(error.code, 'INVALID_RESPONSE');
    assert.equal(error.metadata?.requestId, 'decode-request');
    return true;
  });
});

for (const payload of [null, 'unexpected', 12, true]) {
  test(`rejects non-object success payload ${String(payload)}`, async () => {
    const { transport } = fixture(payload);
    await assert.rejects(transport.get('/v1/me', {}), { code: 'INVALID_RESPONSE' });
  });
}

test('transport preserves partial objects; route validation belongs to the public contract layer', async () => {
  const { transport } = fixture({ availability: { state: 'pending' } });
  assert.deepEqual((await transport.get('/v1/me', {})).data, { availability: { state: 'pending' } });
});

test('network errors have fixed messages and no original cause or retry', async () => {
  let calls = 0;
  const transport = new Transport({ token, fetch: async () => { calls++; throw new Error(`https://private.example/?token=${token}&body=${sensitive}`); } });
  await assert.rejects(transport.get('/v1/me', {}), (error: unknown) => {
    assert.ok(error instanceof PomeloTransportError);
    assert.equal(error.code, 'NETWORK_ERROR');
    assert.equal(error.cause, undefined);
    assert.ok(!inspect(error).includes(token));
    assert.ok(!String(error).includes(sensitive));
    return true;
  });
  assert.equal(calls, 1);
});

test('timeout ends a request even if an injected fetch ignores cancellation', async () => {
  let calls = 0;
  const transport = new Transport({ token, timeoutMs: 10, fetch: async () => { calls++; return new Promise<Response>(() => undefined); } });
  await assert.rejects(transport.get('/v1/me', {}), { code: 'TIMEOUT' });
  assert.equal(calls, 1);
});

test('timeout includes reading the response body', async () => {
  const transport = new Transport({ token, timeoutMs: 10, fetch: async () => new Response(new ReadableStream({ start() { /* Deliberately never closes. */ } })) });
  await assert.rejects(transport.get('/v1/me', {}), { code: 'TIMEOUT' });
});

test('AbortSignal cancels a request with no retry and no sensitive reason', async () => {
  const controller = new AbortController();
  let calls = 0;
  const transport = new Transport({ token, fetch: async () => { calls++; controller.abort(new Error(sensitive)); return new Promise<Response>(() => undefined); } });
  await assert.rejects(transport.get('/v1/me', {}, { signal: controller.signal }), (error: unknown) => {
    assert.ok(error instanceof PomeloTransportError);
    assert.equal(error.code, 'ABORTED');
    assert.ok(!inspect(error).includes(sensitive));
    return true;
  });
  assert.equal(calls, 1);
});

test('an already cancelled request does not call fetch', async () => {
  const { transport, calls } = fixture({});
  await assert.rejects(transport.get('/v1/me', {}, { signal: AbortSignal.abort() }), { code: 'ABORTED' });
  assert.equal(calls.length, 0);
});

test('per-request timeout overrides the client timeout', async () => {
  const transport = new Transport({ token, timeoutMs: 5000, fetch: async () => new Promise<Response>(() => undefined) });
  await assert.rejects(transport.get('/v1/me', {}, { timeoutMs: 10 }), { code: 'TIMEOUT' });
});

test('request ID headers take precedence over body IDs and outgoing IDs are preserved as fallback', async () => {
  const { transport } = fixture({ error: { code: 'NEW_SERVER_CODE', request_id: 'body-id' } }, 400, { 'X-Request-Id': 'header-id' });
  await assert.rejects(transport.get('/v1/me', {}, { requestId: 'outgoing-id' }), { requestId: 'header-id' });
  const fallback = fixture({}, 200);
  assert.equal((await fallback.transport.get('/v1/me', {}, { requestId: 'outgoing-id' })).metadata.requestId, 'outgoing-id');
});

test('ignores invalid metadata without exposing arbitrary header values', async () => {
  const { transport } = fixture({}, 200, { 'X-Request-Id': 'not a valid ID', 'X-RateLimit-Limit': '-3', 'X-RateLimit-Remaining': 'not-a-number', 'X-RateLimit-Reset': 'Infinity', 'Retry-After': 'not-a-date' });
  const metadata = (await transport.get('/v1/me', {})).metadata;
  assert.deepEqual(metadata.rateLimit, {});
  assert.match(metadata.requestId ?? '', /^[0-9a-f-]{36}$/);
  assert.equal(metadata.retryAfter, undefined);
});

test('supports the HTTP-date form of Retry-After', async () => {
  const value = 'Wed, 21 Oct 2026 07:28:00 GMT';
  const { transport } = fixture({}, 200, { 'Retry-After': value });
  assert.equal((await transport.get('/v1/me', {})).metadata.retryAfter, value);
});

test('invalid configuration and request identifiers fail safely before fetch', async () => {
  const credentialUrl = new URL('https://example.test');
  credentialUrl.username = 'user';
  credentialUrl.password = token;
  for (const baseUrl of ['not-a-url', String(credentialUrl), 'http://example.test', `https://example.test/?secret=${token}`, 'https://example.test/v1']) {
    assert.throws(() => new Transport({ token, baseUrl }), (error: unknown) => {
      assert.ok(error instanceof PomeloTransportError);
      assert.equal(error.code, 'INVALID_OPTIONS');
      assert.ok(!inspect(error).includes(token));
      return true;
    });
  }
  for (const invalidToken of ['', 'contains space', 'token\r\nheader']) assert.throws(() => new Transport({ token: invalidToken }), { code: 'INVALID_OPTIONS' });
  const { transport, calls } = fixture({});
  await assert.rejects(transport.get('/v1/me', {}, { requestId: `${token}\r\n` }), { code: 'INVALID_OPTIONS' });
  await assert.rejects(transport.get('/v1/me', {}, { timeoutMs: 0 }), { code: 'INVALID_OPTIONS' });
  assert.equal(calls.length, 0);
});

test('SSR-safe import and construction; browser token use is blocked before fetch', async () => {
  Object.defineProperty(globalThis, 'window', { value: {}, configurable: true });
  try {
    await import('../src/index.js');
    const { transport, calls } = fixture({});
    await assert.rejects(transport.get('/v1/me', {}), { code: 'UNSUPPORTED_RUNTIME' });
    assert.equal(calls.length, 0);
  } finally {
    Reflect.deleteProperty(globalThis, 'window');
  }
});

test('native fetch sends one HTTP request with UUID and preserves quota errors', async () => {
  let calls = 0;
  let outgoingId: string | undefined;
  const server = createServer((request, response) => {
    calls++;
    assert.equal(request.headers.authorization, `Bearer ${token}`);
    outgoingId = String(request.headers['x-request-id']);
    assert.match(outgoingId, /^[0-9a-f-]{36}$/);
    response.writeHead(429, { 'Content-Type': 'application/json', 'Retry-After': '5', 'X-Request-Id': 'http-mock-request' });
    response.end(JSON.stringify({ error: { code: 'QUOTA_LIMIT', request_id: 'http-mock-request', message: sensitive, details: { remaining: 0 } } }));
  });
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  try {
    const port = (server.address() as AddressInfo).port;
    const transport = new Transport({ token, fetch: async (input, init) => {
      const target = new URL(String(input));
      return fetch(`http://127.0.0.1:${port}${target.pathname}${target.search}`, init);
    } });
    await assert.rejects(transport.get('/v1/me', {}), (error: unknown) => {
      assert.ok(error instanceof PomeloApiError);
      assert.equal(error.code, 'QUOTA_LIMIT');
      assert.equal(error.requestId, 'http-mock-request');
      assert.equal(error.metadata.retryAfter, '5');
      return true;
    });
    assert.equal(calls, 1);
    assert.ok(outgoingId);
  } finally {
    server.closeAllConnections();
    await new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
});

test('native fetch does not follow redirects with API credentials', async () => {
  let calls = 0;
  const server = createServer((_request, response) => {
    calls++;
    response.writeHead(302, { Location: '/redirected' });
    response.end();
  });
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  try {
    const port = (server.address() as AddressInfo).port;
    const transport = new Transport({ token, fetch: async (_input, init) => fetch(`http://127.0.0.1:${port}/v1/me`, init) });
    await assert.rejects(transport.get('/v1/me', {}), { code: 'NETWORK_ERROR' });
    assert.equal(calls, 1);
  } finally {
    server.closeAllConnections();
    await new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
});
