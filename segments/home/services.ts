import { usePayloadUrl } from "~/segments/utils"

const getJobsSummaryByCities = () :Promise<JobsInCities[]> => {
    const { baseUrl, apiKey } = usePayloadUrl()
    const apiHeaders = {
        'Accept': '*/*',
        'API-Key': apiKey,
    }
    return $fetch(`${baseUrl}/locations/summary`, {
        method: 'get',
        headers: apiHeaders,
    })
}


export {
    getJobsSummaryByCities,
}
