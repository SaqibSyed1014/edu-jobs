import { usePayloadUrl } from "~/segments/utils"

const getBlogsList = (pageNumber :number, pageSize :number) :Promise<BlogResponseType> => {
    const { strapiBaseUrl, strapiApiToken } = usePayloadUrl()

    const apiHeaders = {
        Authorization: `Bearer ${strapiApiToken}`,
    }
    const strapiFieldsSchema = 'populate[category][fields][0]=category_name&populate[author][fields][1]=name&populate[post_photo]=*';
    const strapiPaginationSchema = `pagination[page]=${pageNumber}&pagination[pageSize]=${pageSize}`;
    return $fetch(`${strapiBaseUrl}/api/posts?${strapiFieldsSchema}&${strapiPaginationSchema}`, {
        method: 'get',
        headers: apiHeaders,
    })
}

const getBlogsCategories = () :Promise<BlogCategoriesResponseType> => {
    const { strapiBaseUrl, strapiApiToken } = usePayloadUrl()

    const apiHeaders = {
        Authorization: `Bearer ${strapiApiToken}`,
    }
    return $fetch(`${strapiBaseUrl}/api/categories`, {
        method: 'get',
        headers: apiHeaders,
    })
}

const getRecentBlogs = () :Promise<BlogResponseType> => {
    const { strapiBaseUrl, strapiApiToken } = usePayloadUrl()

    const apiHeaders = {
        Authorization: `Bearer ${strapiApiToken}`,
    }
    const strapiFieldsSchema = 'populate[category][fields][0]=category_name&populate[author][fields][1]=name&populate[post_photo]=*';
    const strapiPaginationSchema = `pagination[page]=1&pagination[pageSize]=3`;
    return $fetch(`${strapiBaseUrl}/api/posts?${strapiFieldsSchema}&${strapiPaginationSchema}`, {
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
    getBlogsCategories,
    getRecentBlogs,
    getBlogDetails
}
