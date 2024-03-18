<script setup lang="ts">
import UploadImageIcon from '~/assets/icons/upload.svg'
import ClockIcon from '~/assets/icons/clock.svg'
import DollarIcon from '~/assets/icons/currency-dollar.svg'
import CalendarSvg from '~/assets/icons/calendar.svg'
import StepRing from '~/assets/icons/ring-3-4.svg'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const steps = ref([
    { name: 'District Information', href: '/post-a-job', status: 'complete' },
    { name: 'Job Details', href: '/post-a-job/job-details', status: 'complete' },
    { name: 'Application Details', href: '/post-a-job/application-details', status: 'current' },
    { name: 'Review Information', href: '/post-a-job/review-information', status: 'upcoming' },
])
const date = ref(new Date());

const format = (date: any) => {
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

</script>

<template>
    <div class="container pb-16 pt-8 lg:py-8">
        <div class="">
            <h2 class="text-2xl lg:text-3xl font-semibold">
                Post a Job </h2>
            <p class="text-base font-normal">Your job post
                will be pinned to the top and highlighted in relevant search results for 30 days.
            </p>
        </div>
        <hr class="border-b border-gray-200 mt-5">
        <div class="flex flex-col lg:flex-row justify-between gap-8">
            <Stepper :steps="steps" class="w-1/5 pt-8 border-r border-gray-200" />
            <div class=" w-full lg:w-3/5 pt-8">
                <div class="flex items-center justify-between">
                    <div>
                        <h2 class="text-lg font-semibold leading-7 text-gray-900">Application Details</h2>
                        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-600"> Please fill the fields below
                            regarding application details.</p>
                    </div>
                    <StepRing class="h-14 lg:hidden " />
                </div>
                <div class="mt-5 space-y-0 border-b border-gray-900/10 divide-y divide-gray-900/10 border-t sm:pb-0">
                    <div class="sm:grid xl:grid-cols-3 xl:items-start gap-5 pb-4 xl:gap-8 xl:pt-6 xl:pb-5 mt-6 xl:mt-0">
                        <label for="application"
                            class="block text-sm md:text-base font-semibold text-gray-700 sm:pt-1.5">Your work
                            Application method<br /> <span
                                class="w-[228px] text-slate-600 text-sm md:text-base font-normal leading-normal">
                                “Please choose how you would like to receive job applications when candidates apply
                            </span>
                        </label>
                        <div class="mt-2 sm:col-span-2 sm:mt-0 pt-5 sm:pt-0">
                            <select id="countries"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-[13px] px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected>Apply URL</option>
                                <option value="US">...</option>
                            </select>
                        </div>
                    </div>

                    <div class="xl:grid xl:grid-cols-3 xl:items-start xl:gap-8 py-4 sm:py-5">
                        <label for="detail" class="block text-sm md:text-base font-semibold text-gray-700 sm:pt-1.5">
                            Enter detail
                        </label>
                        <div class="mt-2 sm:col-span-2 sm:mt-0 ">
                            <div class="mt-2 flex rounded-md shadow-sm">
                                <span
                                    class="inline-flex items-center rounded-tl-lg rounded-bl-lg px-3 font-normal border border-r-0 border-gray-300 leading-normal text-gray-500 sm:text-base">http://</span>
                                <input type="text" name="company-website" id="company-website"
                                    class="block w-full bg-transparent min-w-0 flex-1 rounded-none rounded-r-md border-0 py-2,5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="example.com/apply-here" />
                            </div>
                        </div>
                    </div>


                    <div class="xl:grid xl:grid-cols-3 xl:items-start xl:gap-8 py-4 sm:py-5">
                        <label for="date" class="block text-sm font-semibold text-gray-700 sm:pt-1.5">
                            Application deadline date </label>
                        <div class="mt-2 sm:col-span-2 relative">
                            <VueDatePicker v-model="date" :format="format" placeholder="March 25, 2024" />
                            <CalendarSvg class="absolute h-5 bottom-3 right-3" />

                        </div>
                    </div>
                </div>
                <div class="flex flex-col md:flex-row items-center justify-between gap-3 mt-4 md:mt-0">
                    <div class="w-full md:w-fit">
                        <BaseButton label="Back" color="brand" navigate-to="/post-a-job/job-details"
                            class="md:mt-5 md:mb-8" />
                    </div>
                    <div class="flex flex-col md:flex-row justify-end gap-3 md:pt-5 md:pb-8 w-full md:w-fit">
                        <BaseButton label="Cancel" color="gray" :outline="true" />
                        <BaseButton label="Next" color="primary" navigate-to="/post-a-job/review-information" />
                    </div>
                </div>

            </div>


            <div class="w-full lg:w-1/5 flex flex-col gap-4 pt-8">
                <div
                    class="block lg:max-w-sm p-4 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <p class="text-gray-900 text-base font-medium">Order Summary</p>

                    <div class="w-full mt-5">
                        <div class="flex items-start justify-between gap-4">
                            <p class="text-gray-600 text-sm font-medium">Job posting fee</p>
                            <p class="text-gray-900 text-sm font-medium">$200</p>
                        </div>
                        <hr class="border-b border-gray-200 my-3 w-full">
                        <div class="flex items-center justify-between gap-4">
                            <p class="text-gray-600 text-sm font-medium">Total</p>
                            <p class="text-gray-900 text-lg font-semibold leading-7">$200</p>
                        </div>
                    </div>
                </div>

                <div
                    class="block lg:max-w-sm p-4 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <div class="flex-col items-start gap-5 flex w-full">
                        <UploadImageIcon class="h-12" />
                        <div class="w-full flex-col justify-between items-start gap-5 flex">
                            <div class="w-full">
                                <p class="text-gray-900 text-base font-medium leading-normal">Job Title</p>
                                <p class="text-gray-600 text-sm font-normal leading-tight">Company name</p>
                            </div>

                            <div class="justify-between w-full xl:items-center gap-4 flex lg:flex-col xl:flex-row">
                                <div class="flex items-center space-x-1.5">
                                    <ClockIcon class="h-5" />
                                    <p class="text-gray-600 text-sm font-medium leading-tight">
                                        Full-time
                                    </p>
                                </div>
                                <div class="flex items-center space-x-1.5">
                                    <DollarIcon class="h-5" />
                                    <p class="text-gray-600 text-sm font-medium leading-tight">
                                        80k - 100k
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    class="block lg:max-w-sm p-4 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <div class="flex-col items-start gap-5 flex w-full">
                        <div class="w-full flex-col justify-between items-start gap-5 flex">
                            <div class="w-full">
                                <p class="text-gray-900 text-base font-medium leading-normal">We Care</p>
                                <div class=""><span class="text-slate-600 text-xs font-normal leading-[18px]">We
                                        donate a percentage of job posting revenue to classroom projects through our
                                        partnership</span><span class="text-gray-600 text-sm font-normal leading-tight">
                                    </span><span class="text-brand-500 text-xs font-normal underline leading-[18px]">
                                        DonorsChoose.org.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <BaseButton label="Post a Job for $200" :outline="true" color="primary" full-sized />
            </div>
        </div>
    </div>
</template>


<style scoped>
.dp__input_icon {
    @apply !right-0
}
</style>