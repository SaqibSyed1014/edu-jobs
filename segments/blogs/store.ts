import {
    getBlogsList,
    getBlogDetails
} from "~/segments/blogs/services";

interface BlogState {
    blogs: Blog[]
    blogDetails: Blog | null
    pagination: {
        page: number
        pageCount: number
        pageSize: number
        total: number
    }
}

export const useBlogStore = defineStore('blogStore', {
    state: () => ({
        blogs: [],
        blogDetails: null,
        pagination: {
            page: 0,
            pageCount: 0,
            pageSize: 0,
            total: 0
        }
    } as BlogState),
    actions: {
        async fetchBlogs() {
            const { data, meta } = await getBlogsList();
            this.$state.blogs = data;
            this.$state.pagination = meta.pagination
        },
        async fetchBlogDetails(blogSlug :string) {
            return await getBlogDetails(blogSlug)
                .then(({ data }) => {
                    this.$state.blogDetails = data[0];
                })
        }
    }
})
