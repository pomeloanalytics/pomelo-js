import type { PomeloClient, TimeseriesParams, AcquisitionParams, ActionsParams, ApiData, components } from '../src/index.js';

// Compile-time checks only. This function is deliberately never run.
export function checkPublicTypes(client: PomeloClient): void {
  const params: TimeseriesParams = { siteId: 'site-test', tenantId: 'tenant-test', metric: 'sessions', interval: 'day', from: '2026-10-01', to: '2026-10-24' };
  void client.metrics.timeseries(params);
  const acquisition: AcquisitionParams = { siteId: 'site-test', include: 'summary' };
  const actions: ActionsParams = { siteId: 'site-test', include: 'details' };
  void client.reports.actions(actions);
  void client.reports.acquisition(acquisition).then(({ data }) => {
    const current = data.current;
    if ('channels' in current) {
      const channels: components['schemas']['AcquisitionSummaryChannelItem'][] = current.channels;
      // @ts-expect-error summary is not renamed into the full response.
      void current.by_channel;
      return channels;
    }
    if ('by_channel' in current) {
      const channels: components['schemas']['AcquisitionChannelItem'][] = current.by_channel;
      // @ts-expect-error full is not renamed into the summary response.
      void current.channels;
      return channels;
    }
    const dimensions: components['schemas']['UserApiAcquisitionDetailsCurrent']['dimensions'] = current.dimensions;
    const impact: components['schemas']['AcquisitionImpact'] | null | undefined = current.impact;
    // @ts-expect-error details is a distinct Acquisition shape.
    void current.by_channel;
    return { dimensions, impact };
  });
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
  // @ts-expect-error include is a public contract enum.
  void client.reports.acquisition({ siteId: 'site-test', include: 'unknown' });
}
