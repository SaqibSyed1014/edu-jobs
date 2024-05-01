
import { usePayloadUrl , convertQueryToString} from "~/segments/utils"


const getDistrictList = (query: any) :Promise<DisrictResponseType> => {
    const { typesenseBaseURL, typesenseApiKey } = usePayloadUrl()
        const queryString = convertQueryToString(query);
        const apiHeaders = {
            'X-TYPESENSE-API-KEY': typesenseApiKey,
        }

    return $fetch(`${typesenseBaseURL}/collections/districts/documents/search?${queryString}`, {
        method: 'get',
        headers: apiHeaders,
    })
}

export {
    getDistrictList
}
