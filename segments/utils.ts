export const usePayloadUrl = () => {
    const config = useRuntimeConfig()
    let  baseURL, typesenseApiKey, strapiBaseUrl, strapiApiToken
    if (process.server) {
        baseURL = config.API_URL
        typesenseApiKey= config.API_KEY
        strapiBaseUrl= config.STRAPI_API_URL
        strapiApiToken= config.STRAPI_API_TOKEN
    }
    else {
        baseURL = config.public.API_URL
        typesenseApiKey= config.public.API_KEY
        strapiBaseUrl= config.public.STRAPI_API_URL
        strapiApiToken= config.public.STRAPI_API_TOKEN
    }
    return {  baseURL, typesenseApiKey, strapiBaseUrl ,strapiApiToken}
}


export function convertQueryToString(query: { [key: string]: any }): string {
    return Object.entries(query)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');
}
