# Security

Do not put API tokens, credentials, real user data, full request URLs, or response
bodies in public issues or pull requests. Reproduce problems with synthetic data.

Use [private vulnerability reporting](https://github.com/pomeloanalytics/pomelo-js/security/advisories/new)
to report security issues. Do not disclose sensitive details in public issues.

The API client is server-side only. A site identifier used by the collection
script is different from an API token. Never put an API token in browser code,
public environment variables, client bundles, HTML, or collection snippets.

Error messages do not include server messages or underlying fetch errors.
`PomeloApiError.details` and `.payload` are available explicitly for controlled
handling. They can contain sensitive server data and must not be logged. Default
JSON serialization and Node inspection exclude those properties.

This package is not published yet and has no stable release support policy.
