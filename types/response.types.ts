interface BlogResponseType {
    data: Blog[]
    meta: {
        pagination: Pagination
    }
}

interface Pagination {
    page: number
    pageCount: number
    pageSize: number
    total: number
}
