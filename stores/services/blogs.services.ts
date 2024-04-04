const getBlogsList = () :Promise<BlogResponseType> => {
    return $fetch('https://strapi.edujobs.org/api/posts?populate[category][fields][0]=category_name&populate[author][fields][1]=name&populate[post_photo]=*', {
        method: 'get',
        headers: {
            Authorization: 'Bearer 0bdc36117655a8694cdb9f206da89fa28d2b8a8a8fa83ae102328c3213359560f70d0f06b4734e79d2bde3f4362fca47dcb54b9a714e0348bcc8d876c4167e9ec15cfee84980becaaf40134b35976d19e114a1c6a376b5edb1bb41dede57dcd2f833d0eb2439492f0f8fbd59568e59f1a2959375e5cd427e2dbfa211a42278a9',
        },
    })
}

export {
    getBlogsList
}
