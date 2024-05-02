import { usePayloadUrl , convertQueryToString} from "~/segments/utils"


const getJobsList = (query: any) :Promise<JobResponseType> => {
    const { typesenseBaseURL, typesenseApiKey } = usePayloadUrl()
    const apiHeaders = {
        'X-TYPESENSE-API-KEY': typesenseApiKey,
    }

    const queryString = convertQueryToString(query);
    return $fetch(`${typesenseBaseURL}/collections/jobs/documents/search?${queryString}`, {
        method: 'get',
        headers: apiHeaders,
    })
}

const getJobDetails = (slug: string) :Promise<ExtendedJobDetails> => {
    const { baseUrl, apiKey } = usePayloadUrl()
    const apiHeaders = {
        'API-Key': apiKey,
    }
    return $fetch(`${baseUrl}/job/${slug}`, {
        method: 'get',
        headers: apiHeaders,
    })
}

export {
    getJobsList,
    getJobDetails
}
