import { getCollegesList, getCollegeDetails } from "~/segments/colleges/services"

interface CollegesState {
    collegesList: Hit[]
    total_page: number
    collegesFound: number
    collegeDetails: CollegeDocument | null
}

export const useCollegesStore = defineStore('collegesStore', {
    state: () => ({
        collegesList: [],
        total_page: 0,
        collegesFound: 0,
        collegeDetails: null
    } as CollegesState),
    actions: {
        async fetchColleges(query:any) {
            const { hits, found} = await getCollegesList(query)
            this.$state.collegesList = hits;
            this.$state.total_page = Math.ceil(found / 24);
            this.$state.collegesFound = found;
        },
        async fetchCollegeDetails(slug :string) {
            this.$state.collegeDetails = await getCollegeDetails(slug);
        },
    }
})
