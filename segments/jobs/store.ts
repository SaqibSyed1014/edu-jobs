import {getJobDetails, getJobsList} from "~/segments/jobs/services";
import type {Coordinates, TypesenseQueryParam} from "~/segments/common.types";

interface JobsState {
    jobsList: Job[]
    itemsFound: number
    totalPages: number
    singleJob: ExtendedJobDetails
    coordinates: Coordinates
}

export const useJobStore = defineStore('jobStore', {
    state: () => ({
        jobsList: [],
        itemsFound: 0,
        totalPages: 0,
        singleJob: {
            job_details: null,
            job_faqs: [],
            job_benefits: []
        },
        coordinates: {
            lat: 0,
            lng: 0
        }
    } as JobsState),
    actions: {
        async fetchJobs(query :TypesenseQueryParam) {
            const { hits, found } = await getJobsList(query);
            this.$state.jobsList = hits.map((hit :JobHit) => hit.document);
            this.$state.itemsFound = found;
            this.$state.totalPages = Math.ceil(found / 24);
        },
        async fetchJobDetails(slug :string) {
            this.$state.singleJob = await getJobDetails(slug);
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
        jobDetails: (state) :JobDetails | null => {
            const jobDetail = state.singleJob?.job_details
            if (jobDetail)
                return {
                    ...jobDetail,
                    date_posting_expires:jobDetail.date_posting_expires ? jobDetail.date_posting_expires.slice(0, jobDetail.date_posting_expires.indexOf('00:00:00')) : 'N/A',
                    date_posted: jobDetail.date_posted.slice(0, jobDetail.date_posted.indexOf('00:00:00'))
            }
            else return null
        },
        jobFaqs: (state) :JobFaq[] => {
            const faqs = state.singleJob.job_faqs;
            return faqs.length ? faqs : [];
        },
        jobBenefits: (state) :JobBenefits[] => {
            const benefits = state.singleJob.job_benefits;
            return benefits.length ? benefits.sort((a, b) => a.display_order - b.display_order) : [];
        }
    }
})
