
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


export {
    getStripeCheckDetails
}