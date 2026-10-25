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
         * @description Mixed route family. The strict-safe slice exposes channels, host-only
         *     referrers, and landing pages. Attribution slices such as sources,
         *     mediums, and campaigns remain profile-gated. Read
         *     `availability.readModel` for the route split, then inspect
         *     `availability.sections` as `acquisition_attribution`.
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
                /**
                 * @description OK. Mixed route: the strict-safe acquisition slice succeeded.
                 *     `availability.readModel` shows what belongs to the strict-safe
                 *     baseline, while `availability.sections` reports whether
                 *     `acquisition_attribution` remains locked or only partially
                 *     compatible for the requested period.
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
         * Simple action report with advanced families gated by profile
         * @description Mixed route family. The strict-safe slice covers bounded simple actions
         *     (`ui.click`, `outbound.click`, `file.download`, `form.submit`). Richer
         *     families such as goals, errors, and custom events remain profile-gated
         *     and are marked through `availability.sections` as `actions_advanced`.
         *     Use `availability.readModel` to distinguish the stable baseline from
         *     the enriched families unlocked by `Extended`.
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
                 * @description OK. Mixed route: the strict-safe bounded action slice succeeded.
                 *     `availability.readModel` shows what belongs to the strict-safe
                 *     baseline, while `availability.sections` reports whether
                 *     `actions_advanced` remains locked or only partially compatible
                 *     for the requested period.
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
         * @description Mixed route family. In `Strict`, the response still includes the
         *     strict-safe overview baseline plus an acquisition-lite preview built
         *     from channels, host-only referrers, and landing pages. Read
         *     `availability.readModel` for the baseline split, then inspect
         *     `availability.sections` for enriched slices that remain locked.
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
                /**
                 * @description OK. Mixed route: the strict-safe overview slice succeeded. Inspect
                 *     `availability.sections` for enriched or geo-detail sections that
                 *     remain locked or only partially compatible.
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
        AcquisitionReportResponse: components["schemas"]["UserApiAcquisitionEnvelope"] & {
            meta: components["schemas"]["MeteredMeta"];
        };
        ActionsCurrent: {
            /**
             * @description Exact action rows for the active envelope. On Strict sites, this
             *     list is limited to bounded simple actions and stays readable in
             *     HTTP `200`; advanced families remain section-gated.
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
                top_page?: string | null;
                /** @enum {string|null} */
                top_source?: "Direct" | "Search" | "Referral" | "Social" | "Email" | "Paid" | "Other" | null;
            }[];
            /** @enum {string|null} */
            active_family: "goals" | "forms" | "outbound" | "downloads" | "errors" | "custom" | "instrumentation" | null;
            /**
             * @description Shared breakdown context for the active action envelope. Advanced
             *     action families can remain unavailable even when the route itself
             *     succeeds; inspect `availability.sections`.
             */
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
                sources: {
                    /** @enum {string} */
                    channel: "Direct" | "Search" | "Referral" | "Social" | "Email" | "Paid" | "Other";
                    /** @enum {string} */
                    scope: "family" | "action";
                    sessions: number;
                }[];
            };
            /**
             * @description Family summary for the current action envelope. On Strict sites,
             *     simple bounded families remain available; richer families are
             *     exposed through `availability.sections` as `actions_advanced`.
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
                bounce_rate: number;
                entries: number;
                page_title?: string | null;
                path_canon: string | null;
            }[];
            exits?: {
                exit_rate: number;
                exits: number;
                page_title?: string | null;
                path_canon: string | null;
            }[];
            /** @enum {string} */
            include: "full";
            pages: {
                avg_page_eng_time_ms: number;
                avg_scroll_depth?: number | null;
                bounces: number;
                entries: number;
                exit_rate: number;
                exits: number;
                page_bounce_rate: number;
                page_title?: string | null;
                pageviews: number;
                path_canon: string | null;
                performance?: {
                    p75_cls: number | null;
                    p75_fcp?: number | null;
                    p75_inp: number | null;
                    p75_lcp: number | null;
                    p75_ttfb: number | null;
                    samples: number;
                } | null;
                unique_pageviews: number;
            }[];
            timeseries: {
                /** Format: date */
                date: string;
                pageviews: number;
                path_canon: string;
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
             *     one point per requested day, including zero-valued empty days, and
             *     its pageview sum equals `totals.pageviews`.
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
            avg_page_eng_time_ms: number;
            bounce_rate: number;
            entries: number;
            exit_rate: number;
            pageviews: number;
            unique_pageviews: number;
        };
        DerivedProductCapability: {
            /** @enum {string} */
            data_envelope: "strict" | "extended" | "mixed";
            /** @enum {string} */
            level: "none" | "limited" | "standard" | "guardrailed" | "advanced" | "custom";
            /** @enum {string} */
            maturity: "implemented" | "partially_implemented" | "not_explicitly_split" | "not_applicable";
            notes: string[];
        };
        EffectiveProductCapabilities: {
            acquisition: components["schemas"]["DerivedProductCapability"];
            advanced_actions: components["schemas"]["DerivedProductCapability"];
            api: components["schemas"]["DerivedProductCapability"];
            collection: components["schemas"]["DerivedProductCapability"];
            dashboard_surfaces: string[];
            exports: components["schemas"]["DerivedProductCapability"];
            multi_tenant: components["schemas"]["DerivedProductCapability"];
            reports: components["schemas"]["DerivedProductCapability"];
        };
        ErrorBody: {
            /** @enum {string} */
            code: "UNAUTHORIZED" | "FORBIDDEN" | "INVALID_METHOD" | "INVALID_PARAMS" | "RETENTION_EXCEEDED" | "RATE_LIMITED" | "HARD_CAP_REACHED" | "REPORT_LOCKED_BY_PROFILE" | "REPORT_NOT_AVAILABLE_FOR_REQUESTED_PERIOD" | "REPORT_RESPONSE_TOO_LARGE" | "INTERNAL_ERROR" | "NOT_FOUND";
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
        GoalsConversionsCurrent: {
            goals: {
                conversions: number;
                goal_id: string;
                last_seen_at: string | null;
                total_sessions: number;
                unique_sessions: number;
            }[];
        };
        GoalsConversionsEnvelope: {
            availability: components["schemas"]["ReportAvailability"];
            compare: components["schemas"]["GoalsConversionsCurrent"] | null;
            current: components["schemas"]["GoalsConversionsCurrent"];
            range: components["schemas"]["Range"];
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
                by_channel: components["schemas"]["AcquisitionChannelItem"][];
                top_landing_pages: {
                    /** @enum {string} */
                    channel: "Direct" | "Search" | "Referral" | "Social" | "Email" | "Paid" | "Other";
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
                /**
                 * @description Mixed overview audience slice. When unavailable, inspect
                 *     `availability.sections` for `overview_cities`.
                 */
                cities: {
                    city: string;
                    country: string;
                    sessions: number;
                }[];
                countries: {
                    country: string;
                    sessions: number;
                }[];
                devices: {
                    device_type: string;
                    sessions: number;
                }[];
                os: {
                    os_family: string;
                    sessions: number;
                }[];
                /**
                 * @description Mixed overview audience slice. When unavailable, inspect
                 *     `availability.sections` for `overview_regions`.
                 */
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
                    avg_page_eng_time_ms: number;
                    avg_session_eng_time_ms: number;
                    bounce_rate: number;
                    /** Format: date */
                    date: string;
                    engagement_rate: number;
                    pageviews: number;
                    sessions: number;
                    visitors: number;
                }[];
                totals: {
                    avg_page_eng_time_ms: number;
                    avg_pages_per_session: number;
                    avg_session_eng_time_ms: number;
                    bounce_rate: number;
                    engagement_rate: number;
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
            /** @enum {string} */
            breakdowns_high_cardinality_level: "none" | "limited" | "standard" | "guardrailed" | "advanced" | "custom";
            /** @enum {string} */
            breakdowns_standard_level: "none" | "limited" | "standard" | "guardrailed" | "advanced" | "custom";
            /** @enum {string} */
            essential_level: "none" | "limited" | "standard" | "guardrailed" | "advanced" | "custom";
            hourly_enabled: boolean;
            /** @enum {string} */
            hourly_level: "none" | "limited" | "standard" | "guardrailed" | "advanced" | "custom";
            /** @enum {string} */
            standard_level: "none" | "limited" | "standard" | "guardrailed" | "advanced" | "custom";
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
         * @description Availability contract for profile-aware reads.
         *
         *     For `mixed` routes, HTTP `200` means the strict-safe base slice was
         *     returned successfully. `readModel` tells you which slices belong to
         *     the strict-safe baseline and which belong to `Extended`.
         *     Section-level locks or partial compatibility for enriched sub-slices
         *     are reported in `sections`.
         */
        ReportAvailability: {
            classification: components["schemas"]["ReportAvailabilityClassification"];
            /** Format: date-time */
            collectionProfileEffectiveAt: string | null;
            compare: components["schemas"]["ReportPeriodAvailability"] | null;
            /**
             * @description Route-level availability for the current range. On `mixed` routes,
             *     `status=available` means the strict-safe base slice is readable;
             *     inspect `sections` for enriched sub-slices that remain locked or
             *     partial.
             */
            current: components["schemas"]["ReportPeriodAvailability"];
            /** @enum {string} */
            currentProfile: "strict" | "extended";
            readModel?: components["schemas"]["ReportAvailabilityReadModel"] | null;
            route: components["schemas"]["ReportAvailabilityRouteId"];
            /**
             * @description Section-level availability for mixed routes. Each entry describes
             *     an enriched sub-slice that may remain locked or partially
             *     compatible while the enclosing route still returns HTTP `200`.
             */
            sections: components["schemas"]["ReportSectionAvailability"][];
        };
        /** @enum {string} */
        ReportAvailabilityClassification: "strict_safe" | "extended_only" | "mixed";
        /**
         * @description Explicit read-model for mixed routes. `strictSafe` lists the baseline
         *     slices that remain available in `Strict`; `extended` lists the
         *     enriched slices unlocked by `Extended`.
         */
        ReportAvailabilityReadModel: {
            extended: components["schemas"]["ReportAvailabilityReadModelSliceId"][];
            strictSafe: components["schemas"]["ReportAvailabilityReadModelSliceId"][];
        };
        /** @description Opaque identifier for a data slice within an availability result. */
        ReportAvailabilityReadModelSliceId: string;
        /** @enum {string|null} */
        ReportAvailabilityReason: "strict_safe_route" | "extended_data_required" | "requested_period_has_no_extended_data" | "requested_period_crosses_profile_change" | "outside_source_coverage" | "section_not_collected_in_runtime" | null;
        /** @description Opaque identifier for the route associated with this availability result. */
        ReportAvailabilityRouteId: string;
        /** @description Opaque identifier for a section within an availability result. */
        ReportAvailabilitySectionId: string;
        /** @enum {string} */
        ReportAvailabilityStatus: "available" | "locked_by_profile" | "partially_available_after_effective_at" | "partially_available_outside_source_coverage" | "not_available_for_requested_period";
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
         * @description Section-level availability for mixed routes. A mixed route can return
         *     HTTP `200` while one or more enriched sections remain locked or only
         *     partially compatible for the requested period.
         */
        ReportSectionAvailability: {
            classification: components["schemas"]["ReportAvailabilityClassification"];
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
            capabilities: components["schemas"]["EffectiveProductCapabilities"];
            /** @enum {string} */
            collection_profile: "strict" | "extended";
            /**
             * Format: date-time
             * @description Timestamp from which the current site profile applies to future collection. This is prospective only and does not backfill older events.
             */
            collection_profile_effective_at: string | null;
            dashboard: components["schemas"]["SiteProductDashboard"];
            exports: components["schemas"]["ProductExports"];
            product_retention: components["schemas"]["ProductRetention"];
            /** @enum {string} */
            runtime_plan_id: "free" | "starter" | "pro";
            technical_retention: components["schemas"]["TechnicalRetention"];
        };
        SiteProductDashboard: components["schemas"]["ProductDashboard"] & {
            enabled_surfaces: string[];
        };
        SitesResponse: {
            items: components["schemas"]["SiteItem"][];
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
            dataEnvelope: "strict" | "extended" | "mixed";
            /** @enum {string} */
            level: "none" | "limited" | "standard" | "guardrailed" | "advanced" | "custom";
            notes?: string[];
        };
        /** @description Additive launch-readiness metadata for reports and metrics. */
        SurfaceMeta: {
            compareWindow: components["schemas"]["SurfaceCompareWindow"];
            /** @enum {string} */
            dataEnvelope: "strict" | "extended" | "mixed";
            dataFreshness: components["schemas"]["SurfaceDataFreshness"];
            exportCapability: components["schemas"]["SurfaceExportCapability"];
            /** @enum {string} */
            mode: "strict" | "extended";
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
            /** @enum {string} */
            channel?: "Direct" | "Search" | "Referral" | "Social" | "Email" | "Paid" | "Other";
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
            by_channel: components["schemas"]["AcquisitionChannelItem"][];
            by_day: {
                /** @enum {string} */
                channel: "Direct" | "Search" | "Referral" | "Social" | "Email" | "Paid" | "Other";
                /** Format: date */
                date: string;
                sessions: number;
            }[];
            /**
             * @description Mixed acquisition section `acquisition_attribution`. May be empty
             *     when the route returns only the strict-safe slice in HTTP `200`.
             */
            top_campaigns: {
                campaign: string;
                sessions: number;
            }[];
            /** @description Strict-safe acquisition-lite slice available in both Strict and Extended. */
            top_landing_pages: {
                /** @enum {string} */
                channel: "Direct" | "Search" | "Referral" | "Social" | "Email" | "Paid" | "Other";
                page_title?: string | null;
                path_canon: string | null;
                sessions: number;
            }[];
            /**
             * @description Mixed acquisition section `acquisition_attribution`. May be empty
             *     when the route returns only the strict-safe slice in HTTP `200`.
             */
            top_mediums: {
                medium: string;
                sessions: number;
            }[];
            /** @description Strict-safe host-only referral slice available in both Strict and Extended. */
            top_referrers: components["schemas"]["TopReferrer"][];
            /**
             * @description Mixed acquisition section `acquisition_attribution`. May be empty
             *     when the route returns only the strict-safe slice in HTTP `200`.
             */
            top_sources: components["schemas"]["TopSource"][];
            totals: {
                avg_session_eng_time_ms: number;
                engagement_rate: number;
                pageviews: number;
                sessions: number;
            };
        };
        UserApiAcquisitionEnvelope: {
            availability: components["schemas"]["ReportAvailability"];
            compare: components["schemas"]["UserApiAcquisitionCurrent"] | null;
            current: components["schemas"]["UserApiAcquisitionCurrent"];
            range: components["schemas"]["Range"];
        };
        UserApiActionsEnvelope: {
            availability: components["schemas"]["ReportAvailability"];
            compare: components["schemas"]["ActionsCurrent"] | null;
            current: components["schemas"]["ActionsCurrent"];
            range: components["schemas"]["Range"];
        };
        UserApiContentFullEnvelope: {
            availability: components["schemas"]["ReportAvailability"];
            compare: components["schemas"]["ContentFullCurrent"] | null;
            current: components["schemas"]["ContentFullCurrent"];
            range: components["schemas"]["Range"];
        };
        UserApiContentSummaryEnvelope: {
            availability: components["schemas"]["ReportAvailability"];
            compare: components["schemas"]["ContentSummaryCurrent"] | null;
            current: components["schemas"]["ContentSummaryCurrent"];
            range: components["schemas"]["Range"];
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
        };
        WorkspaceProductConfiguration: {
            api: components["schemas"]["ProductApi"];
            capabilities: components["schemas"]["EffectiveProductCapabilities"];
            dashboard: components["schemas"]["ProductDashboard"];
            /** @enum {string} */
            default_collection_profile: "strict" | "extended";
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
         * @description The requested route family is not available for the current
         *     `collection_profile`, or the requested period does not contain the
         *     required Extended data envelope.
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
        /** @description Filter action reports by normalized action family. */
        ActionFamily: "goals" | "forms" | "outbound" | "downloads" | "errors" | "custom" | "instrumentation";
        /** @description Filter action reports by normalized action key. */
        ActionKey: string;
        /**
         * @description Grouping dimension for breakdown endpoint.
         *     When `dimension=tenant`, rows are grouped by stable `tenant_id`. The
         *     response also includes `tenant_slug` and `tenant_name` as display labels.
         */
        BreakdownDimension: "device" | "referrer" | "page" | "browser" | "os" | "tenant";
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
