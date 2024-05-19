import { getDistrictList, getDistrictSchoolDetail } from "~/segments/districts/services"
import {getSchoolDetails} from "~/segments/schools/services";

interface DistrictState {
    distictsList: Hit[],
    total_page: number
    schoolDistrictDetails: DistrictDocument | null
}

export const useDisrictsStore = defineStore('districtStore', {
    state: () => ({
        distictsList: [],
        total_page: 0,
        schoolDistrictDetails: null
    } as DistrictState),
    actions: {
        async fetchDistricts(query:any) {
            const { hits, found} = await getDistrictList(query)
            // const response = await useGet(`/collections/districts/documents/search?q=*&per_page=10`)
            this.$state.distictsList = hits
            this.$state.total_page = Math.ceil(found / 12)
        },
        async fetchDistrictSchoolDetails(slug :string) {
            this.$state.schoolDistrictDetails = await getDistrictSchoolDetail(slug);
        },
    }
})
