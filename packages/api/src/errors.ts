import type { ResponseMetadata, TransportErrorCode } from './types.js';

const inspect = Symbol.for('nodejs.util.inspect.custom');

export class PomeloApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly requestId: string | undefined;
  readonly metadata: ResponseMetadata;
  /** Server-provided details. Treat these as potentially sensitive; do not log them. */
  declare readonly details: unknown;
  /** Original error envelope, available explicitly and excluded from default inspection. */
  declare readonly payload: unknown;

  constructor(status: number, code: string, metadata: ResponseMetadata, details?: unknown, payload?: unknown) {
    super(`Pomelo API request failed (HTTP ${status}).`);
    this.name = 'PomeloApiError';
    this.status = status;
    this.code = code;
    this.requestId = metadata.requestId;
    this.metadata = metadata;
    Object.defineProperty(this, 'details', { value: details, enumerable: false });
    Object.defineProperty(this, 'payload', { value: payload, enumerable: false });
  }

  [inspect](): object {
    return { name: this.name, message: this.message, status: this.status, code: this.code, requestId: this.requestId, metadata: this.metadata };
  }
}

export class PomeloTransportError extends Error {
  readonly code: TransportErrorCode;
  readonly metadata: ResponseMetadata | undefined;

  constructor(code: TransportErrorCode, metadata?: ResponseMetadata) {
    const messages: Record<TransportErrorCode, string> = {
      INVALID_OPTIONS: 'Pomelo client options are invalid.',
      UNSUPPORTED_RUNTIME: 'Pomelo API tokens may only be used on a supported Node.js server.',
      NETWORK_ERROR: 'Pomelo API request could not reach the server.',
      TIMEOUT: 'Pomelo API request timed out.',
      ABORTED: 'Pomelo API request was cancelled.',
      INVALID_RESPONSE: 'Pomelo API returned an invalid response.',
    };
    super(messages[code]);
    this.name = 'PomeloTransportError';
    this.code = code;
    this.metadata = metadata;
  }
}
