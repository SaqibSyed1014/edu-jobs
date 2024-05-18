import {
    getJobsSummaryByCities,
    getPartnersLogo,
    getFeaturedOrganizations
} from "~/segments/home/services";

interface HomeSectionsData {
    jobsByCities: JobsInCities[]
    partnersLogos: PartnerLogo[]
    featuredOrganizations: FeaturedOrganizations[]
}

export const useHomeStore = defineStore('homeStore', {
    state: () => ({
        jobsByCities: [],
        partnersLogos: [],
        featuredOrganizations: []
    } as HomeSectionsData),
    actions: {
        async fetchJobsSummaryByCities() {
            this.$state.jobsByCities = await getJobsSummaryByCities();
        },
        async fetchPartnersLogos() {
            this.$state.partnersLogos = await getPartnersLogo();
        },
        async fetchFeaturedOrganizations() {
            this.$state.featuredOrganizations = await getFeaturedOrganizations();
        }
    },
    getters: {
        jobsInEachCity: (state) :JobsInCities[] => {
            return state.jobsByCities?.sort((a, b) => a.priority_rank - b.priority_rank) || []
        },
        partnersLogo: (state) :PartnerLogo[] => {
            return state.partnersLogos
                ?.filter(logo => logo.is_active === 1 && logo.logo_path)
                .sort((a, b) => a.display_order - b.display_order) || []
        }
    }
})
