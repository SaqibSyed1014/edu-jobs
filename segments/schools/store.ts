import { getSchoolsList } from "~/segments/schools/services"

interface SchoolState {
    schoolsList: School[],
    total_page: number
}

export const useSchoolsStore = defineStore('schoolsStore', {
    state: () => ({
        schoolsList: [],
        total_page: 0
    } as SchoolState),
    actions: {
        async fetchCharterSchools(query:any) {
            const { hits, found} = await getSchoolsList(query)
            this.$state.schoolsList = hits.map((hit :SchoolHit) => hit.document)
            this.$state.total_page = Math.ceil(found / 12)
        },
    }
})
