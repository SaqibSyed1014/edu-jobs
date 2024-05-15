
import { usePayloadUrl , convertQueryToString} from "~/segments/utils"


const getSchoolsList = (query: any) :Promise<SchoolResponseType> => {
    const { typesenseBaseURL, typesenseApiKey } = usePayloadUrl()
        const queryString = convertQueryToString(query);
        const apiHeaders = {
            'X-TYPESENSE-API-KEY': typesenseApiKey,
        }

    return $fetch(`${typesenseBaseURL}/collections/charters/documents/search?${queryString}`, {
        method: 'get',
        headers: apiHeaders,
    })
}

const getSchoolDetails = (slug: string) :Promise<School> => {
    const { baseUrl, apiKey } = usePayloadUrl()
    const apiHeaders = {
        'API-Key': apiKey,
    }
    return $fetch(`${baseUrl}/org/${slug}`, {
        method: 'get',
        headers: apiHeaders,
    })
}

export {
    getSchoolsList,
    getSchoolDetails
}
