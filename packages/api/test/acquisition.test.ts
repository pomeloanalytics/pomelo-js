import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createPomeloClient } from '../src/index.js';
import type { components } from '../src/index.js';

const currentPeriod: components['schemas']['ReportPeriodAvailability'] = {
  status: 'available', reason: null,
  requestedStart: '2026-10-01T00:00:00Z', requestedEnd: '2026-10-24T23:59:59Z',
  compatibleStart: '2026-10-01T00:00:00Z', compatibleEnd: '2026-10-24T23:59:59Z',
};
const common = {
  range: { start: '2026-10-01T00:00:00Z', end: '2026-10-24T23:59:59Z', compare_start: null, compare_end: null },
  compare: null,
  availability: {
    route: 'acquisition', current: currentPeriod, compare: null,
    sections: [{ id: 'acquisition_attribution', current: { ...currentPeriod, status: 'not_available_for_requested_period', reason: 'campaigns_option_required', compatibleStart: null, compatibleEnd: null }, compare: null }],
  } satisfies components['schemas']['ReportAvailability'],
  meta: {
    request_id: 'body-request', units_charged: 2, billable_overage: false,
    usage: { used_units: 2, included_units: 100, overage_units: 0, hard_cap_units: 200 },
  },
};
const variants = {
  full: {
    ...common,
    current: {
      campaigns_enabled: false, consented_sessions: 0,
      totals: { sessions: 12, pageviews: 20, engagement_rate: 0.5, avg_session_eng_time_ms: 1000 },
      by_channel: [{ channel: 'Direct', sessions: 12 }], by_day: [], top_referrers: [],
      top_sources: [], top_mediums: [], top_campaigns: [], top_landing_pages: [],
    },
  } satisfies components['schemas']['AcquisitionFullReportResponse'],
  summary: {
    ...common,
    current: {
      campaigns_enabled: false, consented_sessions: 0, channel_timeseries: [],
      goals_configured: false,
      totals: { sessions: 12, engagement_rate: 0.5, avg_pages_per_session: 2, avg_session_eng_time_ms: 1000 },
      coverage: { direct_sessions: 12, non_direct_sessions: 0, direct_share: 1, non_direct_share: 0 },
      mix_timeseries: [],
      channels: [{ channel: 'Direct', sessions: 12, engagement_rate: 0.5, avg_pages_per_session: 2, avg_session_eng_time_ms: 1000, share: 1 }],
    },
  } satisfies components['schemas']['AcquisitionSummaryReportResponse'],
  details: {
    ...common,
    current: {
      campaigns_enabled: false, consented_sessions: 0,
      goals_configured: false,
      dimensions: { sources: [], mediums: [], campaigns: [], contents: [], terms: [], referrers: [] },
      landing_pages: [],
    },
  } satisfies components['schemas']['AcquisitionDetailsReportResponse'],
};

for (const include of ['full', 'summary', 'details'] as const) {
  test(`Acquisition ${include} preserves its source shape, partial availability, metering and extra fields`, async () => {
    let requests = 0;
    const payload = { ...variants[include], additional_public_field: { retained: true } };
    const client = createPomeloClient({ token: 'synthetic-test-token', fetch: async (input) => {
      requests++;
      const url = new URL(String(input));
      assert.equal(url.pathname, '/v1/reports/acquisition');
      assert.equal(url.searchParams.get('include'), include);
      return Response.json(payload, { headers: { 'X-Request-Id': 'header-request' } });
    } });
    const result = await client.reports.acquisition({ siteId: 'site-test', from: '2026-10-01', to: '2026-10-24', include });
    assert.deepEqual(result.data, payload);
    assert.equal(result.metadata.metering, result.data.meta);
    assert.equal(result.data.availability.sections[0]?.current.status, 'not_available_for_requested_period');
    assert.equal(result.metadata.requestId, 'header-request');
    assert.equal(requests, 1);
    assert.equal('channels' in result.data.current, include === 'summary');
    assert.equal('by_channel' in result.data.current, include === 'full');
    assert.equal('dimensions' in result.data.current, include === 'details');
    assert.equal('impact' in result.data.current, false);
  });
}

