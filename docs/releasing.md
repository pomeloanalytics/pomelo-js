# Release the API beta

Only `@pomeloanalytics/api` is published. The workspace stays private and the
API package remains on its MIT-licensed beta line. Browser tracker and WordPress
versions are independent. Nothing here deploys the Pomelo service or opens signup.

## Routine release

1. Prepare a useful SemVer beta version in the API manifest, lockfile and changelog.
   Update public metadata, README, examples and generated contract types when
   affected. Run `npm run check` and `npm audit --audit-level=high`; inspect the
   allowlisted tarball and its checksum. Do not publish versions just to test CI.
2. Review one coherent PR and both supported Node checks. After normal integration,
   verify the final source and identical package bytes, then create `api-v<version>`
   on that exact main commit. Never move an already published version's source tag.
3. Obtain one owner GO naming version, source SHA, tarball SHA256 and tags. The GO
   must state whether `latest` may move; that changes installations without a
   version suffix. A prerelease selected by `latest` still has beta status.
4. Manually dispatch [release.yml](../.github/workflows/release.yml) on protected
   `main` with `version`, `source_sha`, `expected_sha256`. To promote the verified
   version to `latest`, also set `promote_latest=true` and `expected_latest` to
   the current previous version. Default promotion is false.
5. Consume the existing workflow result. It verifies the archive, publishes it
   under `beta` using OIDC/provenance and checks the registry bytes. An approved
   optional `latest` update uses native `npm dist-tag`, with a drift check and
   readback. Both tags then select the same approved version.
6. Verify registry version/tags, integrity, provenance, registry installation and
   compilation using the existing consumer example. `npm audit signatures`
   verifies signatures and attestations in the installed consumer. Mocked API
   responses do not establish a real authenticated API acceptance test.

Read current versions/tags with `npm view @pomeloanalytics/api dist-tags versions --json`.
The registry and workflow receipt identify distributed versions; source README
files do not maintain a separate mutable current-version ledger.

## One-time publisher configuration

Keep the account's 2FA enabled. Use the existing trusted publisher bound to
`pomeloanalytics/pomelo-js`, filename `release.yml`, environment `npm-beta`. Its
GitHub environment allows only `main`. Direct publication and dist-tag management
are independent permissions: enable each only under the owner's specific approval.
Do not create a permanent token, broad publisher or parallel release workflow.

The owner authorizes the exact candidate before dispatch. OIDC authenticates the
job with a short-lived identity; the normal path has no separate npm staging or
MFA approval per package. Sign-in, account administration and sensitive publisher
changes can still require human security-key/Touch ID validation. The previous
setup combined these operations with staged publication; do not repeat setup for
each release.

A new [trusted publisher](https://docs.npmjs.com/trusted-publishers/) must complete
its first successful publication within two days or it expires. The established
beta1 staging publisher was actually used. Review any changed configuration and
qualify direct publication only with a useful approved candidate. Native staged
publishing remains an npm option, with a human approval, if that security model
is later chosen; it does not need another permanent workflow.

## Workflow and tooling boundaries

The existing workflow is manual and limited to API `X.Y.Z-beta.N` releases.
It checks repository, protected main, source SHA, tag target and package version.
The prepare job has read permissions only, uses Node.js 24.22.1 and npm 11.19.1, runs
`npm ci --ignore-scripts` and the existing checks, then packs exactly 16 allowlisted
files. It verifies the owner's SHA256 before uploading an immutable artifact.

The delivery job has no source checkout and runs no repository lifecycle scripts.
It downloads the verified archive and checks its digest again. Only this job has
`id-token: write`; the same `npm-beta` environment is retained. It pins npm 11.21.1
on its ephemeral runner because [OIDC dist-tag commands require npm 11.21+](https://docs.npmjs.com/trusted-publishers/#managing-dist-tags-with-trusted-publishing).
Preparation and consumer runtime support are unchanged. Official actions stay
pinned, and no shared npm authentication configuration or token is stored.

The publish command uses an explicit local archive path, `--ignore-scripts`,
`--tag beta`, the public registry and provenance. The default `publishConfig.tag`
also remains `beta`. A separate approved native tag update can select `latest`;
there is no implicit stable release. The workflow's result artifact contains
source/version/hash and tags, with no credential or stage identifier.

## Failure and rollback

Preserve the first failed operation. Read the registry before any retry: a network
error can follow a successful publication. Never manufacture another version to
hide a failure. If the exact version already exists, the workflow verifies its
archive instead of publishing it again; tag readbacks must still match the
approved target. A different archive for that version stops the operation.

Registry reads can briefly lag successful writes. The workflow reads the exact
version document and the dedicated dist-tags endpoint instead of the full package
document. One shared 30-second/10-snapshot limit applies after publication across
all phases: at most 20 metadata HTTP requests, plus the archive verification, with
bounded waits and per-read timeouts. Only a version-document 404 means absence;
if tags already select that version, missing metadata stops without publishing.
Other HTTP, JSON and transport failures stop the operation. Only the captured
previous aliases may remain pending; an unrelated value or different archive
fails immediately. Neither
`publish` nor `dist-tag` runs inside that read-only loop. An expired readback is
partial/unknown verification, not proof that the write failed or permission to
repeat it. Preserve completed effects and inspect the registry before resuming.

If publication succeeds and an alias step fails, retain that partial result and
qualify the tag/source state before a bounded continuation with the same reviewed
inputs. If main has moved, the source guard stops a rerun; qualify the necessary
repair instead of bypassing it or retagging published source. Restore aliases
only to real previous versions under an explicit owner decision. Published
archives are immutable; do not automatically unpublish them.

## Update the public contract

Import only the separately reviewed `openapi.json` and matching `manifest.json`.
Review the diff, operation list, source identity and digest. Do not transfer
application code, internal policies, configuration, documentation or customer data.
Run `npm run generate`, then inspect the generated types. Reuse the existing
client/transport and test changed request/response behavior with synthetic data.
Preserve wire fields and server-owned entitlement/date/quota rules. Keep tokens
server-side, dates explicit, and direct HTTP consumption available.

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


## Manual beta0 bootstrap

The first `0.1.0-beta.0` release used manual staging and 2FA approval. Its
published tarball SHA256 is
`3c7c2009c36816cc3b044d48a778437254ded8280367ec67b87ce6f2a1d3a675`,
from source tag `api-v0.1.0-beta.0` at
`f7e07d1983fd40f2ac320644a0e2d7111a458d63`. Registry installation and
ESM/CommonJS consumer checks passed; their API responses were mocked.
No OIDC provenance attestation is claimed for this manual bootstrap.
