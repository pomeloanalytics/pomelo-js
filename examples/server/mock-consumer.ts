import { createPomeloClient } from '@pomeloanalytics/api';
import type { ApiData } from '@pomeloanalytics/api';

/** A runnable consumer example that uses synthetic data and makes no network call. */
export async function runMockExample(): Promise<void> {
  const payload: ApiData<'/v1/metrics/timeseries'> = {
    points: [{ ts: '2026-10-01T00:00:00Z', value: 12 }],
    availability: {
      route: 'synthetic-route', classification: 'strict_safe', currentProfile: 'strict',
      collectionProfileEffectiveAt: null, compare: null, sections: [],
      current: {
        status: 'available', reason: 'strict_safe_route',
        requestedStart: '2026-10-01T00:00:00Z', requestedEnd: '2026-10-01T23:59:59Z',
        compatibleStart: '2026-10-01T00:00:00Z', compatibleEnd: '2026-10-01T23:59:59Z',
      },
    },
    meta: {
      request_id: 'synthetic-body-request', units_charged: 1, billable_overage: false,
      usage: { used_units: 1, included_units: 100, overage_units: 0, hard_cap_units: 200 },
    },
  };
  let requests = 0;
  const summary: ApiData<'/v1/reports/acquisition'> = {
    availability: payload.availability, meta: payload.meta,
    range: { start: '2026-10-01T00:00:00Z', end: '2026-10-01T23:59:59Z', compare_start: null, compare_end: null },
    compare: null,
    current: {
      goals_configured: false,
      totals: { sessions: 12, engagement_rate: 0.5, avg_pages_per_session: 2, avg_session_eng_time_ms: 1000 },
      coverage: { direct_sessions: 12, non_direct_sessions: 0, tagged_sessions: 0, direct_share: 1, non_direct_share: 0, tagged_share: 0 },
      mix_timeseries: [], channels: [],
    },
  };
  const client = createPomeloClient({
    token: 'synthetic-test-token',
    fetch: async (input) => {
      requests++;
      return Response.json(new URL(String(input)).pathname === '/v1/reports/acquisition' ? summary : payload, { headers: { 'X-Request-Id': 'synthetic-header-request' } });
    },
  });
  const result = await client.metrics.timeseries({ siteId: 'site-test', from: '2026-10-01', to: '2026-10-01' });
  if (requests !== 1 || result.data.points[0]?.value !== 12 || result.data.availability.current.status !== 'available' || result.metadata.metering?.units_charged !== 1 || result.metadata.requestId !== 'synthetic-header-request') {
    throw new Error('The synthetic SDK consumer check failed.');
  }
  const acquisition = await client.reports.acquisition({ siteId: 'site-test', include: 'summary' });
  if (Number(requests) !== 2 || !('channels' in acquisition.data.current) || acquisition.data.current.goals_configured !== false) {
    throw new Error('The synthetic Acquisition consumer check failed.');
  }
}
