import { usePayloadUrl , convertQueryToString} from "~/segments/utils"


const getCollegesList = (query: any) :Promise<CollegesResponseType> => {
    const { baseURL, typesenseApiKey } = usePayloadUrl()
    const apiHeaders = {
        'X-TYPESENSE-API-KEY': typesenseApiKey,
    }
    const queryString = convertQueryToString(query);
    return $fetch(`${baseURL}/collections/colleges/documents/search?${queryString}`, {
        method: 'get',
        headers: apiHeaders,
    })
}

export {
    getCollegesList
}
