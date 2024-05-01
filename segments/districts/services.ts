
import { usePayloadUrl , convertQueryToString} from "~/segments/utils"


const getDistrictList = (query: any) :Promise<DisrictResponseType> => {
    const { baseURL, typesenseApiKey } = usePayloadUrl()
        const queryString = convertQueryToString(query);
        const apiHeaders = {
            'X-TYPESENSE-API-KEY': typesenseApiKey,
        }

    return $fetch(`${baseURL}/collections/districts/documents/search?${queryString}`, {
        method: 'get',
        headers: apiHeaders,
    })
}

export {
    getDistrictList
}
