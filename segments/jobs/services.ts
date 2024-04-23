import { usePayloadUrl , convertQueryToString} from "~/segments/utils"


const getJobsList = (query: any) :Promise<JobResponseType> => {
    const { baseURL, typesenseApiKey } = usePayloadUrl()
    const apiHeaders = {
        'X-TYPESENSE-API-KEY': typesenseApiKey,
    }

    const queryString = convertQueryToString(query);
    return $fetch(`${baseURL}/collections/jobs/documents/search?${queryString}`, {
        method: 'get',
        headers: apiHeaders,
    })
}

const getSingleJob = (slug: string) :Promise<JobResponseType> => {
    const { baseURL, typesenseApiKey } = usePayloadUrl()
    const apiHeaders = {
        'X-TYPESENSE-API-KEY': typesenseApiKey,
    }
    return $fetch(`${baseURL}/collections/jobs/documents/search?q=*&filter_by=job_slug:${slug}`, {
        method: 'get',
        headers: apiHeaders,
    })
}

export {
    getJobsList,
    getSingleJob
}
