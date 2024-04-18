import type {LocationQueryRaw} from "vue-router";

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

export interface JobQueryParams extends LocationQueryRaw{
    mode: string
    q: string
    page: number
    location?: string
}

export interface Coordinates {
    lng: number,
    lat: number
}

export interface JobSearchFilters{
    keyword: string
    coordinates: Coordinates
    location: string
}
