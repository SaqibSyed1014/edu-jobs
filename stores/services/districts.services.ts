const apiHeaders = {
    'X-TYPESENSE-API-KEY': '3bxhPnXQCcA2Ubg5jYOJu0IbFoEnU7Fq',
}

const getDistrictList = (query: any) :Promise<DisrictResponseType> => {
    return $fetch(`https://9gj45ofprzq1yhi2p-1.a1.typesense.net/collections/districts/documents/search?q=*&per_page=${query?.itemsPerPage}&page=${query?.page}`, {
        method: 'get',
        headers: apiHeaders,
    })
}

export {
    getDistrictList
}
