import { getSchoolsList, getSchoolDetails, getSchoolJobs } from "~/segments/schools/services"

interface SchoolState {
    schoolsList: School[]
    total_page: number
    singleSchoolDetails: School | null
    schoolJobs: Job[]
}

export const useSchoolsStore = defineStore('schoolsStore', {
    state: () => ({
        schoolsList: [],
        total_page: 0,
        singleSchoolDetails: null,
        schoolJobs: []
    } as SchoolState),
    actions: {
        async fetchCharterSchools(query:any) {
            const { hits, found} = await getSchoolsList(query)
            this.$state.schoolsList = hits.map((hit :SchoolHit) => hit.document)
            this.$state.total_page = Math.ceil(found / 12)
        },
        async fetchCharterSchoolDetails(slug :string) {
            this.$state.singleSchoolDetails = await getSchoolDetails(slug);
            const { hits } = await getSchoolJobs(slug);
            this.$state.schoolJobs = hits.map((hit :JobHit) => hit.document);
        },
    },
    getters: {
        charterSchoolDetails: (state) :School => {
            return state.singleSchoolDetails
        }
    }
})
