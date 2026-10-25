# Contributing

Use Node.js 22.13+ on the Node 22 release line or Node.js 24, with npm.

```sh
npm ci
npm run check
npm audit --audit-level=high
```

Keep changes focused on the SDK, public contract, documentation, and synthetic
examples. Do not include application code, internal documentation, credentials,
production configuration, or real user data.

The public API description in `contracts/` is an explicitly reviewed input.
Update generated types through the documented generation command when that
description changes. Do not invent endpoints, entitlement rules, or response
fields in the SDK. Preserve the API's wire field names and response metadata.

Add focused tests for behavior changes. Use injected fetch implementations and
synthetic fixtures; pull request checks must not need API tokens or live services.

API requests are metered by the server. Do not add automatic retries, caches,
aggregation, or fallback endpoints. Keep API tokens on the server, including in
framework integrations that render on both the server and client.

Releases are a separate owner-approved operation. Do not add a privileged release
workflow or remove the publication block as part of an unrelated contribution.
