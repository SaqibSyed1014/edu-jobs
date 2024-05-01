// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            title: 'EduJobs',
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            link:  [
                { rel: 'icon', type: 'image/x-icon', sizes: '32x32', href: '/favicon.ico' },
                { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
                { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
                { rel: 'apple-touch-icon', type: 'image/png', sizes: '76x76', href: '/apple-touch-icon.png' }
            ]
        }
    },
    runtimeConfig: {
        public: {  // accessible on client-side
          API_URL: process.env.API_URL,
          API_KEY: process.env.TYPESENSE_API_KEY,
          STRAPI_API_URL: process.env.STRAPI_API_URL,
          STRAPI_API_TOKEN: process.env.STRAPI_API_TOKEN,
        },
      },
    build: {
        transpile: ['vue-google-maps-community-fork', '@googlemaps/markercluster', '@vuepic/vue-datepicker'],
    },
    vite: {
        optimizeDeps: {
            include: [
                "fast-deep-equal",
            ],
        },
    },
    modules: [
        '@nuxtjs/tailwindcss',
        'nuxt-swiper',
        'nuxt-svgo',
        '@nuxtjs/robots',
        '@pinia/nuxt',
        'nuxt-lodash'
    ],
    components: [
        {
            path: '~/components', // will get any components nested in let's say /components/test too
            pathPrefix: false,
        },
    ],
    swiper: {
        prefix: 'Swiper'
    },
    tailwindcss: {
        cssPath: '~/assets/css/tailwind.css'
    },
    svgo: {
        defaultImport: 'component'
    },
    robots: {
        rules: {
            UserAgent: '*',
            Disallow: '/'
        }
    },
    lodash: {
        prefix: "_",
        prefixSkip: ["string"],
        upperAfterPrefix: false,
        exclude: ["map"],
        alias: [
          ["camelCase", "stringToCamelCase"], // => stringToCamelCase
          ["kebabCase", "stringToKebab"], // => stringToKebab
          ["isDate", "isLodashDate"], // => _isLodashDate
        ],
      },
})
