import {
    getStripeCheckDetails,
    getOrgTypes,
    getGradesLevels,
    getSubjects,
    getExperienceLevels,
    getSearchedOrgName,
    checkUserMailExists,
    saveJobData
} from "~/segments/postjobs/services"

interface StripeCheckout {
    content: StripeCheckoutSession | null ;
    duration: number | null;
    status: string | null;
    requestId: string | null;
    organizationTypes: OrganizationType[];
    gradeLevels: GradeLevel[];
    subjects: Subject[];
    experienceLevels: ExperienceLevel[];
    searchedOrgNames: OrgDocument[]
}

export const usePostjobStore = defineStore('postjobStore', {
    state: () => ({
        content: null,
        duration: null,
        status: null,
        requestId: null,
        organizationTypes: [],
        gradeLevels: [],
        subjects: [],
        experienceLevels: [],
        searchedOrgNames: []
    } as StripeCheckout),
    actions: {
        async fetchPayment(query:any  , requestBody : any) {
            try {
                const  { content,status }  = await getStripeCheckDetails(query,requestBody)

                console.log("check content for return response ",content)
                this.$state.content = content;
                this.$state.status = status;
                // console.log(this.$state.content)
                //console.log("this.$state.data",this.$state.stripedata);
            } catch (error: any) {
                console.log("check content error",error)
            }
            // const response = await useGet(`/collections/districts/documents/search?q=*&per_page=10`)
            //this.$state.stripeData = data
            //this.$state.total_page = Math.ceil(found / 12)
        },

        reset() {
            this.$state.content  = null;
            this.$state.status  = null;
        },

        async fetchOrgTypes() {
            this.$state.organizationTypes = await getOrgTypes();
        },
        async fetchGradeLevels() {
            this.$state.gradeLevels = await getGradesLevels();
        },
        async fetchSubjects() {
            this.$state.subjects = await getSubjects();
        },
        async fetchExperienceLevels() {
            this.$state.experienceLevels = await getExperienceLevels();
        },
        async fetchSearchedOrgNames(name :string) {
            const { hits } = await getSearchedOrgName(name);
            this.$state.searchedOrgNames = hits.map((org:OrgHit) => org.document)
        },
        async checkUserMail(mail :string) {
            return await checkUserMailExists(mail)
                .then(({ error }) => {
                    return error;
                })
                .catch((err) => {
                    useNuxtApp().$toast.error('An Error Occurred');
                    throw err;
                })
        },
        async savingJobFormData(payload :any) {
            return await saveJobData(payload)
                .then(({ message }) => {
                    useNuxtApp().$toast.success(message);
                })
                .catch((err) => {
                    useNuxtApp().$toast.error('An Error Occurred');
                    throw err;
                })
        },
    },
    getters: {
        orgTypesDropdown: (state) => {
            return state.organizationTypes.map((org :OrganizationType) => ({
                label: org.organization_type,
                value: org.organization_type_id
            }))
        },
        gradeLevelDropdown: (state) => {
            return state.gradeLevels.map((grade :GradeLevel) => ({
                label: grade.grade_level_long,
                value: grade.grade_level_id
            }))
        },
        subjectsDropdown: (state) => {
            return state.subjects.map((grade :Subject) => ({
                label: grade.subject_long,
                value: grade.subject_id
            }))
        },
        experienceLevelOptions: (state) => {
            return state.experienceLevels
                .sort((a :ExperienceLevel, b :ExperienceLevel) => a.sort_order - b.sort_order)
                .map((experience :ExperienceLevel) => ({
                    label: experience.experience_level,
                    value: experience.experience_level_id,
                    desc: experience.experience_level_description
                })) || []
        },
        orgNamesDropdown: (state) => {
            return state.searchedOrgNames?.map((org :OrgDocument) => ({
                label: org.name,
                value: org.id
            })) || []
        },
    }
})
