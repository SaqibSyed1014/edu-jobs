import {
    getJobsList,
    getSingleJob
} from "~/segments/jobs/services";
import type {Coordinates} from "~/segments/common.types";

interface JobsState {
    jobsList: Job[]
    itemsFound: number
    totalPages: number
    singleJob: Job | null
    coordinates: Coordinates | null
}

export const useJobStore = defineStore('jobStore', {
    state: () => ({
        jobsList: [],
        itemsFound: 0,
        totalPages: 0,
        singleJob: null,
        coordinates: null
    } as JobsState),
    actions: {
        async fetchJobs(query :any) {
            const { hits, found } = await getJobsList(query)
            this.$state.jobsList = hits.map((hit :JobHit) => hit.document)
            this.$state.itemsFound = found
            this.$state.totalPages = Math.ceil(found / 12)
        },
        async fetchSingleJob(slug :string) {
            const { hits }  = await getSingleJob(slug)
            this.$state.singleJob = hits[0].document
        },
        setCoordinates(coordinates :Coordinates) {
            this.$state.coordinates = coordinates
        }
    },
    getters: {
        jobListings: (state) :Job[] => state.jobsList.map(job => ({
            ...job,
            date_posting_expires: job.date_posting_expires ? job?.date_posting_expires.slice(0, job?.date_posting_expires.indexOf('00:00:00')) : 'N/A',
            date_posted: job.date_posted.slice(0, job.date_posted.indexOf('00:00:00'))
        })),
        jobDetails: (state) :Job | null => {
            if (state.singleJob)
                return {
                    ...state.singleJob,
                    date_posting_expires: state.singleJob.date_posting_expires ? state.singleJob?.date_posting_expires.slice(0, state.singleJob?.date_posting_expires.indexOf('00:00:00')) : 'N/A',
                    date_posted: state.singleJob.date_posted.slice(0, state.singleJob.date_posted.indexOf('00:00:00'))
            }
            else return null
        }
    }
})
