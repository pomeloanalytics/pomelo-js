import type { PomeloClient, TimeseriesParams, ApiData, components } from '../src/index.js';

// Compile-time checks only. This function is deliberately never run.
export function checkPublicTypes(client: PomeloClient): void {
  const params: TimeseriesParams = { siteId: 'site-test', tenantId: 'tenant-test', metric: 'sessions', interval: 'day', from: '2026-10-01', to: '2026-10-24' };
  void client.metrics.timeseries(params);
  void client.metrics.timeseries(params).then(({ data, metadata }) => {
    const typedBody: ApiData<'/v1/metrics/timeseries'> = data;
    const availability: components['schemas']['ReportAvailability'] = typedBody.availability;
    const units: number | undefined = metadata.metering?.units_charged;
    return { availability, units };
  });
  // @ts-expect-error siteId is required by the reviewed contract.
  void client.metrics.timeseries({ metric: 'pageviews' });
  // @ts-expect-error wire names are not SDK option names.
  void client.tenants.list({ site_id: 'site-test' });
  // @ts-expect-error metric is a contract enum.
  void client.metrics.timeseries({ siteId: 'site-test', metric: 'visitors' });
  // @ts-expect-error list sites has only request options, not site query parameters.
  void client.sites.list({ siteId: 'site-test' });
  // @ts-expect-error action family is a contract enum.
  void client.reports.actions({ siteId: 'site-test', actionFamily: 'purchases' });
  // @ts-expect-error goals listing is not a mutation surface.
  void client.goals.create({ siteId: 'site-test' });
}
