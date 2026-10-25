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

## Release preparation

`@pomeloanalytics/api@0.1.0-beta.0` is an unpublished release candidate. Only the
API package has publishable metadata, selecting the public npm registry, public
access, and the `beta` tag. The workspace remains private. Merging source or
packing a tarball does not authorize publication. A separate owner GO must name
the reviewed source commit and tarball checksum before any bootstrap or staging
operation. The [manual release workflow](docs/releasing.md) stages the approved
API beta only; a maintainer must approve the staged package outside the workflow.

The package must exist on npm before [trusted publishing can be configured](https://docs.npmjs.com/cli/v11/commands/npm-trust/).
Treat bootstrap as a one-time owner-approved operation: even
[staging a new package](https://docs.npmjs.com/staged-publishing/) creates a public
`0.0.0-stage` placeholder. Before later automation, review and configure its exact
workflow and trusted publisher together. A new
[trusted publisher](https://docs.npmjs.com/trusted-publishers/#trusted-publisher-configuration-expiry)
must complete its first successful publication within two days or it expires.
Staging requires maintainer approval with 2FA before the candidate goes live.
Bootstrap provenance and OIDC have not been demonstrated by local checks.

Do not add a privileged release workflow as part of an unrelated contribution.

The package audit inspects source text, dotfiles, and tarball contents before
installing a local tarball in a temporary consumer. Keep repository `.npmrc`
limited to `save-exact=true` and `ignore-scripts=true`; configure authentication
outside this repository. The scanner checks known sensitive patterns and package
boundaries, and refuses real environment files, key files, and credential files
even when empty. Only `.env.example` and `.env.template` are allowed as environment
file templates. It complements human review and is not a proof that arbitrary content
is free of secrets.
