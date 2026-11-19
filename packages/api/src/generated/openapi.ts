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
                    /** @description Inclusive start date (YYYY-MM-DD), a day of the site's time zone (a UTC date for usage history). Pass explicit from and to dates to bound the requested period. */
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
                    /** @description Inclusive end date (`YYYY-MM-DD`), a day of the site's time zone (a UTC date for usage history). Defaults to today. */
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
                     *     statistics of a tenant are those of the page's tracked space. The
                     *     response also includes `tenant_slug` and `tenant_name` as display labels.
                     */
                    dimension?: components["parameters"]["BreakdownDimension"];
                    /**
                     * @description JSON object serialized as string, example:
                     *     `{"device":"mobile","referrer":"google.com"}`.
                     */
                    filters?: components["parameters"]["Filters"];
                    /** @description Inclusive start date (YYYY-MM-DD), a day of the site's time zone (a UTC date for usage history). Pass explicit from and to dates to bound the requested period. */
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
                    /** @description Inclusive end date (`YYYY-MM-DD`), a day of the site's time zone (a UTC date for usage history). Defaults to today. */
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
                    /** @description Inclusive start date (YYYY-MM-DD), a day of the site's time zone (a UTC date for usage history). Pass explicit from and to dates to bound the requested period. */
                    from?: components["parameters"]["FromDate"];
                    /** @description Granularity (`day` or `hour`, on every plan with API access). */
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
                    /** @description Inclusive end date (`YYYY-MM-DD`), a day of the site's time zone (a UTC date for usage history). Defaults to today. */
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
         * @description Provenance of every visit: referring domains, the named sources that
         *     gather them (google.fr and google.com under Google), the types of
         *     referring site (search engine, social network, messaging, AI
         *     assistant, other site) and landing pages. A direct visit has no
         *     referring domain. Sources and types are read through a fixed table;
         *     they never separate paid from organic.
         *
         *     Channels, campaign sources, mediums, campaigns and impact by source
         *     belong to the Campagnes option: `by_channel`, `channels`,
         *     `channel_timeseries`, `top_sources`, `top_mediums`, `top_campaigns`,
         *     `dimensions.sources`, `dimensions.mediums`, `dimensions.campaigns`,
         *     `dimensions.contents`, `dimensions.terms` and `impact` (except
         *     `impact.landing_pages`) are computed on visits whose
         *     visitor gave consent, with the usual reporting precision (exact
         *     counts from 10, `< 10` below, rows under 10 visits grouped, rates and means `null`
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
                    /** @description Inclusive start date (YYYY-MM-DD), a day of the site's time zone (a UTC date for usage history). Pass explicit from and to dates to bound the requested period. */
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
                    /** @description Inclusive end date (`YYYY-MM-DD`), a day of the site's time zone (a UTC date for usage history). Defaults to today. */
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
                    /** @description Inclusive start date (YYYY-MM-DD), a day of the site's time zone (a UTC date for usage history). Pass explicit from and to dates to bound the requested period. */
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
                    /** @description Inclusive end date (`YYYY-MM-DD`), a day of the site's time zone (a UTC date for usage history). Defaults to today. */
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
         * @description `summary` supports 1-365 inclusive days of the site's time zone. `full` and its deprecated
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
                    /** @description Inclusive start date (YYYY-MM-DD), a day of the site's time zone (a UTC date for usage history). Pass explicit from and to dates to bound the requested period. */
                    from?: components["parameters"]["FromDate"];
                    /**
                     * @description Content response depth. `summary` returns totals and one global
                     *     pageview point per day of the site's time zone; `limit` has no effect. `full` returns the
                     *     detailed Content report.
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
                    /** @description Inclusive end date (`YYYY-MM-DD`), a day of the site's time zone (a UTC date for usage history). Defaults to today. */
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
                    /** @description Inclusive start date (YYYY-MM-DD), a day of the site's time zone (a UTC date for usage history). Pass explicit from and to dates to bound the requested period. */
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
                    /** @description Inclusive end date (`YYYY-MM-DD`), a day of the site's time zone (a UTC date for usage history). Defaults to today. */
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
        /**
         * Register or update tenants of a site
         * @description Requires the dedicated `tenants:write` scope, distinct from the read
         *     scopes; a token restricted to some tenants cannot hold it.
         *
         *     Additive and idempotent. The listed tenants are created or updated;
         *     tenants that are not listed are never changed. Sending the same body
         *     again changes nothing (`unchanged`). A tenant is deactivated only by
         *     an explicit `status: INACTIVE`. The whole body is validated before
         *     the first write; a batch interrupted by a failure is resumed by
         *     sending it again. At most 100 tenants per request: send larger
         *     registries in several requests. A slug already used by another tenant
         *     of the site is refused with `409 TENANT_SLUG_CONFLICT`. A tenant
         *     changed by another write between the read and the write is refused with
         *     `409 TENANT_CONFLICT`: nothing is overwritten, send the request again.
         */
        post: {
            parameters: {
                query?: never;
                header?: {
                    /** @description Optional idempotency/request correlation identifier. */
                    "X-Request-Id"?: components["parameters"]["RequestIdHeader"];
                };
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["TenantsWriteRequest"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        "X-Pomelo-Usage-Warning": components["headers"]["XPomeloUsageWarning"];
                        "X-Request-Id": components["headers"]["XRequestId"];
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["TenantsWriteResponse"];
                    };
                };
                401: components["responses"]["Unauthorized"];
                403: components["responses"]["Forbidden"];
                /** @description `TENANT_SLUG_CONFLICT`: a slug is already used by another tenant of the site. `TENANT_CONFLICT`: a tenant was changed concurrently; send the request again. */
                409: {
                    headers: {
                        "X-Request-Id": components["headers"]["XRequestId"];
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["TenantConflictErrorResponse"];
                    };
                };
                422: components["responses"]["InvalidParams"];
                429: components["responses"]["RateLimited"];
            };
        };
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
         *     A token restricted to tenants (`allowed_tenant_ids`) is refused with
         *     `403 FORBIDDEN`: it cannot read the organization's consumption.
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
         *     A token restricted to tenants (`allowed_tenant_ids`) is refused with
         *     `403 FORBIDDEN`: it cannot read the organization's consumption.
         */
        get: {
            parameters: {
                query?: {
                    /** @description Inclusive start date (YYYY-MM-DD), a day of the site's time zone (a UTC date for usage history). Pass explicit from and to dates to bound the requested period. */
                    from?: components["parameters"]["FromDate"];
                    /** @description Inclusive end date (`YYYY-MM-DD`), a day of the site's time zone (a UTC date for usage history). Defaults to today. */
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
            sessions: number | null;
        };
        /**
         * @description Visits with and without a referring domain. A direct visit has no
         *     referring domain.
         */
        AcquisitionCoverage: {
            direct_sessions: number | null;
            direct_share: number | null;
            non_direct_sessions: number | null;
            non_direct_share: number | null;
        };
        AcquisitionDetailsReportResponse: components["schemas"]["UserApiAcquisitionReportMeta"] & {
            compare: components["schemas"]["UserApiAcquisitionDetailsCurrent"] | null;
            current: components["schemas"]["UserApiAcquisitionDetailsCurrent"];
        };
        AcquisitionDimensionImpactItem: {
            converted_sessions: number | null;
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
                converted_sessions: number | null;
                session_conversion_rate: number | null;
            }[];
            landing_pages: {
                converted_sessions: number | null;
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
        /**
         * @description A named source of the provenance, all visits. `domains` lists its
         *     domains of ten visits or more; the rest of the source is its other
         *     domains.
         */
        AcquisitionReferrerSourceItem: components["schemas"]["AcquisitionDimensionItem"] & {
            domains: components["schemas"]["AcquisitionDimensionItem"][];
            type: components["schemas"]["ReferrerType"];
        };
        /** @description Visits by type of referring site, all visits. */
        AcquisitionReferrerTypeItem: components["schemas"]["AcquisitionSummaryTotals"] & {
            share: number | null;
            value: components["schemas"]["ReferrerType"];
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
            sessions: number | null;
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
                occurrences: number | null;
                sessions: number | null;
                /** @description Derived from the published counts only; it reveals nothing finer than them. */
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
                    sessions: number | null;
                }[];
                segments: {
                    /** @enum {string} */
                    kind: "device" | "country" | "browser";
                    label: string;
                    /** @enum {string} */
                    scope: "family" | "action";
                    sessions: number | null;
                }[];
            };
            /**
             * @description Summary of each action family: goals, forms, outbound, downloads,
             *     errors, custom and instrumentation.
             */
            families: {
                /** @enum {string} */
                family: "goals" | "forms" | "outbound" | "downloads" | "errors" | "custom" | "instrumentation";
                occurrences: number | null;
                sessions: number | null;
            }[];
            family_timeseries: {
                /** Format: date */
                date: string;
                /** @enum {string} */
                family: "goals" | "forms" | "outbound" | "downloads" | "errors" | "custom" | "instrumentation";
                occurrences: number | null;
                sessions: number | null;
            }[];
            goals_configured: boolean;
            timeseries: {
                /** Format: date */
                date: string;
                error_sessions: number | null;
                instrumentation_sessions: number | null;
                meaningful_action_sessions: number | null;
                meaningful_occurrences: number | null;
                total_sessions: number | null;
            }[];
            totals: {
                error_sessions: number | null;
                instrumentation_sessions: number | null;
                meaningful_action_sessions: number | null;
                meaningful_occurrences: number | null;
                total_sessions: number | null;
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
            /**
             * @description Values of ten visits or more, except the whole-site breakdowns
             *     exact from 1. With a filter, a client space or a raw referrer, the
             *     values under ten visits are grouped in one last row,
             *     `key: "(other)"`, summed before the cut to `limit`; its `value` is
             *     exact from 10 and `null` from 1 to 9, and the row is absent when
             *     nothing is grouped. A client that reads the rows as entities must
             *     skip it.
             */
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
            value: number | null;
        };
        ContentFullCurrent: {
            entries?: {
                bounce_rate: number | null;
                entries: number | null;
                page_title?: string | null;
                path_canon: string | null;
            }[];
            exits?: {
                exit_rate: number | null;
                exits: number | null;
                page_title?: string | null;
                path_canon: string | null;
            }[];
            /** @enum {string} */
            include: "full";
            /**
             * @description The only Web Vitals measurement method served.
             * @enum {string}
             */
            metric_method?: "web-vitals-6.2.3-cls1";
            pages: {
                avg_page_eng_time_ms: number | null;
                avg_scroll_depth?: number | null;
                bounces: number | null;
                entries: number | null;
                exit_rate: number | null;
                exits: number | null;
                page_bounce_rate: number | null;
                page_title?: string | null;
                pageviews: number | null;
                path_canon: string | null;
                performance?: {
                    n_cls?: number | null;
                    n_fcp?: number | null;
                    n_inp?: number | null;
                    n_lcp?: number | null;
                    n_ttfb?: number | null;
                    p75_cls: number | null;
                    p75_fcp?: number | null;
                    p75_inp: number | null;
                    p75_lcp: number | null;
                    p75_ttfb: number | null;
                    samples: number | null;
                } | null;
                /** @description Derived from the published counts only; it reveals nothing finer than them. */
                share?: number | null;
                unique_pageviews: number | null;
            }[];
            timeseries: {
                /** Format: date */
                date: string;
                pageviews: number | null;
                path_canon: string;
                /** @description Visible page paths only (not `(other)`). Derived from the published counts only; it reveals nothing finer than them. */
                share?: number | null;
                total_pageviews?: number | null;
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
             * @description Dense, strictly increasing daily series in the site's time zone. It
             *     contains exactly one point per requested day, including zero-valued
             *     empty days. The
             *     exact daily pageviews add up to the exact period total. Without
             *     any filter, each point and `totals.pageviews` are published
             *     exactly from 1. With a filter, a count from 1 to 9 is published
             *     as `null` (« < 10 »; zero stays `0`), so the returned points
             *     cannot be added up; use `totals.pageviews`.
             */
            timeseries: {
                /** Format: date */
                date: string;
                pageviews: number | null;
            }[];
            totals: components["schemas"]["ContentTotals"];
        };
        ContentSummaryReportResponse: components["schemas"]["UserApiContentSummaryEnvelope"] & {
            meta: components["schemas"]["MeteredMeta"];
        };
        ContentTotals: {
            avg_page_eng_time_ms: number | null;
            bounce_rate: number | null;
            entries: number | null;
            exit_rate: number | null;
            pageviews: number | null;
            unique_pageviews: number | null;
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
                conversions: number | null;
                goal_id: string;
                last_seen_at: string | null;
                /**
                 * @description Always `available` for returned goal rows. Suppressed goals
                 *     are omitted rather than returned with zero.
                 * @enum {string}
                 */
                reporting_status?: "available" | "suppressed_small_group" | "insufficient_population";
                total_sessions: number | null;
                unique_sessions: number | null;
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
            product: components["schemas"]["WorkspaceProductConfiguration"];
            quotas?: components["schemas"]["Quotas"];
            rate_limits: {
                rps: number;
            };
        };
        MeteredMeta: {
            billable_overage?: boolean;
            request_id: string;
            surface?: components["schemas"]["SurfaceMeta"];
            units_charged: number;
            usage?: components["schemas"]["UsageMeta"];
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
                    sessions: number | null;
                }[];
                /**
                 * @description Named sources, all visits: the domains of one service under
                 *     its name, counted before the ten-visit threshold. Outside the
                 *     whole-site view the sources under ten visits are grouped in
                 *     one last row, `source: "(other)"` of type `other`, counted as
                 *     `audience.countries`.
                 */
                top_referrer_sources: components["schemas"]["TopReferrerSource"][];
                /**
                 * @description Raw referring domains of ten visits or more. The domains under
                 *     ten visits are grouped in one last row, `domain: "(other)"`;
                 *     its `sessions` is exact from 10 and `null` from 1 to 9, and
                 *     the row is absent when nothing is grouped.
                 */
                top_referrers: components["schemas"]["TopReferrer"][];
            };
            audience: {
                /**
                 * @description Browser families. Outside the whole-site view the families
                 *     under ten visits are grouped in one last row,
                 *     `browser_family: "(other)"`, counted as `countries`.
                 */
                browsers: {
                    browser_family: string;
                    sessions: number | null;
                }[];
                /**
                 * @description Cities of ten visits or more. The cities under ten visits are
                 *     grouped in one last row, `city: "(other)"` and
                 *     `country: "(other)"`; its `sessions` is exact from 10 and
                 *     `null` from 1 to 9, and the row is absent when nothing is
                 *     grouped. The city is read alone: the list is empty with a
                 *     hostname, client space, filter or segment.
                 */
                cities?: {
                    city: string;
                    country: string;
                    sessions: number | null;
                }[];
                /**
                 * @description Countries of ten visits or more (exact from 1 on the whole
                 *     site with no filter). Elsewhere the countries under ten visits
                 *     are grouped in one last row, `country: "(other)"`; its
                 *     `sessions` is exact from 10 and `null` from 1 to 9, and the row
                 *     is absent when nothing is grouped.
                 */
                countries: {
                    country: string;
                    sessions: number | null;
                }[];
                /**
                 * @description Device types. Outside the whole-site view the types under ten
                 *     visits are grouped in one last row, `device_type: "(other)"`,
                 *     counted as `countries`; its averages are `null`.
                 */
                devices: {
                    avg_pages_per_session?: number | null;
                    avg_session_eng_time_ms?: number | null;
                    device_type: string;
                    sessions: number | null;
                }[];
                /**
                 * @description Operating system families. Outside the whole-site view the
                 *     families under ten visits are grouped in one last row,
                 *     `os_family: "(other)"`, counted as `countries`.
                 */
                os: {
                    os_family: string;
                    sessions: number | null;
                }[];
                /**
                 * @description Regions of ten visits or more (exact from 1 on the whole site
                 *     with no filter). Elsewhere the regions under ten visits are
                 *     grouped in one last row, `region: "(other)"` and
                 *     `country: "(other)"`, counted as `countries`.
                 */
                regions: {
                    country: string;
                    region: string;
                    sessions: number | null;
                }[];
            };
            content: {
                movers: {
                    top_gainers: components["schemas"]["UserApiMoverItem"][];
                    top_losers: components["schemas"]["UserApiMoverItem"][];
                };
                top_pages: {
                    page_title?: string | null;
                    pageviews: number | null;
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
                    pageviews: number | null;
                    sessions: number | null;
                    visitors: number | null;
                }[];
                totals: {
                    avg_page_eng_time_ms: number | null;
                    avg_pages_per_session: number | null;
                    avg_session_eng_time_ms: number | null;
                    bounce_rate: number | null;
                    engagement_rate: number | null;
                    pageviews: number | null;
                    sessions: number | null;
                    visitors: number | null;
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
            /**
             * @description IANA time zone of the site, present when it is not UTC (absent:
             *     UTC). The requested dates, the daily `date` values and the hourly
             *     buckets follow it; `start` and `end` are the matching instants in
             *     UTC.
             */
            timezone?: string;
        };
        /**
         * @description Type of referring site, read from the referring domain alone through
         *     a fixed table. It never separates paid from organic.
         * @enum {string}
         */
        ReferrerType: "search" | "social" | "messaging" | "ai_assistant" | "other";
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
            timezone: string;
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
            /** @description On the whole site, with no filter and no client space, these counts are exact from 1: the totals and the per-day series (visitors, visits, page views, events, and the `period_total` and points of a `day` series), the breakdowns by country, region, device, system, browser, language and screen size, the pages and entry pages, the named sources and the types of referring site, and the goals with their conversions. The cities (a list of those with at least ten visits), the raw referring domains, the `hour` series, every filtered or crossed report and the Campagnes sections publish counts exact from 10; a count of 1..9 is `null`: render it as less than 10, never as a number. 0 is a measured empty count. A filtered report keeps the complement rule. Totals are computed on exact values, then published by the same rule; never add up displayed values. A share follows its count: it is `null` when the count is. A change (`delta`, `delta_pct`) is published only when both counts are 0 or at least 10, and `delta_pct` is a ratio (0.56 is +56%). Rates are published to the percent; 0.005 and 0.995 represent the open tails below 1% and above 99%. Rates, means, durations and percentiles are null under 10 contributors. Last conversion dates have day precision. Usage metering, billing, limits and diagnostics remain exact. This policy reduces detail; it is not a guarantee of anonymity. */
            reportingPrecision?: {
                /** @enum {integer} */
                minimumCount: 10;
                /** @enum {number} */
                rateStep: 0.01;
                /** @enum {string} */
                version: "exact-masked-counts-v1";
            };
        };
        TenantConflictErrorBody: {
            /** @enum {string} */
            code: "TENANT_SLUG_CONFLICT" | "TENANT_CONFLICT";
            details?: {
                [key: string]: unknown;
            } | null;
            message: string;
            request_id: string;
        };
        TenantConflictErrorResponse: {
            error: components["schemas"]["TenantConflictErrorBody"];
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
        TenantsWriteRequest: {
            site_id: string;
            tenants: components["schemas"]["TenantWriteItem"][];
        };
        TenantsWriteResponse: {
            created: number;
            items: components["schemas"]["TenantWriteResultItem"][];
            unchanged: number;
            updated: number;
        };
        TenantWriteItem: {
            /**
             * @description Omitted keeps the stored status (`ACTIVE` for a new tenant).
             *     `INACTIVE` is the only way to deactivate a tenant.
             * @enum {string}
             */
            status?: "ACTIVE" | "INACTIVE";
            /** @description Stable tenant identifier chosen by the platform. */
            tenant_id: string;
            /** @description Display name. */
            tenant_name: string;
            /** @description Routing slug, unique within the site. */
            tenant_slug: string;
        };
        TenantWriteResultItem: components["schemas"]["TenantItem"] & {
            /** @enum {string} */
            result: "created" | "updated" | "unchanged";
        };
        TimeseriesPoint: {
            ts: string;
            value: number | null;
        };
        TimeseriesResponse: {
            availability: components["schemas"]["ReportAvailability"];
            meta: components["schemas"]["MeteredMeta"];
            period_total: number | null;
            points: components["schemas"]["TimeseriesPoint"][];
        };
        TopReferrer: {
            domain: string;
            favicon_url?: string | null;
            sessions: number | null;
        };
        TopReferrerSource: {
            favicon_url?: string | null;
            sessions: number | null;
            source: string;
            type: components["schemas"]["ReferrerType"];
        };
        TopSource: {
            sessions: number | null;
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
                sessions: number | null;
            }[];
            /** @description Campagnes option of the site. When `false`, the Campagnes sections are empty. */
            campaigns_enabled: boolean;
            /** @description Visits with Campagnes consent in the period, published like the other counts. `0` when the option is off. */
            consented_sessions: number | null;
            /**
             * @description Visits with consent by campaign (Campagnes option, section
             *     `acquisition_attribution`); empty without the option.
             */
            top_campaigns: {
                campaign: string;
                sessions: number | null;
            }[];
            /** @description Landing pages of the visits. */
            top_landing_pages: {
                page_title?: string | null;
                path_canon: string | null;
                sessions: number | null;
            }[];
            /**
             * @description Visits with consent by medium (Campagnes option, section
             *     `acquisition_attribution`); empty without the option.
             */
            top_mediums: {
                medium: string;
                sessions: number | null;
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
                pageviews: number | null;
                sessions: number | null;
            };
        };
        UserApiAcquisitionDetailsCurrent: {
            /** @description Campagnes option of the site. When `false`, the Campagnes sections are empty. */
            campaigns_enabled: boolean;
            /** @description Visits with Campagnes consent in the period, published like the other counts. `0` when the option is off. */
            consented_sessions: number | null;
            dimensions: {
                /** @description Computed on visits with consent (Campagnes option); empty without the option. */
                campaigns: components["schemas"]["AcquisitionDimensionItem"][];
                /** @description Computed on visits with consent (Campagnes option); empty without the option. */
                contents: components["schemas"]["AcquisitionDimensionItem"][];
                /** @description Computed on visits with consent (Campagnes option); empty without the option. */
                mediums: components["schemas"]["AcquisitionDimensionItem"][];
                /** @description Named sources, all visits: the domains of one service under its name, counted before the ten-visit threshold. */
                referrer_sources: components["schemas"]["AcquisitionReferrerSourceItem"][];
                /** @description Types of referring site, all visits: search engine, social network, messaging, AI assistant, other site. */
                referrer_types: components["schemas"]["AcquisitionReferrerTypeItem"][];
                /** @description Referring domains, all visits. */
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
                sessions: number | null;
            }[];
            /**
             * @description Visits with consent by channel (Campagnes option, section
             *     `acquisition_attribution`); empty without the option.
             */
            channels: components["schemas"]["AcquisitionSummaryChannelItem"][];
            /** @description Visits with Campagnes consent in the period, published like the other counts. `0` when the option is off. */
            consented_sessions: number | null;
            coverage: components["schemas"]["AcquisitionCoverage"];
            goals_configured: boolean;
            mix_timeseries: {
                /** Format: date */
                date: string;
                sessions: number | null;
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
            current_pageviews: number | null;
            delta: number | null;
            delta_pct: number | null;
            page_title?: string | null;
            path_canon: string | null;
            previous_pageviews: number | null;
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
        /** @description Request parameters are invalid, or the result is below the minimum reporting cohort (`REPORTING_THRESHOLD`, no `details`). */
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
         *     statistics of a tenant are those of the page's tracked space. The
         *     response also includes `tenant_slug` and `tenant_name` as display labels.
         */
        BreakdownDimension: "device" | "referrer" | "page" | "browser" | "os" | "country" | "tenant";
        /** @description Number of rows returned by breakdown endpoint. */
        BreakdownLimit: number;
        /** @description Compare current range against the previous equivalent period. */
        CompareParam: "prev_period";
        /**
         * @description Content response depth. `summary` returns totals and one global
         *     pageview point per day of the site's time zone; `limit` has no effect. `full` returns the
         *     detailed Content report.
         *     When omitted, ranges up to 90 days use `full`; ranges from 91 through
         *     365 days use `summary`.
         */
        ContentInclude: "summary" | "full";
        /**
         * @description JSON object serialized as string, example:
         *     `{"device":"mobile","referrer":"google.com"}`.
         */
        Filters: string;
        /** @description Inclusive start date (YYYY-MM-DD), a day of the site's time zone (a UTC date for usage history). Pass explicit from and to dates to bound the requested period. */
        FromDate: string;
        /** @description Granularity (`day` or `hour`, on every plan with API access). */
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
        /** @description Inclusive end date (`YYYY-MM-DD`), a day of the site's time zone (a UTC date for usage history). Defaults to today. */
        ToDate: string;
        /** @description Traffic segment to include. */
        TrafficParam: "humans" | "humans_including_ai" | "bots_only" | "ai_bots_only" | "all";
    };
    requestBodies: never;
    headers: {
        /**
         * @description Present with the value `near_hard_cap` once the workspace has used 80 %
         *     of its monthly API hard cap. Plan for the ceiling before requests are
         *     refused with `HARD_CAP_REACHED`. Never sent to a token restricted to
         *     tenants.
         */
        XPomeloUsageWarning: "near_hard_cap";
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
