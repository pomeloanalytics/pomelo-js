// Generated from the reviewed public API description. Do not edit manually.
export interface paths {
    "/v1/goals": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List goals configured for a site
         * @description Read-only goal listing. Goals are created and managed from the Pomelo dashboard,
         *     then exposed here for API consumers. This endpoint is not metered.
         */
        get: {
            parameters: {
                query: {
                    site_id: components["parameters"]["SiteId"];
                };
                header?: {
                    /** @description Optional idempotency/request correlation identifier. */
                    "X-Request-Id"?: components["parameters"]["RequestIdHeader"];
                };
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        "X-Request-Id": components["headers"]["XRequestId"];
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["GoalListResponse"];
                    };
                };
                401: components["responses"]["Unauthorized"];
                403: components["responses"]["Forbidden"];
                422: components["responses"]["InvalidParams"];
                429: components["responses"]["RateLimited"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/goals/conversions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Goal conversions over time range
         * @description Read-only conversions for goals already configured in the Pomelo dashboard.
         */
        get: {
            parameters: {
                query: {
                    /** @description Compare current range against the previous equivalent period. */
                    compare?: components["parameters"]["CompareParam"];
                    /** @description Inclusive UTC start date (YYYY-MM-DD). Pass explicit from and to dates to bound the requested period. */
                    from?: components["parameters"]["FromDate"];
                    /** @description Number of rows returned by top lists for report endpoints. */
                    limit?: components["parameters"]["ReportLimit"];
                    site_id: components["parameters"]["SiteId"];
                    /**
                     * @description Stable tenant identifier. Use this for tenant-scoped analytics and
                     *     tenant-scoped access control. `site_id` identifies the shared product,
                     *     `tenant_id` identifies one tenant.
                     */
                    tenant_id?: components["parameters"]["TenantId"];
                    /** @description Inclusive UTC end date (`YYYY-MM-DD`). Defaults to today. */
                    to?: components["parameters"]["ToDate"];
                    /** @description Traffic segment to include. */
                    traffic?: components["parameters"]["TrafficParam"];
                };
                header?: {
                    /** @description Optional idempotency/request correlation identifier. */
                    "X-Request-Id"?: components["parameters"]["RequestIdHeader"];
                };
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        "X-RateLimit-Limit": components["headers"]["XRateLimitLimit"];
                        "X-RateLimit-Remaining": components["headers"]["XRateLimitRemaining"];
                        "X-RateLimit-Reset": components["headers"]["XRateLimitReset"];
                        "X-Request-Id": components["headers"]["XRequestId"];
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["GoalsConversionsResponse"];
                    };
                };
                401: components["responses"]["Unauthorized"];
                402: components["responses"]["HardCapReached"];
                403: components["responses"]["Forbidden"];
                409: components["responses"]["ReportAvailabilityConflict"];
                422: components["responses"]["InvalidParams"];
                429: components["responses"]["RateLimited"];
                503: components["responses"]["AnalyticsUnavailable"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/me": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Current API principal and plan limits */
        get: {
            parameters: {
                query?: never;
                header?: {
                    /** @description Optional idempotency/request correlation identifier. */
                    "X-Request-Id"?: components["parameters"]["RequestIdHeader"];
                };
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        "X-RateLimit-Limit": components["headers"]["XRateLimitLimit"];
                        "X-RateLimit-Remaining": components["headers"]["XRateLimitRemaining"];
                        "X-RateLimit-Reset": components["headers"]["XRateLimitReset"];
                        "X-Request-Id": components["headers"]["XRequestId"];
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["MeResponse"];
                    };
                };
                401: components["responses"]["Unauthorized"];
                429: components["responses"]["RateLimited"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/metrics/breakdown": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Query metrics grouped by dimension */
        get: {
            parameters: {
                query: {
                    /**
                     * @description Grouping dimension for breakdown endpoint.
                     *     When `dimension=tenant`, rows are grouped by stable `tenant_id`. The
                     *     statistics of a tenant are those of the page's client space. The
                     *     response also includes `tenant_slug` and `tenant_name` as display labels.
                     */
                    dimension?: components["parameters"]["BreakdownDimension"];
                    /**
                     * @description JSON object serialized as string, example:
                     *     `{"device":"mobile","referrer":"google.com"}`.
                     */
                    filters?: components["parameters"]["Filters"];
                    /** @description Inclusive UTC start date (YYYY-MM-DD). Pass explicit from and to dates to bound the requested period. */
                    from?: components["parameters"]["FromDate"];
                    /** @description Number of rows returned by breakdown endpoint. */
                    limit?: components["parameters"]["BreakdownLimit"];
                    /**
                     * @description Metric to aggregate (default `pageviews`). `sessions` uses the same
                     *     visit model as the dashboard: a `visit_id` starts from the
                     *     privacy-preserving daily visitor key and is split after 30 minutes of
                     *     inactivity.
                     */
                    metric?: components["parameters"]["Metric"];
                    site_id: components["parameters"]["SiteId"];
                    /**
                     * @description Stable tenant identifier. Use this for tenant-scoped analytics and
                     *     tenant-scoped access control. `site_id` identifies the shared product,
                     *     `tenant_id` identifies one tenant.
                     */
                    tenant_id?: components["parameters"]["TenantId"];
                    /** @description Inclusive UTC end date (`YYYY-MM-DD`). Defaults to today. */
                    to?: components["parameters"]["ToDate"];
                };
                header?: {
                    /** @description Optional idempotency/request correlation identifier. */
                    "X-Request-Id"?: components["parameters"]["RequestIdHeader"];
                };
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        "X-RateLimit-Limit": components["headers"]["XRateLimitLimit"];
                        "X-RateLimit-Remaining": components["headers"]["XRateLimitRemaining"];
                        "X-RateLimit-Reset": components["headers"]["XRateLimitReset"];
                        "X-Request-Id": components["headers"]["XRequestId"];
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["BreakdownResponse"];
                    };
                };
                401: components["responses"]["Unauthorized"];
                402: components["responses"]["HardCapReached"];
                403: components["responses"]["Forbidden"];
                409: components["responses"]["ReportAvailabilityConflict"];
                422: components["responses"]["InvalidParams"];
                429: components["responses"]["RateLimited"];
                503: components["responses"]["AnalyticsUnavailable"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/metrics/timeseries": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Query metrics as timeseries points */
        get: {
            parameters: {
                query: {
                    /**
                     * @description JSON object serialized as string, example:
                     *     `{"device":"mobile","referrer":"google.com"}`.
                     */
                    filters?: components["parameters"]["Filters"];
                    /** @description Inclusive UTC start date (YYYY-MM-DD). Pass explicit from and to dates to bound the requested period. */
                    from?: components["parameters"]["FromDate"];
                    /** @description Granularity (`hour` can require higher plan). */
                    interval?: components["parameters"]["Interval"];
                    /**
                     * @description Metric to aggregate (default `pageviews`). `sessions` uses the same
                     *     visit model as the dashboard: a `visit_id` starts from the
                     *     privacy-preserving daily visitor key and is split after 30 minutes of
                     *     inactivity.
                     */
                    metric?: components["parameters"]["Metric"];
                    site_id: components["parameters"]["SiteId"];
                    /**
                     * @description Stable tenant identifier. Use this for tenant-scoped analytics and
                     *     tenant-scoped access control. `site_id` identifies the shared product,
                     *     `tenant_id` identifies one tenant.
                     */
                    tenant_id?: components["parameters"]["TenantId"];
                    /** @description Inclusive UTC end date (`YYYY-MM-DD`). Defaults to today. */
                    to?: components["parameters"]["ToDate"];
                };
                header?: {
                    /** @description Optional idempotency/request correlation identifier. */
                    "X-Request-Id"?: components["parameters"]["RequestIdHeader"];
                };
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        "X-RateLimit-Limit": components["headers"]["XRateLimitLimit"];
                        "X-RateLimit-Remaining": components["headers"]["XRateLimitRemaining"];
                        "X-RateLimit-Reset": components["headers"]["XRateLimitReset"];
                        "X-Request-Id": components["headers"]["XRequestId"];
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["TimeseriesResponse"];
                    };
                };
                401: components["responses"]["Unauthorized"];
                402: components["responses"]["HardCapReached"];
                403: components["responses"]["Forbidden"];
                409: components["responses"]["ReportAvailabilityConflict"];
                422: components["responses"]["InvalidParams"];
                429: components["responses"]["RateLimited"];
                503: components["responses"]["AnalyticsUnavailable"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/reports/acquisition": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Acquisition channels, referrers, and landing pages
         * @description Referring domains and landing pages of the visits. A direct visit has
         *     no referring domain. Channels, sources, mediums, campaigns and impact by
         *     source belong to the Campagnes option: `by_channel`, `channels`,
         *     `channel_timeseries`, `top_sources`, `top_mediums`, `top_campaigns` and
         *     the `dimensions` and `impact` source lists are computed on visits whose
         *     visitor gave consent, with the usual reporting precision (rounded
         *     counts, `< 10`, rows under 10 visits grouped, rates and means `null`
         *     under 10 contributors), and are empty when the site does not have the
         *     option. `availability.sections` reports `acquisition_attribution` with
         *     the status of the report when the option is on and with the reason
         *     `campaigns_option_required` when it is off. `avg_pages_per_session`,
         *     `avg_session_eng_time_ms` and `avg_page_eng_time_ms` are `null` when
         *     fewer than ten visits contribute; they are never published as `0` in
         *     that case.
         *     When report include selection is enabled, `include` selects the response
         *     depth and omission selects `summary`. Otherwise, `include` is ignored
         *     and the handler uses `full`.
         *     `include=summary` returns totals, coverage and the sessions timeseries.
         *     `full` returns `current.by_day` and top lists. `details` returns
         *     dimensions, landing pages and optional goal impact; it is a distinct
         *     Acquisition variant, not the Content alias for full.
         *     `goal_id` optionally selects one configured site goal for `details`
         *     impact. Impact reports distinct converted visits and rates by landing
         *     page using first-pageview attribution; omission uses the union of the
         *     site's configured goals.
         */
        get: {
            parameters: {
                query: {
                    /** @description Compare current range against the previous equivalent period. */
                    compare?: components["parameters"]["CompareParam"];
                    /** @description Inclusive UTC start date (YYYY-MM-DD). Pass explicit from and to dates to bound the requested period. */
                    from?: components["parameters"]["FromDate"];
                    /**
                     * @description Acquisition `include=details` only. Selects one configured goal belonging
                     *     to the requested site for conversion impact. Omission uses the union
                     *     of all configured goals. An unknown goal or another report variant
                     *     returns `INVALID_PARAMS` without charging usage.
                     */
                    goal_id?: components["parameters"]["AcquisitionGoalId"];
                    /** @description Report depth for Acquisition and Actions. When report include selection is enabled, omission selects summary; otherwise the handler uses full even when include is supplied. No unconditional default is declared here. */
                    include?: components["parameters"]["ReportInclude"];
                    /** @description Number of rows returned by top lists for report endpoints. */
                    limit?: components["parameters"]["ReportLimit"];
                    site_id: components["parameters"]["SiteId"];
                    /**
                     * @description Stable tenant identifier. Use this for tenant-scoped analytics and
                     *     tenant-scoped access control. `site_id` identifies the shared product,
                     *     `tenant_id` identifies one tenant.
                     */
                    tenant_id?: components["parameters"]["TenantId"];
                    /** @description Inclusive UTC end date (`YYYY-MM-DD`). Defaults to today. */
                    to?: components["parameters"]["ToDate"];
                    /** @description Traffic segment to include. */
                    traffic?: components["parameters"]["TrafficParam"];
                };
                header?: {
                    /** @description Optional idempotency/request correlation identifier. */
                    "X-Request-Id"?: components["parameters"]["RequestIdHeader"];
                };
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /**
                 * @description OK. `availability.sections` reports whether
                 *     `acquisition_attribution` (Campagnes option) is available for the
                 *     requested period.
                 */
                200: {
                    headers: {
                        "X-RateLimit-Limit": components["headers"]["XRateLimitLimit"];
                        "X-RateLimit-Remaining": components["headers"]["XRateLimitRemaining"];
                        "X-RateLimit-Reset": components["headers"]["XRateLimitReset"];
                        "X-Request-Id": components["headers"]["XRequestId"];
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["AcquisitionReportResponse"];
                    };
                };
                401: components["responses"]["Unauthorized"];
                402: components["responses"]["HardCapReached"];
                403: components["responses"]["Forbidden"];
                422: components["responses"]["InvalidParams"];
                429: components["responses"]["RateLimited"];
                503: components["responses"]["AnalyticsUnavailable"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/reports/actions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Actions by family
         * @description Goals, forms, outbound links, downloads, errors, custom events and
         *     instrumentation, by family.
         *     When report include selection is enabled, `include` selects the response
         *     depth and omission selects `summary`. Otherwise, `include` is ignored
         *     and the handler uses `full`.
         *     `include=summary` keeps aggregate families and timeseries and leaves
         *     action/context detail lists empty. `full` and `details` request those
         *     detail rows using the same Actions response schema.
         */
        get: {
            parameters: {
                query: {
                    /** @description Filter action reports by normalized action family. */
                    action_family?: components["parameters"]["ActionFamily"];
                    /** @description Filter action reports by normalized action key. */
                    action_key?: components["parameters"]["ActionKey"];
                    /** @description Compare current range against the previous equivalent period. */
                    compare?: components["parameters"]["CompareParam"];
                    /** @description Inclusive UTC start date (YYYY-MM-DD). Pass explicit from and to dates to bound the requested period. */
                    from?: components["parameters"]["FromDate"];
                    /** @description Report depth for Acquisition and Actions. When report include selection is enabled, omission selects summary; otherwise the handler uses full even when include is supplied. No unconditional default is declared here. */
                    include?: components["parameters"]["ReportInclude"];
                    /** @description Number of rows returned by top lists for report endpoints. */
                    limit?: components["parameters"]["ReportLimit"];
                    site_id: components["parameters"]["SiteId"];
                    /**
                     * @description Stable tenant identifier. Use this for tenant-scoped analytics and
                     *     tenant-scoped access control. `site_id` identifies the shared product,
                     *     `tenant_id` identifies one tenant.
                     */
                    tenant_id?: components["parameters"]["TenantId"];
                    /** @description Inclusive UTC end date (`YYYY-MM-DD`). Defaults to today. */
                    to?: components["parameters"]["ToDate"];
                    /** @description Traffic segment to include. */
                    traffic?: components["parameters"]["TrafficParam"];
                };
                header?: {
                    /** @description Optional idempotency/request correlation identifier. */
                    "X-Request-Id"?: components["parameters"]["RequestIdHeader"];
                };
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        "X-RateLimit-Limit": components["headers"]["XRateLimitLimit"];
                        "X-RateLimit-Remaining": components["headers"]["XRateLimitRemaining"];
                        "X-RateLimit-Reset": components["headers"]["XRateLimitReset"];
                        "X-Request-Id": components["headers"]["XRequestId"];
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["ActionsReportResponse"];
                    };
                };
                401: components["responses"]["Unauthorized"];
                402: components["responses"]["HardCapReached"];
                403: components["responses"]["Forbidden"];
                422: components["responses"]["InvalidParams"];
                429: components["responses"]["RateLimited"];
                503: components["responses"]["AnalyticsUnavailable"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/reports/content": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Content report
         * @description `summary` supports 1-365 inclusive UTC days. `full` and its deprecated
         *     `details` alias support 1-90 days. Comparison supports at most 30 days
         *     in either mode. Responses are never truncated: if the serialized proxy
         *     response would exceed 5 MiB, the request returns HTTP 422 with
         *     `REPORT_RESPONSE_TOO_LARGE` and consumes zero metered units. Detailed
         *     exports beyond 90 days are not provided synchronously by this endpoint.
         */
        get: {
            parameters: {
                query: {
                    /** @description Compare current range against the previous equivalent period. */
                    compare?: components["parameters"]["CompareParam"];
                    /** @description Inclusive UTC start date (YYYY-MM-DD). Pass explicit from and to dates to bound the requested period. */
                    from?: components["parameters"]["FromDate"];
                    /**
                     * @description Content response depth. `summary` returns totals and one global UTC
                     *     pageview point per day; `limit` has no effect. `full` returns the
                     *     detailed Content report. `details` is a deprecated alias for `full`.
                     *     When omitted, ranges up to 90 days use `full`; ranges from 91 through
                     *     365 days use `summary`.
                     */
                    include?: components["parameters"]["ContentInclude"];
                    /** @description Number of rows returned by top lists for report endpoints. */
                    limit?: components["parameters"]["ReportLimit"];
                    site_id: components["parameters"]["SiteId"];
                    /**
                     * @description Stable tenant identifier. Use this for tenant-scoped analytics and
                     *     tenant-scoped access control. `site_id` identifies the shared product,
                     *     `tenant_id` identifies one tenant.
                     */
                    tenant_id?: components["parameters"]["TenantId"];
                    /** @description Inclusive UTC end date (`YYYY-MM-DD`). Defaults to today. */
                    to?: components["parameters"]["ToDate"];
                    /** @description Traffic segment to include. */
                    traffic?: components["parameters"]["TrafficParam"];
                };
                header?: {
                    /** @description Optional idempotency/request correlation identifier. */
                    "X-Request-Id"?: components["parameters"]["RequestIdHeader"];
                };
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        "X-RateLimit-Limit": components["headers"]["XRateLimitLimit"];
                        "X-RateLimit-Remaining": components["headers"]["XRateLimitRemaining"];
                        "X-RateLimit-Reset": components["headers"]["XRateLimitReset"];
                        "X-Request-Id": components["headers"]["XRequestId"];
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["ContentReportResponse"];
                    };
                };
                401: components["responses"]["Unauthorized"];
                402: components["responses"]["HardCapReached"];
                403: components["responses"]["Forbidden"];
                422: components["responses"]["InvalidParams"];
                429: components["responses"]["RateLimited"];
                503: components["responses"]["AnalyticsUnavailable"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/reports/overview": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Consolidated site overview
         * @description Audience, content and acquisition of the site over the requested
         *     period. `avg_pages_per_session`, `avg_session_eng_time_ms` and
         *     `avg_page_eng_time_ms` are `null` when fewer than ten visits
         *     contribute; they are never published as `0` in that case. Channels belong to the Campagnes
         *     option: `acquisition.by_channel` holds visits with consent and is empty
         *     without the option.
         */
        get: {
            parameters: {
                query: {
                    /** @description Compare current range against the previous equivalent period. */
                    compare?: components["parameters"]["CompareParam"];
                    /** @description Inclusive UTC start date (YYYY-MM-DD). Pass explicit from and to dates to bound the requested period. */
                    from?: components["parameters"]["FromDate"];
                    /** @description Number of rows returned by top lists for report endpoints. */
                    limit?: components["parameters"]["ReportLimit"];
                    site_id: components["parameters"]["SiteId"];
                    /**
                     * @description Stable tenant identifier. Use this for tenant-scoped analytics and
                     *     tenant-scoped access control. `site_id` identifies the shared product,
                     *     `tenant_id` identifies one tenant.
                     */
                    tenant_id?: components["parameters"]["TenantId"];
                    /** @description Inclusive UTC end date (`YYYY-MM-DD`). Defaults to today. */
                    to?: components["parameters"]["ToDate"];
                    /** @description Traffic segment to include. */
                    traffic?: components["parameters"]["TrafficParam"];
                };
                header?: {
                    /** @description Optional idempotency/request correlation identifier. */
                    "X-Request-Id"?: components["parameters"]["RequestIdHeader"];
                };
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        "X-RateLimit-Limit": components["headers"]["XRateLimitLimit"];
                        "X-RateLimit-Remaining": components["headers"]["XRateLimitRemaining"];
                        "X-RateLimit-Reset": components["headers"]["XRateLimitReset"];
                        "X-Request-Id": components["headers"]["XRequestId"];
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["OverviewReportResponse"];
                    };
                };
                401: components["responses"]["Unauthorized"];
                402: components["responses"]["HardCapReached"];
                403: components["responses"]["Forbidden"];
                422: components["responses"]["InvalidParams"];
                429: components["responses"]["RateLimited"];
                503: components["responses"]["AnalyticsUnavailable"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/sites": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List accessible sites for this token */
        get: {
            parameters: {
                query?: never;
                header?: {
                    /** @description Optional idempotency/request correlation identifier. */
                    "X-Request-Id"?: components["parameters"]["RequestIdHeader"];
                };
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        "X-Request-Id": components["headers"]["XRequestId"];
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["SitesResponse"];
                    };
                };
                401: components["responses"]["Unauthorized"];
                429: components["responses"]["RateLimited"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/tenants": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List accessible tenants for a site
         * @description Returns all active tenants accessible for the requested `site_id`.
         */
        get: {
            parameters: {
                query: {
                    site_id: components["parameters"]["SiteId"];
                };
                header?: {
                    /** @description Optional idempotency/request correlation identifier. */
                    "X-Request-Id"?: components["parameters"]["RequestIdHeader"];
                };
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        "X-Request-Id": components["headers"]["XRequestId"];
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["TenantsResponse"];
                    };
                };
                401: components["responses"]["Unauthorized"];
                403: components["responses"]["Forbidden"];
                422: components["responses"]["InvalidParams"];
                429: components["responses"]["RateLimited"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/usage/current": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Current billing period usage
         * @description Requires `usage:read` scope. Tokens with `metrics:read` also
         *     have implicit access to this endpoint.
         */
        get: {
            parameters: {
                query?: never;
                header?: {
                    /** @description Optional idempotency/request correlation identifier. */
                    "X-Request-Id"?: components["parameters"]["RequestIdHeader"];
                };
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        "X-Request-Id": components["headers"]["XRequestId"];
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["UsageCurrentResponse"];
                    };
                };
                401: components["responses"]["Unauthorized"];
                403: components["responses"]["Forbidden"];
                429: components["responses"]["RateLimited"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/usage/history": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Usage history by month
         * @description Requires `usage:read` scope. Tokens with `metrics:read` also
         *     have implicit access to this endpoint.
         */
        get: {
            parameters: {
                query?: {
                    /** @description Inclusive UTC start date (YYYY-MM-DD). Pass explicit from and to dates to bound the requested period. */
                    from?: components["parameters"]["FromDate"];
                    /** @description Inclusive UTC end date (`YYYY-MM-DD`). Defaults to today. */
                    to?: components["parameters"]["ToDate"];
                };
                header?: {
                    /** @description Optional idempotency/request correlation identifier. */
                    "X-Request-Id"?: components["parameters"]["RequestIdHeader"];
                };
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        "X-Request-Id": components["headers"]["XRequestId"];
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["UsageHistoryResponse"];
                    };
                };
                401: components["responses"]["Unauthorized"];
                403: components["responses"]["Forbidden"];
                422: components["responses"]["InvalidParams"];
                429: components["responses"]["RateLimited"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        AcquisitionChannelItem: {
            /** @enum {string} */
            channel: "Direct" | "Search" | "Referral" | "Social" | "Email" | "Paid" | "Other";
            sessions: number;
        };
        /**
         * @description Visits with and without a referring domain. A direct visit has no
         *     referring domain.
         */
        AcquisitionCoverage: {
            direct_sessions: number;
            direct_share: number | null;
            non_direct_sessions: number;
            non_direct_share: number | null;
        };
        AcquisitionDetailsReportResponse: components["schemas"]["UserApiAcquisitionReportMeta"] & {
            compare: components["schemas"]["UserApiAcquisitionDetailsCurrent"] | null;
            current: components["schemas"]["UserApiAcquisitionDetailsCurrent"];
        };
        AcquisitionDimensionImpactItem: {
            converted_sessions: number;
            session_conversion_rate: number | null;
            value: string;
        };
        AcquisitionDimensionItem: components["schemas"]["AcquisitionSummaryTotals"] & {
            favicon_url?: string | null;
            share: number | null;
            value: string;
        };
        AcquisitionFullReportResponse: components["schemas"]["UserApiAcquisitionEnvelope"] & {
            meta: components["schemas"]["MeteredMeta"];
        };
        /**
         * @description Goal impact by landing page. The landing page comes from the visit's
         *     canonical first pageview in the requested scope. A converted visit
         *     matches at least one selected goal; repeated matches count once. Rates
         *     divide converted visits by visits in the same landing page, period and
         *     traffic scope. `channels`, `sources`, `mediums` and `campaigns` belong
         *     to the Campagnes option: they are computed on visits whose visitor gave
         *     consent and are empty without the option.
         */
        AcquisitionImpact: {
            campaigns: components["schemas"]["AcquisitionDimensionImpactItem"][];
            /** @description Computed on visits with consent (Campagnes option); empty without the option. */
            channels: {
                /** @enum {string} */
                channel: "Direct" | "Search" | "Referral" | "Social" | "Email" | "Paid" | "Other";
                converted_sessions: number;
                session_conversion_rate: number | null;
            }[];
            landing_pages: {
                converted_sessions: number;
                path_canon: string | null;
                session_conversion_rate: number | null;
            }[];
            mediums: components["schemas"]["AcquisitionDimensionImpactItem"][];
            /** @description Computed on visits with consent (Campagnes option); empty without the option. */
            sources: components["schemas"]["AcquisitionDimensionImpactItem"][];
        };
        AcquisitionLandingPageSummaryItem: components["schemas"]["AcquisitionSummaryTotals"] & {
            page_title?: string | null;
            path_canon: string | null;
            share: number | null;
        };
        /** @description Source response variants selected by the effective Acquisition include mode. Current and comparison use the same shape; availability and metering remain present in every variant. */
        AcquisitionReportResponse: components["schemas"]["AcquisitionFullReportResponse"] | components["schemas"]["AcquisitionSummaryReportResponse"] | components["schemas"]["AcquisitionDetailsReportResponse"];
        AcquisitionSummaryChannelItem: components["schemas"]["AcquisitionChannelItem"] & components["schemas"]["AcquisitionSummaryTotals"] & {
            share: number | null;
        };
        AcquisitionSummaryReportResponse: components["schemas"]["UserApiAcquisitionReportMeta"] & {
            compare: components["schemas"]["UserApiAcquisitionSummaryCurrent"] | null;
            current: components["schemas"]["UserApiAcquisitionSummaryCurrent"];
        };
        AcquisitionSummaryTotals: {
            avg_pages_per_session: number | null;
            avg_session_eng_time_ms: number | null;
            engagement_rate: number | null;
            sessions: number;
        };
        ActionsCurrent: {
            /**
             * @description Action rows of the active family, or of every family when none is
             *     selected.
             */
            actions: {
                /** @description Stable element/action identifier when the action row can be narrowed by it. */
                action_id?: string | null;
                action_key: string;
                action_name: string;
                /** @description Target host when the action row can be narrowed by outbound or download target. */
                action_target_host?: string | null;
                event_name?: string | null;
                /** @enum {string} */
                family: "goals" | "forms" | "outbound" | "downloads" | "errors" | "custom" | "instrumentation";
                /** @description Form action path when the form action row can be narrowed by it. */
                form_action_path?: string | null;
                /** @description Form identifier when the form action row can be narrowed by it. */
                form_id?: string | null;
                occurrences: number;
                sessions: number;
                /** @description Derived from the published rounded counts only; it reveals nothing finer than them. */
                share?: number | null;
                top_page?: string | null;
            }[];
            /** @enum {string|null} */
            active_family: "goals" | "forms" | "outbound" | "downloads" | "errors" | "custom" | "instrumentation" | null;
            /** @description Pages and segments around the active family or action. */
            context: {
                pages: {
                    path_canon?: string | null;
                    /** @enum {string} */
                    scope: "family" | "action";
                    sessions: number;
                }[];
                segments: {
                    /** @enum {string} */
                    kind: "device" | "country" | "browser";
                    label: string;
                    /** @enum {string} */
                    scope: "family" | "action";
                    sessions: number;
                }[];
            };
            /**
             * @description Summary of each action family: goals, forms, outbound, downloads,
             *     errors, custom and instrumentation.
             */
            families: {
                /** @enum {string} */
                family: "goals" | "forms" | "outbound" | "downloads" | "errors" | "custom" | "instrumentation";
                occurrences: number;
                sessions: number;
            }[];
            family_timeseries: {
                /** Format: date */
                date: string;
                /** @enum {string} */
                family: "goals" | "forms" | "outbound" | "downloads" | "errors" | "custom" | "instrumentation";
                occurrences: number;
                sessions: number;
            }[];
            goals_configured: boolean;
            timeseries: {
                /** Format: date */
                date: string;
                error_sessions: number;
                instrumentation_sessions: number;
                meaningful_action_sessions: number;
                meaningful_occurrences: number;
                total_sessions: number;
            }[];
            totals: {
                error_sessions: number;
                instrumentation_sessions: number;
                meaningful_action_sessions: number;
                meaningful_occurrences: number;
                total_sessions: number;
            };
        };
        ActionsReportResponse: components["schemas"]["UserApiActionsEnvelope"] & {
            meta: components["schemas"]["MeteredMeta"];
        };
        AnalyticsUnavailableErrorBody: {
            /** @enum {string} */
            code: "ANALYTICS_DB_TIMEOUT" | "ANALYTICS_DB_UNAVAILABLE";
            details?: {
                [key: string]: unknown;
            } | null;
            message: string;
            request_id: string;
        };
        AnalyticsUnavailableErrorResponse: {
            error: components["schemas"]["AnalyticsUnavailableErrorBody"];
        };
        BreakdownResponse: {
            availability: components["schemas"]["ReportAvailability"];
            meta: components["schemas"]["MeteredMeta"];
            rows: components["schemas"]["BreakdownRow"][];
        };
        BreakdownRow: {
            /**
             * @description Breakdown key. When `dimension=tenant`, this is the stable
             *     `tenant_id`.
             */
            key: string;
            /** @description Stable tenant identifier for tenant breakdown rows. */
            tenant_id?: string | null;
            /** @description Current display name for tenant breakdown rows. */
            tenant_name?: string | null;
            /** @description Current routing slug for tenant breakdown rows. */
            tenant_slug?: string | null;
            value: number;
        };
        ContentFullCurrent: {
            entries?: {
                bounce_rate: number | null;
                entries: number;
                page_title?: string | null;
                path_canon: string | null;
            }[];
            exits?: {
                exit_rate: number | null;
                exits: number;
                page_title?: string | null;
                path_canon: string | null;
            }[];
            /** @enum {string} */
            include: "full";
            /**
             * @description One measurement method selected from the current period and reused for comparison.
             * @enum {string}
             */
            metric_method?: "legacy" | "web-vitals-6.2.3-cls1";
            pages: {
                avg_page_eng_time_ms: number | null;
                avg_scroll_depth?: number | null;
                bounces: number;
                entries: number;
                exit_rate: number | null;
                exits: number;
                page_bounce_rate: number | null;
                page_title?: string | null;
                pageviews: number;
                path_canon: string | null;
                performance?: {
                    n_cls?: number;
                    n_fcp?: number;
                    n_inp?: number;
                    n_lcp?: number;
                    n_ttfb?: number;
                    p75_cls: number | null;
                    p75_fcp?: number | null;
                    p75_inp: number | null;
                    p75_lcp: number | null;
                    p75_ttfb: number | null;
                    samples: number;
                } | null;
                /** @description Derived from the published rounded counts only; it reveals nothing finer than them. */
                share?: number | null;
                unique_pageviews: number;
            }[];
            timeseries: {
                /** Format: date */
                date: string;
                pageviews: number;
                path_canon: string;
                /** @description Visible page paths only (not `(other)`). Derived from the published rounded counts only; it reveals nothing finer than them. */
                share?: number | null;
                total_pageviews?: number;
            }[];
            totals: components["schemas"]["ContentTotals"];
        };
        ContentFullReportResponse: components["schemas"]["UserApiContentFullEnvelope"] & {
            meta: components["schemas"]["MeteredMeta"];
        };
        /**
         * @description Discriminated response union selected by `current.include`. Current and
         *     compare always use the same Content mode.
         */
        ContentReportResponse: components["schemas"]["ContentSummaryReportResponse"] | components["schemas"]["ContentFullReportResponse"];
        ContentSummaryCurrent: {
            /** @enum {string} */
            include: "summary";
            /**
             * @description Dense, strictly increasing UTC daily series. It contains exactly
             *     one point per requested day, including zero-valued empty days. The
             *     exact daily pageviews add up to the exact period total, but each
             *     point and `totals.pageviews` are rounded independently: the sum of
             *     the returned points can differ from `totals.pageviews`.
             */
            timeseries: {
                /** Format: date */
                date: string;
                pageviews: number;
            }[];
            totals: components["schemas"]["ContentTotals"];
        };
        ContentSummaryReportResponse: components["schemas"]["UserApiContentSummaryEnvelope"] & {
            meta: components["schemas"]["MeteredMeta"];
        };
        ContentTotals: {
            avg_page_eng_time_ms: number | null;
            bounce_rate: number | null;
            entries: number;
            exit_rate: number | null;
            pageviews: number;
            unique_pageviews: number;
        };
        ErrorBody: {
            /** @enum {string} */
            code: "UNAUTHORIZED" | "FORBIDDEN" | "INVALID_METHOD" | "INVALID_PARAMS" | "RETENTION_EXCEEDED" | "RATE_LIMITED" | "HARD_CAP_REACHED" | "REPORT_NOT_AVAILABLE_FOR_REQUESTED_PERIOD" | "REPORT_RESPONSE_TOO_LARGE" | "INTERNAL_ERROR" | "NOT_FOUND";
            details?: {
                [key: string]: unknown;
            } | null;
            message: string;
            request_id: string;
        };
        ErrorResponse: {
            error: components["schemas"]["ErrorBody"];
        };
        Goal: {
            /** Format: date-time */
            createdAt: string;
            filters?: components["schemas"]["UserApiGoalFilters"];
            goalId: string;
            /** @enum {string} */
            intent: "lead" | "signup" | "purchase" | "download" | "outbound" | "content" | "custom";
            name: string;
            orgId: string;
            pattern: string;
            siteId: string;
            /** @enum {string} */
            type: "PAGEVIEW_MATCH" | "EVENT_MATCH";
            /** Format: date-time */
            updatedAt: string;
        };
        GoalListResponse: {
            items: components["schemas"]["Goal"][];
        };
        /**
         * @description Goals whose selected population is below the reporting minimum or
         *     whose converted-session cohort is below the per-cell minimum are
         *     omitted. Consumers must not infer zero when a configured goal is absent.
         */
        GoalsConversionsCurrent: {
            goals: {
                conversions: number;
                goal_id: string;
                last_seen_at: string | null;
                /**
                 * @description Always `available` for returned goal rows. Suppressed goals
                 *     are omitted rather than returned with zero.
                 * @enum {string}
                 */
                reporting_status?: "available" | "suppressed_small_group" | "insufficient_population";
                total_sessions: number;
                unique_sessions: number;
            }[];
        };
        GoalsConversionsEnvelope: {
            availability: components["schemas"]["ReportAvailability"];
            compare: components["schemas"]["GoalsConversionsCurrent"] | null;
            current: components["schemas"]["GoalsConversionsCurrent"];
            range: components["schemas"]["Range"];
            small_site?: components["schemas"]["SmallSiteBasis"] | null;
        };
        GoalsConversionsResponse: components["schemas"]["GoalsConversionsEnvelope"] & {
            meta: components["schemas"]["MeteredMeta"];
        };
        MeResponse: {
            /** Format: uri */
            docs_url: string;
            org_id: string;
            /**
             * @deprecated
             * @description Deprecated compatibility mirror of `product.runtime_plan_id`. The canonical product object is `product`. This field is retained for compatibility and must not be used by new integrations. It remains returned as a deprecated mirror; no sunset date has been announced.
             * @enum {string}
             */
            plan_id: "free" | "starter" | "pro";
            product: components["schemas"]["WorkspaceProductConfiguration"];
            quotas: components["schemas"]["Quotas"];
            rate_limits: {
                rps: number;
            };
            /**
             * @deprecated
             * @description Deprecated compatibility mirror of `product.product_retention.api_retention_days`. This field is retained for compatibility and must not be used by new integrations. It remains returned as a deprecated mirror; no sunset date has been announced.
             */
            retention_days: number;
        };
        MeteredMeta: {
            billable_overage: boolean;
            request_id: string;
            surface?: components["schemas"]["SurfaceMeta"];
            units_charged: number;
            usage: components["schemas"]["UsageMeta"];
        };
        OverviewCurrent: {
            acquisition: {
                /**
                 * @description Visits with consent by channel (Campagnes option); empty
                 *     without the option.
                 */
                by_channel: components["schemas"]["AcquisitionChannelItem"][];
                top_landing_pages: {
                    page_title?: string | null;
                    path_canon: string | null;
                    sessions: number;
                }[];
                top_referrers: components["schemas"]["TopReferrer"][];
            };
            audience: {
                browsers: {
                    browser_family: string;
                    sessions: number;
                }[];
                countries: {
                    country: string;
                    sessions: number;
                }[];
                devices: {
                    avg_pages_per_session?: number | null;
                    avg_session_eng_time_ms?: number | null;
                    device_type: string;
                    sessions: number;
                }[];
                os: {
                    os_family: string;
                    sessions: number;
                }[];
                regions: {
                    country: string;
                    region: string;
                    sessions: number;
                }[];
            };
            content: {
                movers: {
                    top_gainers: components["schemas"]["UserApiMoverItem"][];
                    top_losers: components["schemas"]["UserApiMoverItem"][];
                };
                top_pages: {
                    page_title?: string | null;
                    pageviews: number;
                    path_canon: string | null;
                }[];
            };
            data_health: {
                last_event_at: string | null;
            };
            overview: {
                timeseries: {
                    avg_page_eng_time_ms: number | null;
                    avg_session_eng_time_ms: number | null;
                    bounce_rate: number | null;
                    /** Format: date */
                    date: string;
                    engagement_rate: number | null;
                    pageviews: number;
                    sessions: number;
                    visitors: number;
                }[];
                totals: {
                    avg_page_eng_time_ms: number | null;
                    avg_pages_per_session: number | null;
                    avg_session_eng_time_ms: number | null;
                    bounce_rate: number | null;
                    engagement_rate: number | null;
                    pageviews: number;
                    sessions: number;
                    visitors: number;
                };
                /** @enum {string} */
                visitors_mode: "sessions" | "daily_uniques";
            };
        };
        OverviewReportResponse: components["schemas"]["UserApiOverviewEnvelope"] & {
            meta: components["schemas"]["MeteredMeta"];
        };
        ProductApi: {
            allow_goals: boolean;
            allow_reports: boolean;
            allow_tenant_dimension: boolean;
            allow_tenants: boolean;
            /** @enum {string} */
            availability: "none" | "limited" | "standard" | "custom";
            can_create_tokens: boolean;
            hard_cap_units?: number | null;
            max_breakdown_limit: number;
            max_range_days: number;
            max_report_limit: number;
            monthly_included_units?: number | null;
            rate_limit_rps?: number | null;
            retention_days?: number | null;
            usage_history_months: number;
        };
        ProductDashboard: {
            hourly_enabled: boolean;
            /** @enum {string} */
            hourly_level: "none" | "limited" | "standard" | "guardrailed" | "advanced" | "custom";
            /** @enum {string} */
            team_management_level: "none" | "limited" | "standard" | "guardrailed" | "advanced" | "custom";
        };
        ProductExports: {
            csv: boolean;
            formats: "csv"[];
            /** @enum {string} */
            level: "none" | "limited" | "standard" | "guardrailed" | "advanced" | "custom";
            surfaces: ("content" | "acquisition" | "actions" | "technology" | "performance")[];
        };
        ProductQuotas: {
            events_included: number;
            hard_site_limit: number;
            hard_user_limit: number | null;
            sites_included: number;
            users_included: number | null;
        };
        ProductRetention: {
            api_retention_days?: number | null;
            workspace_retention: components["schemas"]["RetentionPolicy"];
        };
        Quotas: {
            hard_cap_units: number;
            included_units: number;
            overage_units: number;
            /** Format: date-time */
            reset_at: string;
            used_units: number;
        };
        Range: {
            /** Format: date-time */
            compare_end: string | null;
            /** Format: date-time */
            compare_start: string | null;
            /** Format: date-time */
            end: string;
            /** Format: date-time */
            start: string;
        };
        /**
         * @description Availability of a report for the requested period and its comparison
         *     period. `sections` lists the parts of the report that belong to the
         *     Campagnes option; each one is reported with the reason
         *     `campaigns_option_required` while the option is off.
         */
        ReportAvailability: {
            compare: components["schemas"]["ReportPeriodAvailability"] | null;
            current: components["schemas"]["ReportPeriodAvailability"];
            route: components["schemas"]["ReportAvailabilityRouteId"];
            sections: components["schemas"]["ReportSectionAvailability"][];
        };
        /**
         * @description - `campaigns_option_required`: the data belongs to the Campagnes
         *       option, which is not enabled on the site.
         *     - `outside_source_coverage`: the requested period is not covered by
         *       collected data.
         * @enum {string|null}
         */
        ReportAvailabilityReason: "campaigns_option_required" | "outside_source_coverage" | null;
        /** @description Opaque identifier for the route associated with this availability result. */
        ReportAvailabilityRouteId: string;
        /** @description Opaque identifier for a section within an availability result. */
        ReportAvailabilitySectionId: string;
        /** @enum {string} */
        ReportAvailabilityStatus: "available" | "partially_available_outside_source_coverage" | "not_available_for_requested_period";
        ReportPeriodAvailability: {
            /** Format: date-time */
            compatibleEnd: string | null;
            /** Format: date-time */
            compatibleStart: string | null;
            reason: components["schemas"]["ReportAvailabilityReason"];
            /** Format: date-time */
            requestedEnd: string;
            /** Format: date-time */
            requestedStart: string;
            status: components["schemas"]["ReportAvailabilityStatus"];
        };
        /**
         * @description Availability of a report section that belongs to the Campagnes option.
         *     The report itself is returned with HTTP `200`; the section is empty
         *     when the site does not have the option.
         */
        ReportSectionAvailability: {
            compare: components["schemas"]["ReportPeriodAvailability"] | null;
            current: components["schemas"]["ReportPeriodAvailability"];
            id: components["schemas"]["ReportAvailabilitySectionId"];
        };
        RetentionPolicy: {
            /** @enum {string} */
            kind: "fixed" | "custom";
            /** @enum {string} */
            unit?: "days" | "months";
            value?: number;
        };
        SiteItem: {
            hostnames: string[];
            name: string;
            product_configuration: components["schemas"]["SiteProductConfiguration"];
            siteId: string;
            /** @enum {string} */
            status: "ACTIVE" | "SUSPENDED";
        };
        SiteProductConfiguration: {
            api: components["schemas"]["ProductApi"];
            /** @description Campagnes option of the site: marketing reports (channels, sources, mediums, campaigns) computed on visits whose visitor gave consent. Off by default; the owner or an admin of the workspace sets it, on every plan. */
            campaigns_enabled: boolean;
            dashboard: components["schemas"]["ProductDashboard"];
            exports: components["schemas"]["ProductExports"];
            product_retention: components["schemas"]["ProductRetention"];
            /** @enum {string} */
            runtime_plan_id: "free" | "starter" | "pro";
            technical_retention: components["schemas"]["TechnicalRetention"];
        };
        SitesResponse: {
            items: components["schemas"]["SiteItem"][];
        };
        /**
         * @description Small-site rule. A rate, a mean or a percentile needs ten contributors;
         *     below, it is `null` in `current`. When the requested period has fewer,
         *     these are the same totals over the shortest calendar period (ISO week,
         *     month, quarter, year) that contains it and counts ten contributors.
         *     Complement rule: when a filter sets apart 1 to 9 visits of the site in
         *     the requested period, its rates, means, durations and percentiles are
         *     `null` (rows included, and in `compare`), and these totals come from
         *     the shortest such period where the filter sets apart none or at least
         *     ten visits (`reason: filter_complement`). Counts are unchanged.
         *     Absent or `null` when no such period exists.
         */
        SmallSiteBasis: {
            period: {
                /** Format: date-time */
                end: string;
                /** Format: date-time */
                start: string;
            };
            /** @enum {string} */
            reason?: "small_site" | "filter_complement";
            totals: {
                [key: string]: number | null;
            };
        };
        /** @description Compare window metadata for report and metrics surfaces. */
        SurfaceCompareWindow: {
            /** Format: date-time */
            compareEnd?: string | null;
            /** Format: date-time */
            compareStart?: string | null;
            enabled: boolean;
            /** @enum {string|null} */
            mode?: "prev_period" | null;
        };
        /** @description Freshness metadata for a report or metrics surface. */
        SurfaceDataFreshness: {
            /** Format: date-time */
            asOf?: string | null;
            cached?: boolean;
            lagMinutes?: number | null;
            notes?: string[];
            /** @enum {string} */
            status: "fresh" | "delayed" | "stale" | "unknown";
        };
        /** @description Export availability for the returned surface and selected plan. */
        SurfaceExportCapability: {
            csv: boolean;
            /** @enum {string} */
            level: "none" | "limited" | "standard" | "guardrailed" | "advanced" | "custom";
            notes?: string[];
        };
        /** @description Additive metadata for reports and metrics. */
        SurfaceMeta: {
            compareWindow: components["schemas"]["SurfaceCompareWindow"];
            dataFreshness: components["schemas"]["SurfaceDataFreshness"];
            exportCapability: components["schemas"]["SurfaceExportCapability"];
            /** @description Analytics counts are exact from 10. Numeric 5 represents measured activity in the inclusive interval 1..9 and MUST be rendered as less than 10, never as five measured visits. Zero means a measured empty count. Detail rows under 10 visits are not published. The interval representative is not additive: use canonical period and daily totals, not sums of bins. Rates are published to the percent; 0.005 and 0.995 represent the open tails below 1% and above 99%. Rates, means, durations and percentiles are null under 10 contributors. Last conversion dates have day precision. Usage metering, billing, limits and diagnostics remain exact. This policy reduces detail; it is not a guarantee of anonymity. */
            reportingPrecision?: {
                /** @enum {integer} */
                countStep: 1;
                /** @enum {number} */
                rateStep: 0.01;
                smallPositiveCount: {
                    /** @enum {integer} */
                    lower: 1;
                    /** @enum {integer} */
                    representative: 5;
                    /** @enum {integer} */
                    upper: 9;
                };
                /** @enum {string} */
                version: "exact-counts-v1";
            };
        };
        TechnicalRetention: {
            site_data_retention_months: number;
        };
        TenantItem: {
            /** @enum {string} */
            status: "ACTIVE" | "INACTIVE";
            /** @description Stable tenant identifier. */
            tenant_id: string;
            /** @description Current display name from the tenant registry. */
            tenant_name: string;
            /** @description Current routing slug from the tenant registry. */
            tenant_slug: string;
        };
        TenantsResponse: {
            items: components["schemas"]["TenantItem"][];
        };
        TimeseriesPoint: {
            ts: string;
            value: number;
        };
        TimeseriesResponse: {
            availability: components["schemas"]["ReportAvailability"];
            meta: components["schemas"]["MeteredMeta"];
            points: components["schemas"]["TimeseriesPoint"][];
        };
        TopReferrer: {
            domain: string;
            favicon_url?: string | null;
            sessions: number;
        };
        TopSource: {
            sessions: number;
            source: string;
        };
        UsageCurrentResponse: {
            hard_cap_units: number;
            period: string;
            /** Format: date-time */
            reset_at: string;
            units_included: number;
            units_overage: number;
            units_used: number;
        };
        UsageHistoryItem: {
            hard_cap_units: number;
            period: string;
            units_included: number;
            units_overage: number;
            units_used: number;
        };
        UsageHistoryResponse: {
            items: components["schemas"]["UsageHistoryItem"][];
        };
        UsageMeta: {
            hard_cap_units: number;
            included_units: number;
            overage_units: number;
            used_units: number;
        };
        UserApiAcquisitionCurrent: {
            /**
             * @description Visits with consent by channel (Campagnes option, section
             *     `acquisition_attribution`); empty without the option.
             */
            by_channel: components["schemas"]["AcquisitionChannelItem"][];
            by_day: {
                /** Format: date */
                date: string;
                sessions: number;
            }[];
            /** @description Campagnes option of the site. When `false`, the Campagnes sections are empty. */
            campaigns_enabled: boolean;
            /** @description Visits with Campagnes consent in the period, rounded like the other counts. `0` when the option is off. */
            consented_sessions: number;
            /**
             * @description Visits with consent by campaign (Campagnes option, section
             *     `acquisition_attribution`); empty without the option.
             */
            top_campaigns: {
                campaign: string;
                sessions: number;
            }[];
            /** @description Landing pages of the visits. */
            top_landing_pages: {
                page_title?: string | null;
                path_canon: string | null;
                sessions: number;
            }[];
            /**
             * @description Visits with consent by medium (Campagnes option, section
             *     `acquisition_attribution`); empty without the option.
             */
            top_mediums: {
                medium: string;
                sessions: number;
            }[];
            /** @description Referring domains of the visits. */
            top_referrers: components["schemas"]["TopReferrer"][];
            /**
             * @description Visits with consent by source (Campagnes option, section
             *     `acquisition_attribution`); empty without the option.
             */
            top_sources: components["schemas"]["TopSource"][];
            totals: {
                avg_session_eng_time_ms: number | null;
                engagement_rate: number | null;
                pageviews: number;
                sessions: number;
            };
        };
        UserApiAcquisitionDetailsCurrent: {
            /** @description Campagnes option of the site. When `false`, the Campagnes sections are empty. */
            campaigns_enabled: boolean;
            /** @description Visits with Campagnes consent in the period, rounded like the other counts. `0` when the option is off. */
            consented_sessions: number;
            dimensions: {
                /** @description Computed on visits with consent (Campagnes option); empty without the option. */
                campaigns: components["schemas"]["AcquisitionDimensionItem"][];
                /** @description Computed on visits with consent (Campagnes option); empty without the option. */
                contents: components["schemas"]["AcquisitionDimensionItem"][];
                /** @description Computed on visits with consent (Campagnes option); empty without the option. */
                mediums: components["schemas"]["AcquisitionDimensionItem"][];
                referrers: components["schemas"]["AcquisitionDimensionItem"][];
                /** @description Computed on visits with consent (Campagnes option); empty without the option. */
                sources: components["schemas"]["AcquisitionDimensionItem"][];
                /** @description Computed on visits with consent (Campagnes option); empty without the option. */
                terms: components["schemas"]["AcquisitionDimensionItem"][];
            };
            goals_configured: boolean;
            impact?: components["schemas"]["AcquisitionImpact"] | null;
            landing_pages: components["schemas"]["AcquisitionLandingPageSummaryItem"][];
        };
        UserApiAcquisitionEnvelope: {
            availability: components["schemas"]["ReportAvailability"];
            compare: components["schemas"]["UserApiAcquisitionCurrent"] | null;
            current: components["schemas"]["UserApiAcquisitionCurrent"];
            range: components["schemas"]["Range"];
            small_site?: components["schemas"]["SmallSiteBasis"] | null;
        };
        UserApiAcquisitionReportMeta: {
            availability: components["schemas"]["ReportAvailability"];
            meta: components["schemas"]["MeteredMeta"];
            range: components["schemas"]["Range"];
        };
        UserApiAcquisitionSummaryCurrent: {
            /** @description Campagnes option of the site. When `false`, the Campagnes sections are empty. */
            campaigns_enabled: boolean;
            /**
             * @description Visits with consent by channel and day (Campagnes option); empty
             *     without the option.
             */
            channel_timeseries: {
                /** @enum {string} */
                channel: "Direct" | "Search" | "Referral" | "Social" | "Email" | "Paid" | "Other";
                /** Format: date */
                date: string;
                sessions: number;
            }[];
            /**
             * @description Visits with consent by channel (Campagnes option, section
             *     `acquisition_attribution`); empty without the option.
             */
            channels: components["schemas"]["AcquisitionSummaryChannelItem"][];
            /** @description Visits with Campagnes consent in the period, rounded like the other counts. `0` when the option is off. */
            consented_sessions: number;
            coverage: components["schemas"]["AcquisitionCoverage"];
            goals_configured: boolean;
            mix_timeseries: {
                /** Format: date */
                date: string;
                sessions: number;
            }[];
            totals: components["schemas"]["AcquisitionSummaryTotals"];
        };
        UserApiActionsEnvelope: {
            availability: components["schemas"]["ReportAvailability"];
            compare: components["schemas"]["ActionsCurrent"] | null;
            current: components["schemas"]["ActionsCurrent"];
            range: components["schemas"]["Range"];
            small_site?: components["schemas"]["SmallSiteBasis"] | null;
        };
        UserApiContentFullEnvelope: {
            availability: components["schemas"]["ReportAvailability"];
            compare: components["schemas"]["ContentFullCurrent"] | null;
            current: components["schemas"]["ContentFullCurrent"];
            range: components["schemas"]["Range"];
            small_site?: components["schemas"]["SmallSiteBasis"] | null;
        };
        UserApiContentSummaryEnvelope: {
            availability: components["schemas"]["ReportAvailability"];
            compare: components["schemas"]["ContentSummaryCurrent"] | null;
            current: components["schemas"]["ContentSummaryCurrent"];
            range: components["schemas"]["Range"];
            small_site?: components["schemas"]["SmallSiteBasis"] | null;
        };
        UserApiGoalFilters: {
            action_id?: string;
            action_target_host?: string;
            form_action_path?: string;
            form_id?: string;
        };
        UserApiMoverItem: {
            current_pageviews: number;
            delta: number;
            delta_pct: number;
            page_title?: string | null;
            path_canon: string | null;
            previous_pageviews: number;
        };
        UserApiOverviewEnvelope: {
            availability: components["schemas"]["ReportAvailability"];
            compare: components["schemas"]["OverviewCurrent"] | null;
            current: components["schemas"]["OverviewCurrent"];
            range: components["schemas"]["Range"];
            small_site?: components["schemas"]["SmallSiteBasis"] | null;
        };
        WorkspaceProductConfiguration: {
            api: components["schemas"]["ProductApi"];
            dashboard: components["schemas"]["ProductDashboard"];
            exports: components["schemas"]["ProductExports"];
            product_retention: components["schemas"]["ProductRetention"];
            quotas: components["schemas"]["ProductQuotas"];
            /** @enum {string} */
            runtime_plan_id: "free" | "starter" | "pro";
        };
    };
    responses: {
        /**
         * @description Analytics serving timed out (`ANALYTICS_DB_TIMEOUT`) or is temporarily
         *     unavailable (`ANALYTICS_DB_UNAVAILABLE`).
         */
        AnalyticsUnavailable: {
            headers: {
                "X-RateLimit-Limit": components["headers"]["XRateLimitLimit"];
                "X-RateLimit-Remaining": components["headers"]["XRateLimitRemaining"];
                "X-RateLimit-Reset": components["headers"]["XRateLimitReset"];
                "X-Request-Id": components["headers"]["XRequestId"];
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["AnalyticsUnavailableErrorResponse"];
            };
        };
        /** @description Token scope/site/plan does not allow this request. */
        Forbidden: {
            headers: {
                "X-Request-Id": components["headers"]["XRequestId"];
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["ErrorResponse"];
            };
        };
        /** @description Billing hard cap reached for current month. */
        HardCapReached: {
            headers: {
                "X-Request-Id": components["headers"]["XRequestId"];
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["ErrorResponse"];
            };
        };
        /** @description Request parameters are invalid. */
        InvalidParams: {
            headers: {
                "X-Request-Id": components["headers"]["XRequestId"];
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["ErrorResponse"];
            };
        };
        /** @description Request was throttled. */
        RateLimited: {
            headers: {
                "X-RateLimit-Limit": components["headers"]["XRateLimitLimit"];
                "X-RateLimit-Remaining": components["headers"]["XRateLimitRemaining"];
                "X-RateLimit-Reset": components["headers"]["XRateLimitReset"];
                "X-Request-Id": components["headers"]["XRequestId"];
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["ErrorResponse"];
            };
        };
        /**
         * @description The requested period is not covered by collected data
         *     (`REPORT_NOT_AVAILABLE_FOR_REQUESTED_PERIOD`).
         */
        ReportAvailabilityConflict: {
            headers: {
                "X-Request-Id": components["headers"]["XRequestId"];
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["ErrorResponse"];
            };
        };
        /** @description Invalid or revoked API token. */
        Unauthorized: {
            headers: {
                "X-Request-Id": components["headers"]["XRequestId"];
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["ErrorResponse"];
            };
        };
    };
    parameters: {
        /**
         * @description Acquisition `include=details` only. Selects one configured goal belonging
         *     to the requested site for conversion impact. Omission uses the union
         *     of all configured goals. An unknown goal or another report variant
         *     returns `INVALID_PARAMS` without charging usage.
         */
        AcquisitionGoalId: string;
        /** @description Filter action reports by normalized action family. */
        ActionFamily: "goals" | "forms" | "outbound" | "downloads" | "errors" | "custom" | "instrumentation";
        /** @description Filter action reports by normalized action key. */
        ActionKey: string;
        /**
         * @description Grouping dimension for breakdown endpoint.
         *     When `dimension=tenant`, rows are grouped by stable `tenant_id`. The
         *     statistics of a tenant are those of the page's client space. The
         *     response also includes `tenant_slug` and `tenant_name` as display labels.
         */
        BreakdownDimension: "device" | "referrer" | "page" | "browser" | "os" | "country" | "tenant";
        /** @description Number of rows returned by breakdown endpoint. */
        BreakdownLimit: number;
        /** @description Compare current range against the previous equivalent period. */
        CompareParam: "prev_period";
        /**
         * @description Content response depth. `summary` returns totals and one global UTC
         *     pageview point per day; `limit` has no effect. `full` returns the
         *     detailed Content report. `details` is a deprecated alias for `full`.
         *     When omitted, ranges up to 90 days use `full`; ranges from 91 through
         *     365 days use `summary`.
         */
        ContentInclude: "summary" | "full" | "details";
        /**
         * @description JSON object serialized as string, example:
         *     `{"device":"mobile","referrer":"google.com"}`.
         */
        Filters: string;
        /** @description Inclusive UTC start date (YYYY-MM-DD). Pass explicit from and to dates to bound the requested period. */
        FromDate: string;
        /** @description Granularity (`hour` can require higher plan). */
        Interval: "day" | "hour";
        /**
         * @description Metric to aggregate (default `pageviews`). `sessions` uses the same
         *     visit model as the dashboard: a `visit_id` starts from the
         *     privacy-preserving daily visitor key and is split after 30 minutes of
         *     inactivity.
         */
        Metric: "pageviews" | "sessions" | "events";
        /** @description Report depth for Acquisition and Actions. When report include selection is enabled, omission selects summary; otherwise the handler uses full even when include is supplied. No unconditional default is declared here. */
        ReportInclude: "summary" | "full" | "details";
        /** @description Number of rows returned by top lists for report endpoints. */
        ReportLimit: number;
        /** @description Optional idempotency/request correlation identifier. */
        RequestIdHeader: string;
        SiteId: string;
        /**
         * @description Stable tenant identifier. Use this for tenant-scoped analytics and
         *     tenant-scoped access control. `site_id` identifies the shared product,
         *     `tenant_id` identifies one tenant.
         */
        TenantId: string;
        /** @description Inclusive UTC end date (`YYYY-MM-DD`). Defaults to today. */
        ToDate: string;
        /** @description Traffic segment to include. */
        TrafficParam: "humans" | "humans_including_ai" | "bots_only" | "ai_bots_only" | "all";
    };
    requestBodies: never;
    headers: {
        /** @description Maximum requests allowed during current short window. */
        XRateLimitLimit: number;
        /** @description Remaining requests in current short window. */
        XRateLimitRemaining: number;
        /** @description Unix timestamp when short window resets. */
        XRateLimitReset: number;
        /** @description Request identifier for troubleshooting. */
        XRequestId: string;
    };
    pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
