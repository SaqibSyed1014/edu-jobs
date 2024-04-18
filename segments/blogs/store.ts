import {
    getBlogsList,
    getBlogDetails
} from "~/segments/blogs/services";

interface BlogState {
    blogs: Blog[]
    blogDetails: Blog | null
}

export const useBlogStore = defineStore('blogStore', {
    state: () => ({
        blogs: [],
        blogDetails: null
    } as BlogState),
    actions: {
        async fetchBlogs() {
            const { data, meta } = await getBlogsList()
            this.$state.blogs = data
        },
        async fetchBlogDetails(blogSlug :string) {
            return await getBlogDetails(blogSlug)
                .then(({ data }) => {
                    this.$state.blogDetails = data[0]
                })
        }
    }
})
