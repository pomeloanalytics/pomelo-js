# Server example

`reports.ts` shows a server-only read with explicit dates and an optional stable
tenant identifier. Configure `POMELO_API_TOKEN` in the server environment outside
the source tree, then call the exported function from your server application.
It returns the complete API body and transport metadata.

`mock-consumer.ts` uses synthetic data and an injected fetch implementation.
`npm run audit:package` installs the local tarball in a fresh temporary ESM project,
compiles this example against the installed package, and runs it. No live API call
or API token is needed for the local checks.

Run `npm run build` followed by `npm run typecheck:examples` to check both examples
against the workspace package's public exports.
