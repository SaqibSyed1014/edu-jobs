
import { usePayloadUrl , convertQueryToString} from "~/segments/utils"


const getDistrictList = (query: any) :Promise<DisrictResponseType> => {
    const { baseUrl, apiKey } = usePayloadUrl()
        const queryString = convertQueryToString(query);
        const apiHeaders = {
            'API-Key': apiKey,
        }

    return $fetch(`${baseUrl}/districts/list?${queryString}`, {
        method: 'get',
        headers: apiHeaders,
    })
}

export {
    getDistrictList
}
