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

The public API description in `contracts/openapi.json` and its manifest are
explicitly reviewed inputs. After an approved contract update, run `npm run generate`.
`npm run check:generated` checks the manifest checksum and generated output without
changing files; it is included in `npm run check` and pull request CI.
Do not invent endpoints, entitlement rules, or response
fields in the SDK. Preserve the API's wire field names and response metadata.

Add focused tests for behavior changes. Query options are derived from the public
contract with camelCase names; API response bodies retain their wire names.
Do not duplicate product rules such as plan limits or period defaults in the SDK.
Use injected fetch implementations and
synthetic fixtures; pull request checks must not need API tokens or live services.

API requests are metered by the server. Do not add automatic retries, caches,
aggregation, or fallback endpoints. Keep API tokens on the server, including in
framework integrations that render on both the server and client.

Releases are a separate owner-approved operation. Do not add a privileged release
workflow or remove the publication block as part of an unrelated contribution.

The package audit inspects source text, dotfiles, and tarball contents before
installing a local tarball in a temporary consumer. Keep repository `.npmrc`
limited to `save-exact=true` and `ignore-scripts=true`; configure authentication
outside this repository. The scanner checks known sensitive patterns and package
boundaries, and refuses real environment files, key files, and credential files
even when empty. Only `.env.example` and `.env.template` are allowed as environment
file templates. It complements human review and is not a proof that arbitrary content
is free of secrets.
