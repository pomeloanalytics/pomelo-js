import type { paths } from './generated/openapi.js';
import { PomeloTransportError } from './errors.js';
import { Transport } from './transport.js';
import type { ApiResponse, PomeloClientOptions, RequestOptions } from './types.js';

export type ApiPath = keyof paths;
export type ApiData<Path extends ApiPath> = paths[Path]['get']['responses'][200]['content']['application/json'];

type CamelCase<Key extends string> = Key extends `${infer Start}_${infer Rest}` ? `${Start}${Capitalize<CamelCase<Rest>>}` : Key;
type WireParams<Path extends ApiPath> = NonNullable<paths[Path]['get']['parameters']['query']>;
/** Query fields follow the public contract, with camelCase option names. */
export type ApiParams<Path extends ApiPath> = [WireParams<Path>] extends [never] ? never : {
  [Key in keyof WireParams<Path> as Key extends string ? CamelCase<Key> : never]: WireParams<Path>[Key];
};

export type TenantsParams = ApiParams<'/v1/tenants'>;
export type TimeseriesParams = ApiParams<'/v1/metrics/timeseries'>;
export type BreakdownParams = ApiParams<'/v1/metrics/breakdown'>;
export type OverviewParams = ApiParams<'/v1/reports/overview'>;
export type ContentParams = ApiParams<'/v1/reports/content'>;
export type AcquisitionParams = ApiParams<'/v1/reports/acquisition'>;
export type ActionsParams = ApiParams<'/v1/reports/actions'>;
export type GoalsParams = ApiParams<'/v1/goals'>;
export type GoalConversionsParams = ApiParams<'/v1/goals/conversions'>;
export type UsageHistoryParams = ApiParams<'/v1/usage/history'>;

function wireQuery(params: object): Record<string, string | number | boolean | undefined> {
  const query: Record<string, string | number | boolean | undefined> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && typeof value !== 'string' && typeof value !== 'number' && typeof value !== 'boolean') {
      throw new PomeloTransportError('INVALID_OPTIONS');
    }
    query[key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)] = value;
  }
  return query;
}

/** Server-side API client. Each operation performs exactly one GET request. */
export class PomeloClient {
  readonly #transport: Transport;

  constructor(options: PomeloClientOptions) {
    this.#transport = new Transport(options);
  }

  readonly me = (options?: RequestOptions): Promise<ApiResponse<ApiData<'/v1/me'>>> =>
    this.#transport.get('/v1/me', {}, options);

  readonly sites = {
    list: (options?: RequestOptions): Promise<ApiResponse<ApiData<'/v1/sites'>>> =>
      this.#transport.get('/v1/sites', {}, options),
  };

  readonly tenants = {
    list: (params: TenantsParams, options?: RequestOptions): Promise<ApiResponse<ApiData<'/v1/tenants'>>> =>
      this.#transport.get('/v1/tenants', wireQuery(params), options),
  };

  readonly metrics = {
    timeseries: (params: TimeseriesParams, options?: RequestOptions): Promise<ApiResponse<ApiData<'/v1/metrics/timeseries'>>> =>
      this.#transport.get('/v1/metrics/timeseries', wireQuery(params), options),
    breakdown: (params: BreakdownParams, options?: RequestOptions): Promise<ApiResponse<ApiData<'/v1/metrics/breakdown'>>> =>
      this.#transport.get('/v1/metrics/breakdown', wireQuery(params), options),
  };

  readonly reports = {
    overview: (params: OverviewParams, options?: RequestOptions): Promise<ApiResponse<ApiData<'/v1/reports/overview'>>> =>
      this.#transport.get('/v1/reports/overview', wireQuery(params), options),
    content: (params: ContentParams, options?: RequestOptions): Promise<ApiResponse<ApiData<'/v1/reports/content'>>> =>
      this.#transport.get('/v1/reports/content', wireQuery(params), options),
    acquisition: (params: AcquisitionParams, options?: RequestOptions): Promise<ApiResponse<ApiData<'/v1/reports/acquisition'>>> =>
      this.#transport.get('/v1/reports/acquisition', wireQuery(params), options),
    actions: (params: ActionsParams, options?: RequestOptions): Promise<ApiResponse<ApiData<'/v1/reports/actions'>>> =>
      this.#transport.get('/v1/reports/actions', wireQuery(params), options),
  };

  readonly goals = {
    list: (params: GoalsParams, options?: RequestOptions): Promise<ApiResponse<ApiData<'/v1/goals'>>> =>
      this.#transport.get('/v1/goals', wireQuery(params), options),
    conversions: (params: GoalConversionsParams, options?: RequestOptions): Promise<ApiResponse<ApiData<'/v1/goals/conversions'>>> =>
      this.#transport.get('/v1/goals/conversions', wireQuery(params), options),
  };

  readonly usage = {
    current: (options?: RequestOptions): Promise<ApiResponse<ApiData<'/v1/usage/current'>>> =>
      this.#transport.get('/v1/usage/current', {}, options),
    history: (params: UsageHistoryParams = {}, options?: RequestOptions): Promise<ApiResponse<ApiData<'/v1/usage/history'>>> =>
      this.#transport.get('/v1/usage/history', wireQuery(params), options),
  };
}

export function createPomeloClient(options: PomeloClientOptions): PomeloClient {
  return new PomeloClient(options);
}
