# @pomeloanalytics/api

Server-side TypeScript client for the Pomelo Analytics API.

Initial local preparation: `0.1.0-beta.0`. MIT licensed. Not published.
Release configuration awaits owner approval; publication is blocked.

Use Node.js 22.13+ on the Node 22 release line or Node.js 24. The package uses ESM
and has no runtime dependencies. Keep the API token in server-side configuration.
Importing the package is safe during SSR; using it in a browser is rejected before
fetch is called.

## Usage

```ts
import { createPomeloClient } from '@pomeloanalytics/api';

// Run on the server. Configure this environment variable outside the source tree.
const token = process.env.POMELO_API_TOKEN;
if (!token) throw new Error('Configure POMELO_API_TOKEN on the server.');
const pomelo = createPomeloClient({ token });

const result = await pomelo.metrics.timeseries({
  siteId: 'site-test',
  from: '2026-10-01',
  to: '2026-10-24',
  metric: 'pageviews',
});

const points = result.data.points;
const availability = result.data.availability;
const unitsCharged = result.data.meta.units_charged;
const requestId = result.metadata.requestId;
```

`result.data` is the complete API response body, including `availability`, `meta`,
and additional server fields. `result.metadata` holds request and rate limit
headers; `metadata.metering` also exposes the original API `meta` object when present.
TypeScript types describe the reviewed contract. The SDK checks JSON decoding and
the object envelope; it does not validate every response field at runtime or remove
fields that are absent from the current contract.

The default API origin is `https://api.pomeloanalytics.com`. A custom HTTPS origin
and a fetch implementation can be supplied for tests or server integrations.
The default timeout is 30 seconds and covers reading the response body.

| Method | API path |
| --- | --- |
| `pomelo.me(options?)` | `/v1/me` |
| `pomelo.sites.list(options?)` | `/v1/sites` |
| `pomelo.tenants.list(params, options?)` | `/v1/tenants` |
| `pomelo.metrics.timeseries(params, options?)` | `/v1/metrics/timeseries` |
| `pomelo.metrics.breakdown(params, options?)` | `/v1/metrics/breakdown` |
| `pomelo.reports.overview(params, options?)` | `/v1/reports/overview` |
| `pomelo.reports.content(params, options?)` | `/v1/reports/content` |
| `pomelo.reports.acquisition(params, options?)` | `/v1/reports/acquisition` |
| `pomelo.reports.actions(params, options?)` | `/v1/reports/actions` |
| `pomelo.goals.list(params, options?)` | `/v1/goals` |
| `pomelo.goals.conversions(params, options?)` | `/v1/goals/conversions` |
| `pomelo.usage.current(options?)` | `/v1/usage/current` |
| `pomelo.usage.history(params?, options?)` | `/v1/usage/history` |

Parameters use camelCase (`siteId`, `tenantId`, `actionFamily`, `actionKey`) and map
to the API's exact wire names. Other names, such as `from`, `to`, `metric`, and
`include`, are unchanged. `filters` is a JSON string, as defined by the API.
Response fields are never renamed.

Dates use inclusive UTC `YYYY-MM-DD` values. Pass explicit dates to bound a read.
The server owns defaults, period validation, entitlements, and numeric limits;
the SDK does not choose content depth, clamp limits, or change a requested range.
The `details` alias for content `include` remains accepted by the public contract.

HTTP 200 on a mixed route means its strict-safe baseline succeeded. Check
`availability.sections` for sections that remain locked or only partially
available. Tenant-scoped reads use a stable opaque `tenantId`; the server checks
the token's permissions and the site's configuration.

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

From the repository root, verify and create an installable local tarball:

```sh
npm ci
npm run check
mkdir -p .artifacts
npm pack --workspace @pomeloanalytics/api --ignore-scripts --pack-destination .artifacts
```

Install that tarball into another Node ESM project with
`npm install /path/to/pomeloanalytics-api-0.1.0-beta.0.tgz`.
There is no registry installation to use before an approved publication.

The repository includes a server example and a runnable synthetic consumer.
The package audit compiles and executes the synthetic consumer in a fresh
temporary project using the local tarball. It makes no call to the live API.
