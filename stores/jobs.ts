import {
    getJobsList
} from "~/stores/services/jobs.services";

interface JobsState {
    jobs: Blog[]
    jobDetails: Blog | null
}

export const useJobStore = defineStore('jobStore', {
    state: () => ({
        jobs: [],
        jobDetails: null
    } as JobsState),
    actions: {
        async fetchJobs(query :any) {
            const resp = await getJobsList(query)
            console.log('resp ', resp)
        },
    }
})
