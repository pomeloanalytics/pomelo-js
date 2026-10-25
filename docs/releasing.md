# Release preparation

The API package's initial beta version is `0.1.0-beta.0` under MIT.
Its publication metadata selects the public npm registry with
public access and the `beta` tag. The workspace remains `private: true`.
The manual [release workflow](../.github/workflows/release.yml) stages this API
beta only. It contains no registry credential and cannot approve a staged package.

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

## Admit a release separately

The owner must approve the exact package, version, tarball checksum and registry
action. Staging also requires that approval: for a new package, npm makes a
public `0.0.0-stage` placeholder even before approving the staged contents.
Do not run a staging command as a read-only verification.

The first package bootstrap is a one-time operation requiring a distinct owner
GO. It must precede trusted publisher setup because the
[package must already exist on npm](https://docs.npmjs.com/cli/v11/commands/npm-trust/).
Local tarball checks do not demonstrate bootstrap provenance or OIDC publishing.

The workflow runs only through `workflow_dispatch` on protected `main` in
`pomeloanalytics/pomelo-js`. Before dispatch, approve the exact `version`,
`source_sha` and `expected_sha256` inputs. The source SHA must be the dispatched
main commit, its current remote head and the target of `api-v<version>`.
The package is built with Node 24.22.1 and its bundled npm 11.19.1. The prepare
job has read permissions only; it runs `npm ci --ignore-scripts`, the existing
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
