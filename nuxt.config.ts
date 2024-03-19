// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            title: 'EduJobs',
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
        }
    },
    build: {
        transpile: ['vue-google-maps-community-fork', '@googlemaps/markercluster'],
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
        'nuxt-svgo'
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
        cssPath: '~/assets/css/input.css'
    },
    svgo: {
        defaultImport: 'component'
    }
})
