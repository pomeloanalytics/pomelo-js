import { PomeloApiError, PomeloTransportError } from './errors.js';
import type { ApiResponse, Fetch, PomeloClientOptions, RequestOptions, ResponseMetadata } from './types.js';

type Query = Readonly<Record<string, string | number | boolean | undefined>>;

const identifier = /^[A-Za-z0-9_.:-]{1,128}$/;
const errorCode = /^[A-Za-z][A-Za-z0-9_.:-]{0,95}$/;

function assertServer(): void {
  if (typeof window !== 'undefined' || typeof process === 'undefined' || !process.versions?.node) {
    throw new PomeloTransportError('UNSUPPORTED_RUNTIME');
  }
}

function timeout(value: number | undefined): number {
  const result = value ?? 30_000;
  if (!Number.isSafeInteger(result) || result < 1 || result > 2_147_483_647) {
    throw new PomeloTransportError('INVALID_OPTIONS');
  }
  return result;
}

function record(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function responseMetadata(headers: Headers, fallbackId?: string): ResponseMetadata {
  const rawId = headers.get('x-request-id');
  const requestId = rawId && identifier.test(rawId) ? rawId : fallbackId;
  const rawRetry = headers.get('retry-after');
  const retryAfter = rawRetry && (/^\d+$/.test(rawRetry) || !Number.isNaN(Date.parse(rawRetry))) ? rawRetry : undefined;
  const numeric = (name: string): number | undefined => {
    const raw = headers.get(name);
    const value = raw && /^\d+$/.test(raw) ? Number(raw) : undefined;
    return value !== undefined && Number.isSafeInteger(value) ? value : undefined;
  };
  const limit = numeric('x-ratelimit-limit');
  const remaining = numeric('x-ratelimit-remaining');
  const reset = numeric('x-ratelimit-reset');
  return {
    ...(requestId ? { requestId } : {}),
    ...(retryAfter ? { retryAfter } : {}),
    rateLimit: { ...(limit !== undefined ? { limit } : {}), ...(remaining !== undefined ? { remaining } : {}), ...(reset !== undefined ? { reset } : {}) },
  };
}

/** Internal transport. Public operations are derived from the reviewed API contract. */
export class Transport {
  readonly #token: string;
  readonly #baseUrl: string;
  readonly #timeout: number;
  readonly #fetch: Fetch;

  constructor(options: PomeloClientOptions) {
    try {
      const url = new URL(options.baseUrl ?? 'https://api.pomeloanalytics.com');
      if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash || url.pathname !== '/') {
        throw new PomeloTransportError('INVALID_OPTIONS');
      }
      if (typeof options.token !== 'string' || !/^[\x21-\x7e]+$/.test(options.token)) {
        throw new PomeloTransportError('INVALID_OPTIONS');
      }
      this.#baseUrl = url.origin;
      this.#token = options.token;
      this.#timeout = timeout(options.timeoutMs);
      this.#fetch = options.fetch ?? globalThis.fetch;
      if (typeof this.#fetch !== 'function') throw new PomeloTransportError('INVALID_OPTIONS');
    } catch {
      throw new PomeloTransportError('INVALID_OPTIONS');
    }
  }

  async get<T>(path: string, query: Query, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    assertServer();
    if (!/^\/v1\/[a-z/]+$/.test(path) || (options.requestId !== undefined && !identifier.test(options.requestId))) {
      throw new PomeloTransportError('INVALID_OPTIONS');
    }
    const requestTimeout = timeout(options.timeoutMs ?? this.#timeout);
    if (options.signal?.aborted) throw new PomeloTransportError('ABORTED');

    const url = new URL(path, this.#baseUrl);
    for (const [name, value] of Object.entries(query)) {
      if (value !== undefined) url.searchParams.set(name, String(value));
    }
    const requestId = options.requestId ?? globalThis.crypto.randomUUID();
    const headers = new Headers({ Accept: 'application/json', Authorization: `Bearer ${this.#token}` });
    headers.set('X-Request-Id', requestId);
    const controller = new AbortController();
    let timedOut = false;
    const abort = (): void => controller.abort();
    options.signal?.addEventListener('abort', abort, { once: true });
    const timer = setTimeout(() => { timedOut = true; controller.abort(); }, requestTimeout);
    let metadata: ResponseMetadata | undefined;
    let abortRequest: (() => void) | undefined;
    const aborted = new Promise<never>((_resolve, reject) => {
      abortRequest = (): void => reject(new PomeloTransportError(timedOut ? 'TIMEOUT' : 'ABORTED', metadata));
      controller.signal.addEventListener('abort', abortRequest, { once: true });
    });
    try {
      const response = await Promise.race([this.#fetch(url, { method: 'GET', headers, signal: controller.signal, redirect: 'error', credentials: 'omit', cache: 'no-store' }), aborted]);
      metadata = responseMetadata(response.headers, requestId);
      let payload: unknown;
      try {
        payload = await Promise.race([response.json(), aborted]);
      } catch {
        if (controller.signal.aborted) throw new PomeloTransportError(timedOut ? 'TIMEOUT' : 'ABORTED', metadata);
        if (response.ok) throw new PomeloTransportError('INVALID_RESPONSE', metadata);
      }
      if (!response.ok) {
        const envelope = record(payload) && record(payload.error) ? payload.error : undefined;
        const code = typeof envelope?.code === 'string' && errorCode.test(envelope.code) ? envelope.code : 'HTTP_ERROR';
        const bodyId = typeof envelope?.request_id === 'string' && identifier.test(envelope.request_id) ? envelope.request_id : undefined;
        const headerId = response.headers.get('x-request-id');
        if ((!headerId || !identifier.test(headerId)) && bodyId) metadata = { ...metadata, requestId: bodyId };
        throw new PomeloApiError(response.status, code, metadata, envelope?.details, payload);
      }
      if (payload === null || typeof payload !== 'object') throw new PomeloTransportError('INVALID_RESPONSE', metadata);
      return { data: payload as T, metadata };
    } catch (error: unknown) {
      if (error instanceof PomeloApiError || error instanceof PomeloTransportError) throw error;
      if (controller.signal.aborted) throw new PomeloTransportError(timedOut ? 'TIMEOUT' : 'ABORTED', metadata);
      throw new PomeloTransportError('NETWORK_ERROR', metadata);
    } finally {
      clearTimeout(timer);
      if (abortRequest) controller.signal.removeEventListener('abort', abortRequest);
      options.signal?.removeEventListener('abort', abort);
    }
  }
}
