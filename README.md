# Pomelo JavaScript libraries

This workspace contains the server-side TypeScript client for the Pomelo Analytics API.

The initial `@pomeloanalytics/api` package is being prepared as `0.1.0-beta.0`.
It has not been published. The source is licensed under MIT.
The API package contains release candidate metadata for public npm access under
the `beta` tag. The workspace remains private. Publishing requires a separate
owner GO; see [release preparation](CONTRIBUTING.md#release-preparation).

Node.js 22.13+ on the Node 22 release line and Node.js 24 are supported targets.
The package uses ESM and the built-in Fetch API. It has no runtime dependencies.

- [API client](packages/api/README.md)
- [Server example](examples/server)
- [Contributing](CONTRIBUTING.md)
- [Security](SECURITY.md)

## Local development

```sh
npm ci
npm run check
```

`npm run audit:package` builds and inspects a local tarball, then installs it in a
temporary project and compiles and runs a consumer smoke test. It never publishes.

Only the reviewed public API description is accepted in `contracts/`. Public
SDK types are generated from [contracts/openapi.json](contracts/openapi.json),
with its SHA256 checked against [contracts/manifest.json](contracts/manifest.json).
`npm run generate` updates the types; `npm run check:generated` verifies the
checksum and deterministic output without writing files. The SDK does not contain the
Pomelo application, infrastructure, deployment tooling, or analytics engine.

The CDN script remains the primary collection installation path. This repository
currently contains the API client only.
