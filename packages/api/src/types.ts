import type { components } from './generated/openapi.js';

/** Fetch implementation, injectable for tests and server-side integrations. */
export type Fetch = (input: string | URL | Request, init?: RequestInit) => Promise<Response>;

export interface PomeloClientOptions {
  /** API token. Keep this value in server-side configuration only. */
  token: string;
  /** Defaults to https://api.pomeloanalytics.com. Custom origins must use HTTPS. */
  baseUrl?: string;
  /** Defaults to 30 seconds. Includes reading and decoding the response. */
  timeoutMs?: number;
  fetch?: Fetch;
}

export interface RequestOptions {
  signal?: AbortSignal;
  /** Override the client's timeout for this request. */
  timeoutMs?: number;
  /** Correlation identifier sent as X-Request-Id. Defaults to a new UUID. */
  requestId?: string;
}

export interface ResponseMetadata {
  requestId?: string;
  /** Value from Retry-After, when present. No retry is performed by the SDK. */
  retryAfter?: string;
  /** Original API meta object, when present. Field names and additional values are preserved. */
  metering?: components['schemas']['MeteredMeta'];
  rateLimit: {
    limit?: number;
    remaining?: number;
    /** Unix timestamp in seconds. */
    reset?: number;
  };
}

export interface ApiResponse<T> {
  data: T;
  metadata: ResponseMetadata;
}

export type TransportErrorCode =
  | 'INVALID_OPTIONS'
  | 'UNSUPPORTED_RUNTIME'
  | 'NETWORK_ERROR'
  | 'TIMEOUT'
  | 'ABORTED'
  | 'INVALID_RESPONSE';
