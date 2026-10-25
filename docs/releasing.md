# Release preparation

The API package is prepared as `0.1.0-beta.0` under MIT. It is not published.
`private: true` and the failing `prepublishOnly` hook deliberately block release.
There is no release workflow or registry credential in this repository.

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

Use a separate reviewed release change to remove the publication blocks and
configure the public repository's `release.yml`. Keep its execution manual,
its token permissions in read mode except for `id-token: write` on the release
job, and any environment approval independent of the publishing contributor.
Use pinned official actions and GitHub-hosted runners. No persistent npm token,
private product checkout or cloud deployment belongs in this workflow.

Configure the package's trusted publisher for `pomeloanalytics/pomelo-js`, the
exact workflow filename and approved environment. Restrict it to staging;
direct publication and dist-tag management must remain disabled. The initial
package ownership/bootstrap sequence must be resolved before enabling this
workflow. This document does not configure a publisher.

The publishing account needs 2FA. Staged publishing currently requires npm
11.15.0 or newer and Node 22.14.0 or newer. Verify these requirements again when
the release is admitted. A maintainer inspects the staged candidate and approves
it with 2FA. See the official [staged publishing guide](https://docs.npmjs.com/staged-publishing/)
and [trusted publishing guide](https://docs.npmjs.com/trusted-publishers/).

## Versioning and acceptance

Version packages independently with SemVer and their own changelogs. The initial
API prerelease uses the `beta` dist-tag and `api-v0.1.0-beta.0` source tag. Neither
tag has been created. An API route version, OpenAPI info version, npm version
and CDN script version have separate meanings.

After approved publication, install the exact registry version in a clean app
and repeat the consumer checks. Keep `latest` unchanged until consumer and
product acceptance are explicitly approved. A failed candidate can be replaced
by a new beta version; do not assume published versions are reversible or
automatically unpublish them. Nothing here promotes the CDN or deploys a product.
