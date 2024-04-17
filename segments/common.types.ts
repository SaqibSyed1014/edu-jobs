export interface QueryParams {
    [key: string]: string | string[] | number | null
}

export interface PaginationInfo {
    currentPage: number
    itemsPerPage: any
    totalPages: number
}

export interface TypesenseQueryParam {
    q: string,
    per_page: number,
    page: number, query_by ?:string,
    filter_by?: string | null
}
