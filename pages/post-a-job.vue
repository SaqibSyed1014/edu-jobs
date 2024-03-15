<script setup lang="ts">
import { CheckIcon } from '@heroicons/vue/20/solid'
import UploadImageIcon from '~/assets/icons/upload.svg'
import AlertCircle from '~/assets/icons/alert-circle.svg'
import ClockIcon from '~/assets/icons/clock.svg'
import DollarIcon from '~/assets/icons/currency-dollar.svg'
import FileUpload from '~/assets/icons/file-upload.svg'

const steps = ref([
  { name: 'District Information', href: '/post-a-job', status: 'current' },
  {
    name: 'Job Details',
    href: '/post-a-job?job-detail',
    status: 'upcoming',
  },
  { name: 'Application Details', href: '/post-a-job?appliation-details', status: 'upcoming' },
  { name: 'Review Information', href: '/post-a-job?review-information', status: 'upcoming' },
])

const route = useRoute()
console.log("🚀 ~ router:", route)
</script>

<template>
  <div class="container py-8">
    <div className="justify-start items-start gap-4 inline-flex">
      <div className="flex-col justify-start items-center gap-1 inline-flex">
        <div className="text-gray-900 text-3xl font-semibold leading-[38px] w-full">Post a Job
        </div>
        <div className="text-slate-600 text-base font-normal leading-normal">Your job post
          will be pinned to the top and highlighted in relevant search results for 30 days.</div>
      </div>
    </div>
    <hr class="border-b border-gray-200 mt-5">
    <div class="flex flex-row justify-between gap-8">

      <Stepper :steps="steps" class="w-1/5 pt-8 border-r border-gray-200" />

      <div class="w-3/5	pt-8">
        <h2 class="text-lg font-semibold leading-7 text-gray-900">District Information</h2>
        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-600">Please fill the fields below regarding district
          information.</p>
        <div
          class="mt-5 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
          <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label for="username" class="block text-base font-semibold text-gray-700 sm:pt-1.5">School district
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
            <label for="username" class="block text-base font-semibold text-gray-700 sm:pt-1.5">Your photo
              <br /> <span className="w-[228px] text-slate-600 text-base font-normal leading-normal">This will
                be
                displayed on your profile.
              </span>
            </label>
            <div class="mt-2 sm:col-span-2 sm:mt-0">
              <div class="flex items-start gap-x-5">
                <UploadImageIcon class="h-12" />
                <div class="mt-2 sm:mt-0 w-full">
                  <div class="flex w-full justify-center rounded-lg border border-gray-200 px-6 py-3.5">
                    <div class="text-center flex flex-col justify-center items-center">
                      <FileUpload class="h-10 w-10" />
                      <div class="mt-4 flex text-sm leading-6 text-center justify-center items-center text-gray-600">
                        <label for="file-upload"
                          class="relative cursor-pointer rounded-md bg-white font-semibold text-brand-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-brand-600 focus-within:ring-offset-2 hover:text-brand-500">
                          <span>Upload a file</span>
                          <input id="file-upload" name="file-upload" type="file" class="sr-only" />
                        </label>
                        <p class="pl-1">or drag and drop</p>
                      </div>
                      <p class="text-xs leading-5 text-gray-600">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            class="mt-5 space-y-8 divide-b divide-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
            <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label for="username" class="block text-base font-semibold text-gray-700 sm:pt-1.5">Your work email
                address*<br /> <span className="w-[228px] text-slate-600 text-base font-normal leading-normal">
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
            class="mt-5 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
            <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label for="username" class="block text-base font-semibold text-gray-700 sm:pt-1.5">Your full name*
              </label>
              <div class="mt-2 sm:col-span-2 sm:mt-0">
                <div
                  class="flex relative rounded-md ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-brand-600">
                  <input type="text" name="username" id="username" autocomplete="username"
                    class="block flex-1 border-0 bg-transparent placeholder:pl-1.5 py-2 pl-3.5 text-gray-900 placeholder:text-gray-500 placeholder:text-base placeholder:font-normal focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="e.g. Unified School District" />
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <AlertCircle class="size-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-end space-x-3 pt-5 pb-8">
            <BaseButton label="Cancel" color="gray" :outline="true" />
            <BaseButton label="Next" color="primary" />
          </div>
        </div>
      </div>


      <div class="w-1/5 flex flex-col gap-4 pt-8">
        <div
          className="p-4 w-full  rounded-xl shadow border border-gray-200 flex-col justify-start items-center inline-flex">
          <div className="flex-col justify-start items-start gap-5 flex w-full">
            <p className="text-gray-900 text-base font-medium leading-normal">Order
              Summary
            </p>
            <div className="w-full flex-col justify-between items-start gap-2 flex">
              <div className="justify-between items-start gap-4 inline-flex w-full">
                <p className="text-gray-600 text-sm font-medium leading-tight">Job
                  posting fee</p>
                <p className="text-gray-900 text-sm font-medium leading-tight">$200</p>
              </div>
              <hr class="border-b border-gray-200 mb-3 mt-2 w-full">

              <div className="justify-between w-full items-center gap-4 inline-flex">
                <p className="text-gray-600 text-sm font-medium leading-tight">
                  Total
                </p>
                <p className="text-gray-900 text-lg font-semibold leading-7">$200</p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="p-4 w-full  rounded-xl shadow border border-gray-200 flex-col justify-start items-center inline-flex">
          <div className="flex-col justify-start items-start gap-5 flex w-full">
            <UploadImageIcon class="h-12" />
            <div className="w-full flex-col justify-between items-start gap-5 flex">
              <div className="w-full">
                <p className="text-gray-900 text-base font-medium leading-normal">Job Title</p>
                <p className="text-gray-600 text-sm font-normal leading-tight">Company name</p>
              </div>

              <div className="justify-between w-full items-center gap-4 inline-flex">

                <div class="flex items-center space-x-1.5">
                  <ClockIcon class="h-5" />
                  <p className="text-gray-600 text-sm font-medium leading-tight">
                    Full-time
                  </p>
                </div>
                <div class="flex items-center space-x-1.5">
                  <DollarIcon class="h-5" />
                  <p className="text-gray-600 text-sm font-medium leading-tight">
                    80k - 100k
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div
          className="p-4 w-full  rounded-xl shadow border border-gray-200 flex-col justify-start items-center inline-flex">
          <div className="flex-col justify-start items-start gap-5 flex w-full">
            <div className="w-full flex-col justify-between items-start gap-5 flex">
              <div className="w-full">
                <p className="text-gray-900 text-base font-medium leading-normal">We Care</p>
                <div className="w-[228px]"><span class="text-slate-600 text-xs font-normal leading-[18px]">We
                    donate a percentage of job posting revenue to classroom projects through our
                    partnership</span><span class="text-gray-600 text-sm font-normal leading-tight"> </span><span
                    class="text-brand-500 text-xs font-normal underline leading-[18px]"> DonorsChoose.org.</span>
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