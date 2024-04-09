const apiHeaders = {
    'X-TYPESENSE-API-KEY': '3bxhPnXQCcA2Ubg5jYOJu0IbFoEnU7Fq',
}

function convertQueryToString(query: { [key: string]: any }): string {
    return Object.entries(query)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');
}

const getDistrictList = (query: any) :Promise<DisrictResponseType> => {
    const queryString = convertQueryToString(query);
    return $fetch(`https://9gj45ofprzq1yhi2p-1.a1.typesense.net/collections/districts/documents/search?${queryString}`, {
        method: 'get',
        headers: apiHeaders,
    })
}

export {
    getDistrictList
}
