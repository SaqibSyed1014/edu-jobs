import {
    getJobsList
} from "~/stores/services/jobs.services";

interface JobsState {
    jobsList: Job[]
    total_page: number
    jobDetails: Blog | null
}

export const useJobStore = defineStore('jobStore', {
    state: () => ({
        jobsList: [],
        total_page: 0,
        jobDetails: null,
    } as JobsState),
    actions: {
        async fetchJobs(query :any) {
            const { hits, out_of} = await getJobsList(query)
            this.$state.jobsList = hits.map((hit :JobHit) => hit.document)
            this.$state.total_page = out_of
            console.log('resp ', hits, out_of, this.$state.jobsList)
        },
    }
})
