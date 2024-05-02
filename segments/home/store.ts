import {
    getJobsSummaryByCities
} from "~/segments/home/services";

interface HomeSectionsData {
    jobsByCities: JobsInCities[]
}

export const useHomeStore = defineStore('homeStore', {
    state: () => ({
        jobsByCities: []
    } as HomeSectionsData),
    actions: {
        async fetchJobsSummaryByCities() {
            const resp = await getJobsSummaryByCities()
            console.log('resp ', resp)
            this.$state.jobsByCities = resp;
        }
    },
    getters: {
        jobsInEachCity: (state) :JobsInCities[] => {
            return state.jobsByCities
        }
    }
})
