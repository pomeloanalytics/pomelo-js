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
  const client = createPomeloClient({
    token: 'synthetic-test-token',
    fetch: async () => {
      requests++;
      return Response.json(payload, { headers: { 'X-Request-Id': 'synthetic-header-request' } });
    },
  });
  const result = await client.metrics.timeseries({ siteId: 'site-test', from: '2026-10-01', to: '2026-10-01' });
  if (requests !== 1 || result.data.points[0]?.value !== 12 || result.data.availability.current.status !== 'available' || result.metadata.metering?.units_charged !== 1 || result.metadata.requestId !== 'synthetic-header-request') {
    throw new Error('The synthetic SDK consumer check failed.');
  }
}
