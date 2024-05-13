
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

export {
    getSchoolsList
}
