interface Blog {
    id: number
    title: string
    author: AuthorDetail
    category: Category
    post_content: string
    post_excerpt: string
    post_date: string
    publishedAt: Date
    updatedAt: Date
    createdAt: Date
    slug: string
    reading_time: string
    post_photo: {
        id: string
        url: string
    }
}

interface AuthorDetail {
    id: number
    name: string
    avatar: string
}

interface Category {
    id: number
    category_name: string
}
