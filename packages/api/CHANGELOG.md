# Changelog

## 0.1.0-beta.3

- Add optional per-metric Content sample counts and the selected measurement method to generated API types.
- Preserve missing, zero and sparse observations without client-side aggregation or default values.
- Keep the HTTP client implementation, server-side token boundary and request behavior unchanged.

## 0.1.0-beta.2

- Add the product website, documentation links and relevant npm keywords.
- Clarify server-side setup, the first `me()` call and report examples.
- Keep the API implementation and generated contract types unchanged.

## 0.1.0-beta.1

- Sync the reviewed public contract for optional Acquisition `goalId` selection
  with `include: 'details'`, transmitted as `goal_id` by the existing client.
- Add generated dimension impact types for sources, mediums and campaigns,
  preserving API field names, conditional impact and complete response metadata.
- Verify goal selection and dimension impacts in typed, wire and isolated
  tarball consumers; document candidate and published beta versions separately.

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
