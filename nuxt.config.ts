// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            title: 'EduJobs',
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
        }
    },
    runtimeConfig: {
        API_URL: process.env.API_URL,
        public: {
          API_URL: process.env.API_URL,
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
