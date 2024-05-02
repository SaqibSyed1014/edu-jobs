import {getJobsSummaryByCities} from "~/segments/home/services";

interface HomeSectionsData {
    jobsByCities: JobsInCities[]
}

export const useHomeStore = defineStore('homeStore', {
    state: () => ({
        jobsByCities: []
    } as HomeSectionsData),
    actions: {
        async fetchJobsSummaryByCities() {
            this.$state.jobsByCities = await getJobsSummaryByCities();
        }
    },
    getters: {
        jobsInEachCity: (state) :JobsInCities[] => {
            return state.jobsByCities?.sort((a, b) => a.priority_rank - b.priority_rank) || []
        }
    }
})
