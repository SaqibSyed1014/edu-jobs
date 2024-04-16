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
            const { hits, found} = await getDistrictList(query)
            // const response = await useGet(`/collections/districts/documents/search?q=*&per_page=10`)
            this.$state.distictsList = hits
            this.$state.total_page = Math.ceil(found / 12) 
        },
    }
})
