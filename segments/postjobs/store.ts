import { getStripeCheckDetails } from "~/segments/postjobs/services"

interface StripeCheckout {
    content: StripeCheckoutSession | null ;
    duration: number | null;
    status: string | null;
    requestId: string | null;
}

export const usePostjobStore = defineStore('postjobStore', {
    state: () => ({
        content: null,
        duration: null,
        status: null,
        requestId: null,
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
    }
})