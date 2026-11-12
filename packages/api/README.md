# @pomeloanalytics/api

Read your Pomelo Analytics data from a Node.js backend. This TypeScript client
provides typed access to sites, reports, goals and API usage.

[Website](https://www.pomeloanalytics.com/) ·
[Getting started](https://docs.pomeloanalytics.com/en/getting-started/) ·
[Démarrer en français](https://docs.pomeloanalytics.com/fr/getting-started/) ·
[API reference](https://docs.pomeloanalytics.com/en/api-reference/) ·
[Source and issues](https://github.com/pomeloanalytics/pomelo-js)

This package uses the `beta` prerelease line and is licensed under MIT. Check
the version shown by npm before installing. Browser pageviews and events are
collected by Pomelo's tracking script, installed through the getting-started guide.

Use Node.js 22.13+ on the Node 22 release line or Node.js 24. The package uses ESM
and has no runtime dependencies. CommonJS consumers on these supported Node
versions can use `require('@pomeloanalytics/api')` to load the same ESM build.
Keep the API token in server-side configuration.
Importing the package is safe during SSR; using it in a browser is rejected before
fetch is called.

## Installation

```sh
npm install @pomeloanalytics/api@beta
```

Check the registry versions and dist-tags before choosing an installation:

```sh
npm view @pomeloanalytics/api dist-tags versions --json
```

A source checkout or local tarball may contain an unpublished candidate.
Registry metadata determines which versions are available from npm.

## First API call

```ts
import { createPomeloClient } from '@pomeloanalytics/api';

// Run on the server. Configure this environment variable outside the source tree.
const token = process.env.POMELO_API_TOKEN;
if (!token) throw new Error('Configure POMELO_API_TOKEN on the server.');
const pomelo = createPomeloClient({ token });

// Check which account and permissions the token can access.
const { data: account } = await pomelo.me();
```

Create a read token in the Pomelo dashboard as described in the getting-started
guide. Keep it in server configuration, outside source control and browser code.
API access depends on your plan and the token's permissions. Each report
returns `availability`, which tells you whether the requested period is covered.

## Read metrics

Use a site ID returned by `pomelo.sites.list()` and explicit inclusive UTC dates:

```ts
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

Full Content responses can include `current.metric_method` and
`current.pages[].performance.n_lcp`, `n_fcp`, `n_inp`, `n_cls` and `n_ttfb`.
These optional fields identify the selected measurement method and each metric's
own observation count. `samples` remains the combined event count; it does not
establish coverage for every metric. The client preserves missing counts, zero
counts and null values without recomputing percentiles or filling defaults.
Browser performance collection is performed by the separate tracking script.


Acquisition has three distinct response shapes. The SDK forwards `include`
unchanged and returns the complete response without renaming one shape into another.

| Acquisition mode | Fields in `data.current` |
| --- | --- |
| `summary` | `channels`, `coverage`, `mix_timeseries`, `totals`, `goals_configured` |
| `full` | `by_channel`, `by_day`, `totals`, and top lists |
| `details` | `dimensions`, `landing_pages`, `goals_configured`, and optional `impact` |

Narrow the actual response by its fields. The request option does not make every
conditional field present. Goal impact can be absent or null; the SDK adds no
enrichment or default value.

```ts
const { data } = await pomelo.reports.acquisition({
  siteId: 'site-test', from: '2026-10-01', to: '2026-10-24', include: 'summary',
});
if ('channels' in data.current) {
  const summaryChannels = data.current.channels;
} else if ('by_channel' in data.current) {
  const fullChannels = data.current.by_channel;
} else {
  const dimensions = data.current.dimensions;
  const conditionalImpact = data.current.impact;
}
```

For Acquisition, `details` is a distinct shape. For Content, `details` is the
deprecated alias for `full`. Actions accepts `summary`, `full`, and `details`
using its single response schema; summary leaves detail lists empty on the server.
Omitting `include` leaves the server's selection unchanged.

### Acquisition goal impact

The typed `goalId` option and source, medium and campaign impact fields require
`0.1.0-beta.1` or later. The optional `goalId` is used with `include: 'details'`
and sent as `goal_id`. It selects one configured goal belonging to the site. Omitting it
leaves the server's union of configured goals unchanged. An unknown goal or use
with another report variant is rejected by the server as `INVALID_PARAMS`.

```ts
const { data } = await pomelo.reports.acquisition({
  siteId: 'site-test', from: '2026-10-01', to: '2026-10-24',
  include: 'details', goalId: 'goal-test',
});
if ('dimensions' in data.current && data.current.impact) {
  const { sources, mediums, campaigns } = data.current.impact;
  // Items retain value, converted_sessions and session_conversion_rate.
}
```

Impact is conditional on the server response and on the Campagnes option. It reports
distinct converted visits using first-pageview attribution; repeated goal
matches count once. Check availability as well as the optional impact object.
The SDK supplies no impact defaults or enrichment.

The API can also be read directly over HTTP without this package. From a server
shell with `POMELO_API_TOKEN` configured outside the source tree:

```sh
curl --get 'https://api.pomeloanalytics.com/v1/reports/acquisition' \
  --header "Authorization: Bearer ${POMELO_API_TOKEN}" \
  --data-urlencode 'site_id=site-test' \
  --data-urlencode 'from=2026-10-01' \
  --data-urlencode 'to=2026-10-24' \
  --data-urlencode 'include=details' \
  --data-urlencode 'goal_id=goal-test'
```

Check `availability.sections` for sections that are unavailable or only
partially available: `reason` is `campaigns_option_required` when the Campagnes
option is off, `outside_source_coverage` when the period is not covered, or
`null`. Tenant-scoped reads use a stable opaque `tenantId`; the server checks
the token's permissions and the site's configuration.

## Reporting precision

Counts are exact from 10 visits. In `meta.surface.reportingPrecision`
(`version: 'exact-counts-v1'`), `smallPositiveCount.representative` (5) stands
for any count from 1 to 9: display it as `< 10`, never as five visits. Rates,
shares and means are `number | null` and are `null` under 10 contributors; the
SDK returns them unchanged. Responses may also carry `small_site`.

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

## Help and contributions

- [Documentation](https://docs.pomeloanalytics.com/en/getting-started/) for setup and API access.
- [Issues](https://github.com/pomeloanalytics/pomelo-js/issues) for SDK bugs, without tokens or private report data.
- [Contributing](https://github.com/pomeloanalytics/pomelo-js/blob/main/CONTRIBUTING.md) for local checks, examples and release preparation.
