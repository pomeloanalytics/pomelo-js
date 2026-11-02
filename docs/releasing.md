# Release preparation

The API package's initial beta version is `0.1.0-beta.0` under MIT.
Its publication metadata selects the public npm registry with
public access and the `beta` tag. The workspace remains `private: true`.
The manual [release workflow](../.github/workflows/release.yml) stages API
beta prereleases only. It contains no registry credential and cannot approve a staged package.

The published beta is `0.1.0-beta.1`, including the Acquisition `goalId` option
and source/medium/campaign impact types. In the 2026-11-02 registry snapshot,
`beta` selects this version and `latest` still selects the bootstrap
`0.0.0-stage`. Install with `@beta`; the default npm package page still shows the
placeholder. Link to the [published beta page](https://www.npmjs.com/package/@pomeloanalytics/api/v/0.1.0-beta.1)
when sharing this release. Verify current tags with
`npm view @pomeloanalytics/api dist-tags versions --json` for each later release.

## Verified beta1 release

- Version: `0.1.0-beta.1`, source tag `api-v0.1.0-beta.1` at
  `44812d1bd42cc8a261fb51669b72b77a481d6a05`.
- Approved and registry tarball SHA256:
  `977d7648af156929faefafe1206813c19f0234addbe8ba8c60193c43fc84410a`.
- The existing [staging workflow](https://github.com/pomeloanalytics/pomelo-js/actions/runs/41441644626)
  authenticated through OIDC; a maintainer approved publication with 2FA.
- The registry SLSA provenance binds this archive to the source, workflow and
  run above. `npm audit signatures` verified the registry signature and
  attestation. Installation from the registry, strict TypeScript compilation,
  and isolated ESM/CommonJS consumers using the existing mock fixture passed.
- These are package distribution and mocked consumer checks, not a new
  authenticated API acceptance test. No provenance is claimed retroactively
  for the manual beta0 bootstrap.

Pass a staged tarball as an explicit local path (`./candidate/package.tgz` or an
absolute path). A bare `candidate/package.tgz` can be interpreted as a GitHub
repository shorthand. Keep the approved checksum and existing source/tag guards.

## Update the public contract

Use only a separately reviewed public export: `openapi.json` and its matching
`manifest.json`. Review their diff, operation list, source identity and artifact
SHA256 before replacing the files in `contracts/`. Do not transfer application
source, export policies, internal documentation, configuration or customer data.

Run `npm run generate`, then inspect the generated diff. Query options derive
their camelCase names from this contract; responses keep API wire names and
metadata. Reuse the existing client and transport. Do not invent fields or
duplicate server rules for dates, quotas, entitlements or report variants.

Add focused synthetic tests for the changed request and response behavior and
compile a consumer against the public exports. Update relevant examples and
documentation. Keep API tokens server-side and dates explicit in examples;
direct HTTP consumers remain supported without installing the SDK.

Choose the next useful package version with SemVer, update the package manifest,
lockfile and package changelog, and mark an unpublished candidate clearly. An
OpenAPI change is not an npm release. Do not create artificial versions to test
publishing infrastructure. Run `npm run check` and `npm audit --audit-level=high`;
`check:generated`, tests, examples and the isolated tarball audit are included.
Review the final diff and both supported Node CI results before admitting delivery.

## Review a candidate locally

Run `npm ci --ignore-scripts` and `npm run check`. The check verifies the reviewed
contract checksum, generated types, examples and tests, then inspects a tarball
and compiles and runs a fresh consumer using mocked responses.

To retain a candidate for inspection, build the package and run:

```sh
mkdir -p .artifacts
npm pack --workspace @pomeloanalytics/api --ignore-scripts --pack-destination .artifacts
```

Record the source commit and tarball SHA256. Review the actual file list,
exports, licence, changelog and generated declarations. Confirm the reviewed
source has passed both supported Node checks. Consumer acceptance and a real
authenticated API test are separate evidence; mocks do not establish either.
The package audit prints the SHA256 and npm integrity of the exact tarball it
installed and exercised. Compare these with any retained candidate tarball.

## Admit a release separately

The owner must approve the exact package, version, tarball checksum and registry
action. Staging also requires that approval: for a new package, npm makes a
public `0.0.0-stage` placeholder even before approving the staged contents.
Do not run a staging command as a read-only verification.
Record the exact reviewed source SHA, current npm version/tag snapshot and
tarball integrity with that decision. A review-ready PR alone does not admit
merging, tagging, staging, publishing, publisher configuration or dist-tag changes.

The first package bootstrap is a one-time operation requiring a distinct owner
GO. It must precede trusted publisher setup because the
[package must already exist on npm](https://docs.npmjs.com/cli/v11/commands/npm-trust/).
Local tarball checks do not demonstrate bootstrap provenance or OIDC publishing.

The first `0.1.0-beta.0` release used manual staging and 2FA approval. Its
published tarball SHA256 is
`3c7c2009c36816cc3b044d48a778437254ded8280367ec67b87ce6f2a1d3a675`,
from source tag `api-v0.1.0-beta.0` at
`f7e07d1983fd40f2ac320644a0e2d7111a458d63`. Registry installation and
ESM/CommonJS consumer checks passed; their API responses were mocked.
No OIDC provenance attestation is claimed for this manual bootstrap.

Before that release, creating a trusted publisher returned `404` while registry
metadata existed without published versions and the package page returned `404`.
A staged placeholder alone did not establish working publisher configuration.
The first real OIDC operation is recorded in the [beta1 release](#verified-beta1-release).
Do not create versions only to test publishing. No unused publisher should be retained.

npm also created the public `0.0.0-stage` placeholder. `beta` selects the SDK;
`latest` still selects that placeholder. Do not promote a prerelease to `latest`.

The workflow runs only through `workflow_dispatch` on protected `main` in
`pomeloanalytics/pomelo-js`. Before dispatch, approve the exact `version`,
`source_sha` and `expected_sha256` inputs. The source SHA must be the dispatched
main commit, its current remote head and the target of `api-v<version>`.
The package is built with Node 24.22.1 and its bundled npm 11.19.1. The prepare
job accepts only SemVer prereleases of the form `X.Y.Z-beta.N`, matching the
reviewed package manifest. It cannot republish an existing version.
It has read permissions only and runs `npm ci --ignore-scripts`, the existing
checks and package audit, then verifies the 16 allowed tarball files and approved
SHA256 before uploading the exact tarball.

The stage job uses the `npm-beta` environment, whose branch policy must permit
only `main`. Only this job has `id-token: write`. It downloads the prepare job's
immutable artifact, verifies the checksum again and runs `npm stage publish`
on that tarball with `--ignore-scripts`, explicit public npm registry/access,
`--tag beta` and `--provenance`. It has no source checkout and runs no repository
scripts. There is no direct publication, approval, rejection or dist-tag action.
Official actions are pinned to commit SHAs and both jobs use GitHub-hosted runners.

Configure the package's trusted publisher for `pomeloanalytics/pomelo-js`, the
exact workflow filename and approved environment. Restrict it to staging;
direct publication and dist-tag management must remain disabled. Qualify and
configure the workflow and publisher just before their first approved use: a new
[trusted publisher must complete its first successful publication within two days](https://docs.npmjs.com/trusted-publishers/#trusted-publisher-configuration-expiry)
or it expires. Configure the publisher only when the owner is ready to dispatch
and approve the candidate; revoke an unused or expired configuration. The
workflow does not configure a publisher.

The publishing account needs 2FA. Staged publishing currently requires npm
11.15.0 or newer and Node 22.14.0 or newer. Verify these requirements again when
the release is admitted. A maintainer inspects the staged candidate and approves
it with 2FA. See the official [staged publishing guide](https://docs.npmjs.com/staged-publishing/)
and [trusted publishing guide](https://docs.npmjs.com/trusted-publishers/).

After a successful stage, the workflow stores npm's JSON result as the
`api-beta-stage-result-<attempt>` artifact for one day, without printing the stage
ID in the job log. The release owner downloads it to obtain the stage ID,
inspects the staged tarball and provenance, and performs any approval with 2FA
outside the workflow. No credentials or authentication logs belong in receipts.
Record run/source identity, package hashes and a hash of the stage ID. A workflow
definition or passing local checks alone does not prove OIDC, registry acceptance
or published provenance; retain those receipts only after the real operation.

## Versioning and acceptance

Version packages independently with SemVer and their own changelogs. The initial
API prerelease uses the `beta` dist-tag and `api-v0.1.0-beta.0` source tag. Verify
that the source tag identifies the admitted commit before publication.
An API route version, OpenAPI info version, npm version
and CDN script version have separate meanings.

After approved publication, install the exact registry version in a clean app
and repeat the consumer checks. Keep `latest` unchanged until consumer and
product acceptance are explicitly approved. A failed candidate can be replaced
by a new beta version; do not assume published versions are reversible or
automatically unpublish them. Nothing here promotes the CDN or deploys a product.
