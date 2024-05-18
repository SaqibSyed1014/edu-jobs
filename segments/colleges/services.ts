import { usePayloadUrl , convertQueryToString} from "~/segments/utils"


const getCollegesList = (query: any) :Promise<CollegesResponseType> => {
    const { baseUrl, apiKey } = usePayloadUrl()
    const apiHeaders = {
        'API-Key': apiKey,
    }
    const queryString = convertQueryToString(query);
    return $fetch(`${baseUrl}/colleges/list?${queryString}`, {
        method: 'get',
        headers: apiHeaders,
    })
}

export {
    getCollegesList
}
