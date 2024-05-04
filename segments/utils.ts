export const usePayloadUrl = () => {
    const config = useRuntimeConfig()
    let baseUrl, apiKey,  typesenseBaseURL, typesenseApiKey, strapiBaseUrl, strapiApiToken
    baseUrl = config.public.API_URL
    apiKey = config.public.API_KEY
    typesenseBaseURL = config.public.TYPESENSE_API_URL
    typesenseApiKey = config.public.TYPESENSE_API_KEY
    strapiBaseUrl = config.public.STRAPI_API_URL
    strapiApiToken = config.public.STRAPI_API_TOKEN
    return { baseUrl, apiKey, typesenseBaseURL, typesenseApiKey, strapiBaseUrl ,strapiApiToken }
}


export function convertQueryToString(query: { [key: string]: any }): string {
    return Object.entries(query)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');
}

export function convertDateFormat(date: Date | string) {
    if (typeof date === 'string') {   // converting yyyy-dd-mm to mm/dd/yyyy format
        const parts = date.split('-');
        return `${parts[1]}/${parts[2]}/${parts[0]}`;
    }
}
