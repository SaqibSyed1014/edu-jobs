import {
    getBlogsList
} from "~/stores/services/blogs.services";

interface BlogState {
    blogs: Blog[]
}

export const useBlogStore = defineStore('blogStore', {
    state: () => ({
        blogs: []
    } as BlogState),
    actions: {
        async fetchBlogs() {
            const { data, meta } = await getBlogsList()
            this.$state.blogs = data
        }
    }
})
