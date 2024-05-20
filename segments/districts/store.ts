import {
    getDistrictList,
    getDistrictSchoolDetail,
    getDistrictSchoolJobs
} from "~/segments/districts/services"

interface DistrictState {
    distictsList: DistrictHit[],
    total_page: number
    schoolDistrictDetails: DistrictDocument | null
    schoolDistrictJobs: Job[]
}

export const useDisrictsStore = defineStore('districtStore', {
    state: () => ({
        distictsList: [],
        total_page: 0,
        schoolDistrictDetails: null,
        schoolDistrictJobs: []
    } as DistrictState),
    actions: {
        async fetchDistricts(query:any) {
            if (query.filter_by) query.filter_by = 'status:=\'active\'&&' + query.filter_by
            else query.filter_by = 'status:=\'active\''
            const { hits, found} = await getDistrictList(query)
            // const response = await useGet(`/collections/districts/documents/search?q=*&per_page=10`)
            this.$state.distictsList = hits
            this.$state.total_page = Math.ceil(found / 12)
        },
        async fetchDistrictSchoolDetails(slug :string) {
            this.$state.schoolDistrictDetails = await getDistrictSchoolDetail(slug);
            const { hits } = await getDistrictSchoolJobs(slug);
            this.$state.schoolDistrictJobs = hits.map((hit :JobHit) => hit.document);
        },
    }
})
