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
Import only the separately reviewed public `openapi.json` and `manifest.json`;
do not copy the source application's policies, scripts, documentation or configuration.
Follow [the public contract update guide](docs/releasing.md#update-the-public-contract)
through focused behavior tests, examples, package inspection and candidate review.

Add focused tests for behavior changes. Query options are derived from the public
contract with camelCase names; API response bodies retain their wire names.
Do not duplicate product rules such as plan limits or period defaults in the SDK.
Use injected fetch implementations and
synthetic fixtures; pull request checks must not need API tokens or live services.

API requests are metered by the server. Do not add automatic retries, caches,
aggregation, or fallback endpoints. Keep API tokens on the server, including in
framework integrations that render on both the server and client.

## Release preparation

Only the API package is publishable; the workspace stays private. Its default
publication tag is `beta`. A source merge or local tarball check does not authorize
publication. The owner approves the exact version, source commit, archive SHA256
and intended tags before manually dispatching the [existing release workflow](docs/releasing.md).

The workflow prepares and verifies the archive with read-only permissions, then
publishes those exact bytes through OIDC with provenance. It uses no permanent
npm token. The account keeps 2FA; routine OIDC publication does not include a
separate npm staging approval. Browser sign-in, account settings and publisher
permission changes may still require human MFA.

Configure the publisher once for this repository, `release.yml` and `npm-beta`.
Direct publication requires its explicit permission; moving `latest` additionally
requires dist-tag permission and an explicit owner GO. An unchanged tag needs no
update. The workflow preserves `latest` unless its promotion was requested with
the expected previous version. Keep package versions and source tags immutable.

The initial beta0 used manual staging without OIDC provenance. Beta1 qualified
OIDC staging, provenance and registry installation on 2026-11-02; its API responses
were mocked. See the [historical release record](docs/releasing.md#verified-beta1-release).
Qualify the direct path on the next useful approved release, not an artificial
version created to test publishing.

Do not add a privileged release workflow as part of an unrelated contribution.

The package audit inspects source text, dotfiles, and tarball contents before
installing a local tarball in a temporary consumer. Keep repository `.npmrc`
limited to `save-exact=true` and `ignore-scripts=true`; configure authentication
outside this repository. The scanner checks known sensitive patterns and package
boundaries, and refuses real environment files, key files, and credential files
even when empty. Only `.env.example` and `.env.template` are allowed as environment
file templates. It complements human review and is not a proof that arbitrary content
is free of secrets.
