
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

const getDistrictSchoolDetail = (slug: string) :Promise<DistrictDocument> => {
    const { baseUrl, apiKey } = usePayloadUrl()
    const apiHeaders = {
        'API-Key': apiKey,
    }

    return $fetch(`${baseUrl}/org/${slug}`, {
        method: 'get',
        headers: apiHeaders,
    })
}

const getDistrictSchoolJobs = (query: any) :Promise<JobResponseType> => {
    const { baseUrl, apiKey } = usePayloadUrl()
    const apiHeaders = {
        'API-Key': apiKey,
    }

    const queryString = convertQueryToString(query);

    return $fetch(`${baseUrl}/jobs/list?${queryString}`, {
        method: 'get',
        headers: apiHeaders,
    })
}

export {
    getDistrictList,
    getDistrictSchoolDetail,
    getDistrictSchoolJobs
}