test('Acquisition details keeps conditional goal impact absent, null or populated without defaults', async () => {
  for (const conditional of [{ goals_configured: false }, { goals_configured: true, impact: null }, { goals_configured: true, impact: { channels: [], landing_pages: [], sources: [], mediums: [], campaigns: [] } }]) {
    const payload = { ...variants.details, current: { ...variants.details.current, ...conditional } } satisfies components['schemas']['AcquisitionDetailsReportResponse'];
    const client = createPomeloClient({ token: 'synthetic-test-token', fetch: async () => Response.json(payload) });
    const { data } = await client.reports.acquisition({ siteId: 'site-test', include: 'details' });
    assert.deepEqual(data, payload);
    assert.equal(Object.hasOwn(data.current, 'impact'), Object.hasOwn(conditional, 'impact'));
  }
});

test('Acquisition goalId is encoded as goal_id in one GET and dimension impact is preserved', async () => {
  const payload = {
    ...variants.details,
    availability: { ...common.availability, sections: [] },
    current: {
      ...variants.details.current,
      goals_configured: true,
      impact: {
        channels: [{ channel: 'Referral', converted_sessions: 2, session_conversion_rate: 0.5 }],
        landing_pages: [{ path_canon: '/example', converted_sessions: 2, session_conversion_rate: 0.5 }],
        sources: [{ value: 'example.test', converted_sessions: 2, session_conversion_rate: 0.5 }],
        mediums: [{ value: 'referral', converted_sessions: 2, session_conversion_rate: 0.5 }],
        campaigns: [{ value: 'example-campaign', converted_sessions: 1, session_conversion_rate: 0.25 }],
      },
    },
    additional_public_field: { retained: true },
  } satisfies components['schemas']['AcquisitionDetailsReportResponse'] & { additional_public_field: unknown };
  let requests = 0;
  const goalId = 'goal /?&test';
  const client = createPomeloClient({ token: 'synthetic-test-token', fetch: async (input) => {
    requests++;
    const url = new URL(String(input));
    assert.equal(url.pathname, '/v1/reports/acquisition');
    assert.deepEqual(Object.fromEntries(url.searchParams), {
      site_id: 'site-test', from: '2026-10-01', to: '2026-10-24', include: 'details', goal_id: goalId,
    });
    return Response.json(payload, { headers: {
      'X-Request-Id': 'goal-header-request', 'X-RateLimit-Limit': '120',
      'X-RateLimit-Remaining': '119', 'X-RateLimit-Reset': '1900000000',
    } });
  } });
  const result = await client.reports.acquisition({ siteId: 'site-test', from: '2026-10-01', to: '2026-10-24', include: 'details', goalId });
  assert.equal(requests, 1);
  assert.deepEqual(result.data, payload);
  assert.equal(result.metadata.metering, result.data.meta);
  assert.deepEqual(result.metadata, {
    requestId: 'goal-header-request', metering: payload.meta,
    rateLimit: { limit: 120, remaining: 119, reset: 1900000000 },
  });
});

test('omitting Acquisition goalId leaves goal selection and dates to the server', async () => {
  const queries: Record<string, string>[] = [];
  const client = createPomeloClient({ token: 'synthetic-test-token', fetch: async (input) => {
    queries.push(Object.fromEntries(new URL(String(input)).searchParams));
    return Response.json(variants.details);
  } });
  await client.reports.acquisition({ siteId: 'site-test', include: 'details' });
  assert.deepEqual(queries, [
    { site_id: 'site-test', include: 'details' },
  ]);
});

test('Acquisition reports the Campagnes option as the availability reason and keeps null rates', async () => {
  const payload = {
    ...variants.summary,
    current: {
      ...variants.summary.current,
      totals: { sessions: 4, engagement_rate: null, avg_pages_per_session: null, avg_session_eng_time_ms: null },
    },
  } satisfies components['schemas']['AcquisitionSummaryReportResponse'];
  const client = createPomeloClient({ token: 'synthetic-test-token', fetch: async () => Response.json(payload) });
  const { data } = await client.reports.acquisition({ siteId: 'site-test', include: 'summary' });
  const reason: components['schemas']['ReportAvailabilityReason'] = data.availability.sections[0]?.current.reason ?? null;
  assert.equal(reason, 'campaigns_option_required');
  assert.equal(data.current.campaigns_enabled, false);
  assert.ok('totals' in data.current);
  const totals: { engagement_rate: number | null } = data.current.totals;
  assert.equal(totals.engagement_rate, null);
  assert.deepEqual(data, payload);
});
