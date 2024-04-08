import { getDistrictList } from "~/stores/services/districts.services"

interface DistrictState {
    distictsList: Hit[],
    total_page: number
}

export const useDisrictsStore = defineStore('districtStore', {
    state: () => ({
        distictsList: [],
        total_page: 0
    } as DistrictState),
    actions: {
        async fetchDistricts(query:any) {
            const { hits, out_of} = await getDistrictList(query)
            // const response = await useGet(`/collections/districts/documents/search?q=*&per_page=10`)
            this.distictsList = hits
            this.total_page = out_of
        },
    }
})
