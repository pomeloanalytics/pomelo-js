# @pomeloanalytics/api

Server-side TypeScript client for the Pomelo Analytics API.

Initial local preparation: `0.1.0-beta.0`. MIT licensed. Not published.
Release configuration awaits owner approval; publication is blocked.

Use Node.js 22.13+ on the Node 22 release line or Node.js 24. The package uses ESM
and has no runtime dependencies. Keep the API token in server-side configuration.
Importing the package is safe during SSR; using it in a browser is rejected before
fetch is called.

The default API origin is `https://api.pomeloanalytics.com`. A custom HTTPS origin
and a fetch implementation can be supplied for tests or server integrations.
The default timeout is 30 seconds and covers reading the response body.

## Errors and request metadata

HTTP failures throw `PomeloApiError`, exposing `status`, `code`, `requestId`, and
`metadata`. `metadata.rateLimit` contains server-provided limits, remaining requests,
and reset time in Unix seconds. `metadata.retryAfter` preserves `Retry-After` when
provided. The SDK never retries automatically.

`details` and the original error `payload` are accessible explicitly and may
contain sensitive information. They are excluded from default JSON serialization
and Node inspection. Error messages and causes do not include raw request URLs,
tokens, server messages, or underlying network errors.

Network failures, timeouts, cancellation, unsupported browser use, and invalid
responses throw `PomeloTransportError` with a stable `code`.

Request options accept `signal`, `timeoutMs`, and an optional `requestId`, sent as
`X-Request-Id`. A new UUID is sent when none is supplied. A server request
identifier takes precedence in response metadata.

Response bodies retain API field names, including `snake_case`, `availability`,
and metering metadata. There is no cache, aggregation, or fallback endpoint.

## Local package

From the repository root:

```sh
npm ci
npm run check
```

The reviewed public contract and typed operation facade are the remaining input
for this local preparation. No API operation is exposed before that review.
