import {
    getStripeCheckDetails,
    getGradesLevels,
    getSubjects,
    getExperienceLevels
} from "~/segments/postjobs/services"

interface StripeCheckout {
    content: StripeCheckoutSession | null ;
    duration: number | null;
    status: string | null;
    requestId: string | null;
    gradeLevels: GradeLevel[];
    subjects: Subject[];
    experienceLevels: ExperienceLevel[]
}

export const usePostjobStore = defineStore('postjobStore', {
    state: () => ({
        content: null,
        duration: null,
        status: null,
        requestId: null,
        gradeLevels: [],
        subjects: [],
        experienceLevels: []
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

        async fetchGradeLevels() {
            this.$state.gradeLevels = await getGradesLevels();
        },
        async fetchSubjects() {
            this.$state.subjects = await getSubjects();
        },
        async fetchExperienceLevels() {
            this.$state.experienceLevels = await getExperienceLevels();
        },
    },
    getters: {
        gradeLevelDropdown: (state) => {
            return state.gradeLevels.map((grade :GradeLevel) => ({
                label: grade.grade_level_long,
                value: grade.grade_level
            }))
        },
        subjectsDropdown: (state) => {
            return state.subjects.map((grade :Subject) => ({
                label: grade.subject_long,
                value: grade.subject
            }))
        },
        experienceLevelDropdown: (state) => {
            return state.experienceLevels?.map((experience :ExperienceLevel) => ({
                label: experience.experience_level,
                value: experience.experience_level,
                desc: experience.experience_level_description
            })) || []
        }
    }
})
