import { getCollegesList } from "~/segments/colleges/services"

interface CollegesState {
    collegesList: Hit[],
    total_page: number
}

export const useCollegesStore = defineStore('collegesStore', {
    state: () => ({
        collegesList: [],
        total_page: 0
    } as CollegesState),
    actions: {
        async fetchColleges(query:any) {
            const { hits, found} = await getCollegesList(query)
            this.$state.collegesList = hits
            this.$state.total_page = Math.ceil(found / 12) 
        },
    }
})
