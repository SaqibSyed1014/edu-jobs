interface Blog {
    id: number
    title: string
    author: AuthorDetail
    category: Category
    post_content: string
    post_date: string
    publishedAt: Date
    updatedAt: Date
    createdAt: Date
    slug: string
}

interface AuthorDetail {
    id: number
    name: string
}

interface Category {
    id: number
    category_name: string
}
