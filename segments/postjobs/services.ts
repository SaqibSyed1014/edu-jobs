
import { usePayloadUrl , convertQueryToString} from "~/segments/utils"

const  getStripeCheckDetails = async (query: any, requestBody :any) :Promise<StripeResponse> => {

    const { baseUrl, apiKey } = usePayloadUrl()
    const apiHeaders = {
        'API-Key': apiKey,
    }

    try {
        const response = await $fetch<StripeResponse>(`${baseUrl}/payment/checkout`, {
            method: 'POST',
            headers: apiHeaders,
            body: JSON.stringify(requestBody),
        });
        return response;
    } catch (error: any) {
            console.log("check error adil",error)
        if (error.response && error.response.status === 500) {
            console.error('Server error (500):', error.response.data);
            throw new Error('Internal Server Error: Please try again later.');
        } else if (error.response) {
            console.error(`Error (${error.response.status}):`, error.response.data);
            throw new Error(`Error (${error.response.status}): ${error.response.statusText}`);
        } else {
            console.error('Network or other error:', error);
            throw new Error('Network error: Please check your connection and try again.');
        }
    }

}

const getOrgTypes = () :Promise<OrganizationType[]> => {
    const { baseUrl, apiKey } = usePayloadUrl()
    const apiHeaders = {
        'API-Key': apiKey,
    }
    return $fetch(`${baseUrl}/reference/organizationtypes`, {
        method: 'get',
        headers: apiHeaders,
    })
}

const getGradesLevels = () :Promise<GradeLevel[]> => {
    const { baseUrl, apiKey } = usePayloadUrl()
    const apiHeaders = {
        'API-Key': apiKey,
    }
    return $fetch(`${baseUrl}/reference/gradelevels`, {
        method: 'get',
        headers: apiHeaders,
    })
}

const getSubjects = () :Promise<Subject[]> => {
    const { baseUrl, apiKey } = usePayloadUrl()
    const apiHeaders = {
        'API-Key': apiKey,
    }
    return $fetch(`${baseUrl}/reference/subjects`, {
        method: 'get',
        headers: apiHeaders,
    })
}

const getExperienceLevels = () :Promise<ExperienceLevel[]> => {
    const { baseUrl, apiKey } = usePayloadUrl()
    const apiHeaders = {
        'API-Key': apiKey,
    }
    return $fetch(`${baseUrl}/reference/experiencelevels`, {
        method: 'get',
        headers: apiHeaders,
    })
}

const getSearchedOrgName = (query :string) :Promise<OrgResponseType> => {
    const { baseUrl, apiKey } = usePayloadUrl()
    const apiHeaders = {
        'API-Key': apiKey,
    }
    return $fetch(`${baseUrl}/org/search?q=*&filter_by=name:${query}*`, {
        method: 'get',
        headers: apiHeaders,
    })
}


export {
    getStripeCheckDetails,
    getGradesLevels,
    getSubjects,
    getExperienceLevels,
    getOrgTypes,
    getSearchedOrgName
}
