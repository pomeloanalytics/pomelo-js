# Changelog

## Unreleased

- Sync the reviewed public contract for a single audience measurement and the
  Campagnes option. Availability statuses `locked_by_profile` and
  `partially_available_after_effective_at`, the reasons `strict_safe_route`,
  `extended_data_required` and `requested_period_crosses_profile_change`, and
  the availability fields `currentProfile`, `classification`, `readModel` and
  `collectionProfileEffectiveAt` are removed. Reasons are now
  `campaigns_option_required`, `outside_source_coverage` or `null`.
- Acquisition responses add `campaigns_enabled`, `consented_sessions` and the
  `contents` and `terms` dimensions, and drop the `tagged_*` coverage fields.
- Rates, shares and means are `number | null` (null under 10 contributors);
  envelopes may carry `small_site`.
- `meta.surface.reportingPrecision` is `exact-counts-v1`: counts are exact from
  10 and the value 5 stands for 1 to 9 (render as `< 10`).
- `small_site.reason` (`small_site` or `filter_complement`) says why the
  totals come from a wider period: too few visits, or a filter that sets 1 to
  9 visits of the site apart (its rates and means are then null).
- Report filters accept only values published for the period (10 visits or
  more); others are refused with 422 `INVALID_PARAMS`
  (`reason: filter_value_not_published`).
- The HTTP client implementation is unchanged.

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
