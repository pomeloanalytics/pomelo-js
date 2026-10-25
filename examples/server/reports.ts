import { createPomeloClient } from '@pomeloanalytics/api';

/** Run only on the server. Configure POMELO_API_TOKEN outside the source tree. */
export async function readSiteTimeseries(siteId: string, from: string, to: string, tenantId?: string) {
  const token = process.env.POMELO_API_TOKEN;
  if (!token) throw new Error('Configure POMELO_API_TOKEN on the server before running this example.');
  const client = createPomeloClient({ token });
  const result = await client.metrics.timeseries({
    siteId,
    from,
    to,
    metric: 'pageviews',
    ...(tenantId !== undefined ? { tenantId } : {}),
  });

  // Keep the complete body: availability and meta describe the returned data.
  // HTTP 200 on a mixed route can include locked or partially available sections.
  return result;
}
