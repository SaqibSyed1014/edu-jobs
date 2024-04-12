const apiHeaders = {
    'X-TYPESENSE-API-KEY': '3bxhPnXQCcA2Ubg5jYOJu0IbFoEnU7Fq',
}

function convertQueryToString(query: { [key: string]: any }): string {
    return Object.entries(query)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join('&');
}

const getJobsList = (query: any) :Promise<any> => {
    const queryString = convertQueryToString(query);
    return $fetch(`https://9gj45ofprzq1yhi2p-1.a1.typesense.net/collections/jobs/documents/search?${queryString}`, {
        method: 'get',
        headers: apiHeaders,
    })
}

export {
    getJobsList
}
