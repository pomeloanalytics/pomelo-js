# Changelog

## 0.1.0-beta.0

- Prepare the server-side API client with injected fetch, request cancellation,
  bounded timeouts, safe structured errors, and rate limit metadata.
- Add the typed facade for the 13 reviewed public GET operations, with camelCase
  query options and complete API response bodies, availability, and metering.
- Generate types deterministically from the checksum-verified public contract.
- Add server examples, contract parameter checks, and isolated tarball consumption.
- Reflect the reviewed Acquisition full/summary/details union and the public
  Acquisition/Actions include parameter, preserving each source response shape.
- Set npm metadata to public access on the npm registry with the `beta` tag.
