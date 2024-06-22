import {
    getDistrictList,
    getDistrictSchoolDetail,
    getDistrictSchoolJobs
} from "~/segments/districts/services"

interface DistrictState {
    distictsList: DistrictHit[],
    total_page: number
    openedJobs: number
    totalPagesInOpenedJobs: number
    schoolDistrictDetails: DistrictDocument | null
    schoolDistrictJobs: Job[]
}

export const useDisrictsStore = defineStore('districtStore', {
    state: () => ({
        distictsList: [],
        total_page: 0,
        openedJobs: 0,
        totalPagesInOpenedJobs: 0,
        schoolDistrictDetails: null,
        schoolDistrictJobs: []
    } as DistrictState),
    actions: {
        async fetchDistricts(query:any) {
            const { hits, found} = await getDistrictList(query)
            this.$state.distictsList = hits;
            this.$state.total_page = Math.ceil(found / 24);
        },
        async fetchDistrictSchoolDetails(slug :string) {
            this.$state.schoolDistrictDetails = await getDistrictSchoolDetail(slug);
        },
        async fetchSchoolDistrictJobs(query :any) {
            if (query.q.length) query.query_by = 'job_title';
            else delete query.query_by;
            const { hits, found } = await getDistrictSchoolJobs(query);
            this.$state.schoolDistrictJobs = hits.map((hit :JobHit) => hit.document);
            this.$state.openedJobs = found;
            this.$state.totalPagesInOpenedJobs = Math.ceil(found / 10);
        }
    }
})
