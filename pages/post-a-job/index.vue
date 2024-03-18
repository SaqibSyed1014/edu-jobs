<script setup lang="ts">
import { CheckIcon } from '@heroicons/vue/20/solid'
import UploadImageIcon from '~/assets/icons/upload.svg'
import AlertCircle from '~/assets/icons/alert-circle.svg'
import ClockIcon from '~/assets/icons/clock.svg'
import DollarIcon from '~/assets/icons/currency-dollar.svg'
import FileUpload from '~/assets/icons/file-upload.svg'
import Step1Ring from '~/assets/icons/ring-1-4.svg'

const steps = ref([
    { name: 'District Information', href: '/post-a-job', status: 'current' },
    { name: 'Job Details', href: '/post-a-job/job-details', status: 'upcoming', },
    { name: 'Application Details', href: '/post-a-job/application-details', status: 'upcoming' },
    { name: 'Review Information', href: '/post-a-job/review-information', status: 'upcoming' },
])
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
                        <h2 class="text-lg font-semibold leading-7 text-gray-900">District Information</h2>
                        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-600">Please fill the fields below regarding
                            district
                            information.</p>
                    </div>
                    <Step1Ring class="h-14 lg:hidden" />
                </div>
                <div
                    class="mt-5 space-y-8 border-b border-gray-900/10 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
                    <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                        <label for="username"
                            class="block text-sm md:text-base font-medium md:font-semibold text-gray-700 sm:pt-1.5">School
                            district
                            name*
                        </label>
                        <div class="mt-2 sm:col-span-2 sm:mt-0">
                            <div
                                class="flex relative rounded-md ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-brand-600">
                                <input type="text" name="username" id="username" autocomplete="username"
                                    class="block flex-1 border-0 bg-transparent placeholder:pl-1.5 py-2 pl-3.5 text-gray-900 placeholder:text-gray-900 placeholder:text-base placeholder:font-normal focus:ring-0 sm:text-sm sm:leading-6"
                                    placeholder="e.g. Unified School District" />
                                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                    <AlertCircle class="size-4" />
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="sm:grid sm:grid-cols-3 sm:items-center sm:gap-4 sm:py-6">
                        <label for="username"
                            class="block text-sm md:text-base font-semibold text-gray-700 sm:pt-1.5">Your photo
                            <br /> <span
                                class="w-[228px] text-slate-600 text-sm md:text-base font-normal leading-normal">This
                                will
                                be
                                displayed on your profile.
                            </span>
                        </label>
                        <div class="mt-2 sm:col-span-2 sm:mt-0">
                            <div class="flex flex-col md:flex-row items-start gap-x-5">
                                <UploadImageIcon class="h-12" />
                                <div class="mt-2 sm:mt-0 w-full">
                                    <div
                                        class="flex w-full justify-center rounded-lg border border-gray-200 px-6 py-3.5">
                                        <div class="text-center flex flex-col justify-center items-center">
                                            <FileUpload class="h-10 w-10" />
                                            <div
                                                class="mt-4 flex text-sm leading-6 text-center justify-center items-center text-gray-600">
                                                <label for="file-upload"
                                                    class="relative cursor-pointer rounded-md bg-white font-semibold text-brand-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-brand-600 focus-within:ring-offset-2 hover:text-brand-500">
                                                    <span>Upload a file</span>
                                                    <input id="file-upload" name="file-upload" type="file"
                                                        class="sr-only" />
                                                </label>
                                                <p class="pl-1">or drag and drop</p>
                                            </div>
                                            <p class="text-xs leading-5 text-gray-600">SVG, PNG, JPG or GIF (max.
                                                800x400px)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        class="mt-5 space-y-8 divide-b divide-gray-900/10 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
                        <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                            <label for="username"
                                class="block text-sm md:text-base font-semibold text-gray-700 sm:pt-1.5">Your work
                                email
                                address*<br /> <span
                                    class="w-[228px] text-slate-600 text-sm md:text-base font-normal leading-normal">
                                    Used to send you an email confirmation
                                </span>
                            </label>
                            <div class="mt-2 sm:col-span-2 sm:mt-0">
                                <div
                                    class="flex relative rounded-md ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-brand-600">
                                    <input type="email" name="username" id="username" autocomplete="username"
                                        class="block flex-1 border-0 bg-transparent placeholder:pl-1.5 py-2 pl-3.5 text-gray-900 placeholder:text-gray-500 placeholder:text-base placeholder:font-normal focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="example@edujobs.com" />
                                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                        <AlertCircle class="size-4" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        class="mt-5 space-y-8 border-b border-gray-900/10 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
                        <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                            <label for="username"
                                class="block text-sm md:text-base font-semibold text-gray-700 sm:pt-1.5">Your full
                                name*
                            </label>
                            <div class="mt-2 sm:col-span-2 sm:mt-0">
                                <div
                                    class="flex relative rounded-md ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-brand-600">
                                    <input type="text" name="username" id="username" autocomplete="username"
                                        class="block flex-1 border-0 bg-transparent placeholder:pl-1.5 py-2 pl-3.5 text-gray-900 placeholder:text-gray-500 placeholder:text-base placeholder:font-normal focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="John Doe" />
                                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                        <AlertCircle class="size-4" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="flex flex-col md:flex-row justify-end gap-3 pt-5 pb-8">
                    <BaseButton label="Cancel" color="gray" :outline="true" />
                    <BaseButton label="Next" navigate-to="/post-a-job/job-details" color="primary" />
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


<style scoped lang="postcss"></style>