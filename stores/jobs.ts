import {
    getJobsList
} from "~/stores/services/jobs.services";

interface JobsState {
    jobsList: Job[]
    itemsFound: number
    totalPages: number
    jobDetails: Job | null
}

export const useJobStore = defineStore('jobStore', {
    state: () => ({
        jobsList: [],
        itemsFound: 0,
        totalPages: 0,
        jobDetails: null,
    } as JobsState),
    actions: {
        async fetchJobs(query :any) {
            const { hits, found} = await getJobsList(query)
            this.$state.jobsList = hits.map((hit :JobHit) => hit.document)
            this.$state.itemsFound = found
            this.$state.totalPages = Math.ceil(found / 12)
            console.log('resp ', hits, found, this.$state.jobsList)
        },
    },
    getters: {
        jobListings: (state) => state.jobsList.map(job => ({
            ...job,
            date_posting_expires: job.date_posting_expires ? job?.date_posting_expires.slice(0, job?.date_posting_expires.indexOf('00:00:00')) : 'N/A',
            date_posted: job.date_posted.slice(0, job.date_posted.indexOf('00:00:00'))
        }))
    }
})