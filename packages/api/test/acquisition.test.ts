import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createPomeloClient } from '../src/index.js';
import type { components } from '../src/index.js';

const currentPeriod: components['schemas']['ReportPeriodAvailability'] = {
  status: 'available', reason: 'strict_safe_route',
  requestedStart: '2026-10-01T00:00:00Z', requestedEnd: '2026-10-24T23:59:59Z',
  compatibleStart: '2026-10-01T00:00:00Z', compatibleEnd: '2026-10-24T23:59:59Z',
};
const common = {
  range: { start: '2026-10-01T00:00:00Z', end: '2026-10-24T23:59:59Z', compare_start: null, compare_end: null },
  compare: null,
  availability: {
    route: 'acquisition', classification: 'mixed', currentProfile: 'strict',
    collectionProfileEffectiveAt: null, current: currentPeriod, compare: null,
    sections: [{ id: 'acquisition_attribution', classification: 'extended_only', current: { ...currentPeriod, status: 'locked_by_profile', reason: 'extended_data_required', compatibleStart: null, compatibleEnd: null }, compare: null }],
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
      totals: { sessions: 12, pageviews: 20, engagement_rate: 0.5, avg_session_eng_time_ms: 1000 },
      by_channel: [{ channel: 'Direct', sessions: 12 }], by_day: [], top_referrers: [],
      top_sources: [], top_mediums: [], top_campaigns: [], top_landing_pages: [],
    },
  } satisfies components['schemas']['AcquisitionFullReportResponse'],
  summary: {
    ...common,
    current: {
      goals_configured: false,
      totals: { sessions: 12, engagement_rate: 0.5, avg_pages_per_session: 2, avg_session_eng_time_ms: 1000 },
      coverage: { direct_sessions: 12, non_direct_sessions: 0, tagged_sessions: 0, direct_share: 1, non_direct_share: 0, tagged_share: 0 },
      mix_timeseries: [],
      channels: [{ channel: 'Direct', sessions: 12, engagement_rate: 0.5, avg_pages_per_session: 2, avg_session_eng_time_ms: 1000, share: 1 }],
    },
  } satisfies components['schemas']['AcquisitionSummaryReportResponse'],
  details: {
    ...common,
    current: {
      goals_configured: false,
      dimensions: { sources: [], mediums: [], campaigns: [], referrers: [] },
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
    assert.equal(result.data.availability.sections[0]?.current.status, 'locked_by_profile');
    assert.equal(result.metadata.requestId, 'header-request');
    assert.equal(requests, 1);
    assert.equal('channels' in result.data.current, include === 'summary');
    assert.equal('by_channel' in result.data.current, include === 'full');
    assert.equal('dimensions' in result.data.current, include === 'details');
    assert.equal('impact' in result.data.current, false);
  });
}

test('Acquisition details keeps conditional goal impact absent, null or populated without defaults', async () => {
  for (const conditional of [{ goals_configured: false }, { goals_configured: true, impact: null }, { goals_configured: true, impact: { channels: [], landing_pages: [] } }]) {
    const payload = { ...variants.details, current: { ...variants.details.current, ...conditional } } satisfies components['schemas']['AcquisitionDetailsReportResponse'];
    const client = createPomeloClient({ token: 'synthetic-test-token', fetch: async () => Response.json(payload) });
    const { data } = await client.reports.acquisition({ siteId: 'site-test', include: 'details' });
    assert.deepEqual(data, payload);
    assert.equal(Object.hasOwn(data.current, 'impact'), Object.hasOwn(conditional, 'impact'));
  }
});
