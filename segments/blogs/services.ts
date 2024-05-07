import { usePayloadUrl } from "~/segments/utils"

const getBlogsList = () :Promise<BlogResponseType> => {
    const { strapiBaseUrl, strapiApiToken } = usePayloadUrl()

    const apiHeaders = {
        Authorization: `Bearer ${strapiApiToken}`,
    }
    return $fetch(`${strapiBaseUrl}/api/posts?populate[category][fields][0]=category_name&populate[author][fields][1]=name&populate[post_photo]=*`, {
        method: 'get',
        headers: apiHeaders,
    })
}

const getBlogDetails = (slug :string) :Promise<BlogResponseType> => {
    const { strapiBaseUrl, strapiApiToken } = usePayloadUrl()

    const apiHeaders = {
        Authorization: `Bearer ${strapiApiToken}`,
    }
    return $fetch(`${strapiBaseUrl}/api/posts?filters[slug][$eq]=${slug}&populate=*`, {
        method: 'get',
        headers: apiHeaders,
    })
}

export {
    getBlogsList,
    getBlogDetails
}
