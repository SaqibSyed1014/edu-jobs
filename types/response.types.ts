interface BlogResponseType {
    data: Blog[]
    meta: {
        pagination: Pagination
    }
}

interface DisrictResponseType {
    facet_counts: any[];
    found: number;
    hits: Hit[];
    out_of: number;
    page: number;
    request_params: RequestParams;
    search_cutoff: boolean;
    search_time_ms: number;
}

interface Pagination {
    page: number
    pageCount: number
    pageSize: number
    total: number
}
