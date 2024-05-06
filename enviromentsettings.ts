export interface GlobalSettings {
    SITE_ENVIROMENT: string;
    API_URL: string;
    TYPESENSE_API_KEY:string;
    STRAPI_API_URL:string;
    STRAPI_API_TOEKN:string;
}

export interface GlobalSettingsMap {
    development: GlobalSettings;
    staging: GlobalSettings;
    production: GlobalSettings;
}

export const globalSettings: GlobalSettingsMap = {
    development: {
        SITE_ENVIROMENT: 'development',
        API_URL : 'https://9gj45ofprzq1yhi2p-1.a1.typesense.net',
        TYPESENSE_API_KEY :'3bxhPnXQCcA2Ubg5jYOJu0IbFoEnU7Fq',
        STRAPI_API_URL : 'https://strapi.edujobs.org',
        STRAPI_API_TOEKN : '0bdc36117655a8694cdb9f206da89fa28d2b8a8a8fa83ae102328c3213359560f70d0f06b4734e79d2bde3f4362fca47dcb54b9a714e0348bcc8d876c4167e9ec15cfee84980becaaf40134b35976d19e114a1c6a376b5edb1bb41dede57dcd2f833d0eb2439492f0f8fbd59568e59f1a2959375e5cd427e2dbfa211a42278a9'
    },
    staging: {
        SITE_ENVIROMENT: 'staging',
        API_URL : 'https://9gj45ofprzq1yhi2p-1.a1.typesense.net',
        TYPESENSE_API_KEY :'3bxhPnXQCcA2Ubg5jYOJu0IbFoEnU7Fq',
        STRAPI_API_URL : 'https://strapi.edujobs.org',
        STRAPI_API_TOEKN : '0bdc36117655a8694cdb9f206da89fa28d2b8a8a8fa83ae102328c3213359560f70d0f06b4734e79d2bde3f4362fca47dcb54b9a714e0348bcc8d876c4167e9ec15cfee84980becaaf40134b35976d19e114a1c6a376b5edb1bb41dede57dcd2f833d0eb2439492f0f8fbd59568e59f1a2959375e5cd427e2dbfa211a42278a9'
    
    },
    production: {
        SITE_ENVIROMENT: '',
        API_URL : 'https://9gj45ofprzq1yhi2p-1.a1.typesense.net',
        TYPESENSE_API_KEY :'3bxhPnXQCcA2Ubg5jYOJu0IbFoEnU7Fq',
        STRAPI_API_URL : 'https://strapi.edujobs.org',
        STRAPI_API_TOEKN : '0bdc36117655a8694cdb9f206da89fa28d2b8a8a8fa83ae102328c3213359560f70d0f06b4734e79d2bde3f4362fca47dcb54b9a714e0348bcc8d876c4167e9ec15cfee84980becaaf40134b35976d19e114a1c6a376b5edb1bb41dede57dcd2f833d0eb2439492f0f8fbd59568e59f1a2959375e5cd427e2dbfa211a42278a9'
    
    }
};

