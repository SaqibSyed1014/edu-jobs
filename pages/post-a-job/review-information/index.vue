<script setup lang="ts">
import { Tooltip } from "flowbite";

const steps = ref([
  { name: "Organization Information", href: "/post-a-job", status: "complete" },
  { name: "Job Details", href: "/post-a-job/job-details", status: "complete" },
  {
    name: "Application Details",
    href: "/post-a-job/application-details",
    status: "complete",
  },
  {
    name: "Review Information",
    href: "/post-a-job/review-information",
    status: "complete",
  },
]);

onMounted(() => {
  // set the tooltip content element
  const $targetEl = document.getElementById("tooltipContent");
  // set the element that trigger the tooltip using hover or click
  const $triggerEl = document.getElementById("tooltipButton");
  // options with default values
  const options: any = {
    placement: "top",
    triggerType: "hover",
    onHide: () => {
      console.log("tooltip is shown");
    },
    onShow: () => {
      console.log("tooltip is hidden");
    },
  };
  if ($targetEl) {
    /*
     * targetEl: required
     * triggerEl: required
     * options: optional
     */
    const tooltip = new Tooltip($targetEl, $triggerEl, options);
    // show the tooltip
    tooltip.hide();
  }
});
</script>

<template>
  <div class="container pb-16 pt-8 lg:py-8">
    <div class="">
      <h2 class="text-2xl lg:text-3xl font-semibold">Post a Job</h2>
      <p class="text-base font-normal">
        Your job post will be pinned to the top and highlighted in relevant
        search results for 30 days.
      </p>
    </div>
    <hr class="border-b border-gray-200 mt-5" />
    <div class="flex flex-col lg:flex-row justify-between gap-8">
      <Stepper
        :steps="steps"
        class="w-1/5 pt-8 pr-2 border-r border-gray-200"
      />
      <div class="w-full lg:w-3/5 pt-8">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-lg font-semibold leading-7 text-gray-900">
              Review Information
            </h2>
            <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
              Please review your application before submitting.
            </p>
          </div>
          <SvgoRing44 class="h-14 lg:hidden" />
        </div>
        <div
          class="mt-5 border-b border-gray-900/10 divide-y divide-gray-900/10 border-t pb-0"
        >
          <div
            class="flex-col justify-start items-start inline-flex w-full gap-6 py-4 md:py-6"
          >
            <h4 class="text-gray-900 text-base font-semibold leading-normal">
              Organization Information
            </h4>
            <div class="grid sm:grid-cols-2 gap-4 w-full">
              <div class="justify-start items-start gap-8 inline-flex">
                <div
                  class="flex-col justify-start items-start gap-2 inline-flex"
                >
                  <div class="inline-flex items-center gap-1">
                    <p
                      class="text-slate-700 text-base font-semibold leading-normal"
                    >
                      Organization Name*
                    </p>
                    <button id="tooltipButton" type="button">
                      <SvgoEditPensil class="h-4" />
                    </button>

                    <div
                      id="tooltipContent"
                      role="tooltip"
                      data-tooltip-style="light"
                      class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 tooltip"
                    >
                      Edit
                      <div class="tooltip-arrow" data-popper-arrow></div>
                    </div>
                  </div>

                  <p
                    class="text-slate-600 text-base font-normal leading-normal"
                  >
                    Palo Alto Unified School District
                  </p>
                </div>
              </div>
              <div class="justify-start items-start gap-8 inline-flex">
                <div
                  class="flex-col justify-start items-start gap-2 inline-flex"
                >
                  <p
                    class="text-slate-700 text-base font-semibold leading-normal"
                  >
                    Your work email address
                  </p>
                  <p
                    class="text-slate-600 text-base font-normal leading-normal"
                  >
                    olivia@edujobs.com
                  </p>
                </div>
              </div>
            </div>

            <div class="grid sm:grid-cols-2 gap-4 w-full">
              <div class="justify-start items-start gap-8 inline-flex">
                <div
                  class="flex-col justify-start items-start gap-2 inline-flex"
                >
                  <p
                    class="text-slate-700 text-base font-semibold leading-normal"
                  >
                    Your full name
                  </p>
                  <p
                    class="text-slate-600 text-base font-normal leading-normal"
                  >
                    Olivia Rhodes
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            class="flex-col justify-start items-start inline-flex w-full gap-6 py-4 md:py-6"
          >
            <h4 class="text-gray-900 text-base font-semibold leading-normal">
              Job Details
            </h4>
            <div class="grid sm:grid-cols-2 gap-4 w-full">
              <div class="justify-start items-start gap-8 inline-flex">
                <div
                  class="flex-col justify-start items-start gap-2 inline-flex"
                >
                  <p
                    class="text-slate-700 text-base font-semibold leading-normal"
                  >
                    Job Title
                  </p>
                  <p
                    class="text-slate-600 text-base font-normal leading-normal"
                  >
                    Project Manager
                  </p>
                </div>
              </div>
              <div class="justify-start items-start gap-8 inline-flex">
                <div
                  class="flex-col justify-start items-start gap-2 inline-flex"
                >
                  <p
                    class="text-slate-700 text-base font-semibold leading-normal"
                  >
                    Start Date
                  </p>
                  <p
                    class="text-slate-600 text-base font-normal leading-normal"
                  >
                    March 8th,2024
                  </p>
                </div>
              </div>
            </div>

            <div class="grid sm:grid-cols-2 gap-4 w-full">
              <div class="justify-start items-start gap-8 inline-flex">
                <div
                  class="flex-col justify-start items-start gap-2 inline-flex"
                >
                  <p
                    class="text-slate-700 text-base font-semibold leading-normal"
                  >
                    Employment Type
                  </p>
                  <p
                    class="text-slate-600 text-base font-normal leading-normal"
                  >
                    Full-time
                  </p>
                </div>
              </div>

              <div class="justify-start items-start gap-8 inline-flex">
                <div
                  class="flex-col justify-start items-start gap-2 inline-flex"
                >
                  <p
                    class="text-slate-700 text-base font-semibold leading-normal"
                  >
                    Job Role
                  </p>
                  <p
                    class="text-slate-600 text-base font-normal leading-normal"
                  >
                    Instructional
                  </p>
                </div>
              </div>
            </div>

            <div class="grid sm:grid-cols-2 gap-4 w-full">
              <div class="justify-start items-start gap-8 inline-flex">
                <div
                  class="flex-col justify-start items-start gap-2 inline-flex"
                >
                  <p
                    class="text-slate-700 text-base font-semibold leading-normal"
                  >
                    Grade Level(s)
                  </p>
                  <p
                    class="text-slate-600 text-base font-normal leading-normal"
                  >
                    12th Grade
                  </p>
                </div>
              </div>

              <div class="justify-start items-start gap-8 inline-flex">
                <div
                  class="flex-col justify-start items-start gap-2 inline-flex"
                >
                  <p
                    class="text-slate-700 text-base font-semibold leading-normal"
                  >
                    Subject Area(s)
                  </p>
                  <p
                    class="text-slate-600 text-base font-normal leading-normal"
                  >
                    Management
                  </p>
                </div>
              </div>
            </div>

            <div class="flex flex-col gap-4 w-full">
              <div class="justify-start items-start gap-8 inline-flex">
                <div
                  class="flex-col justify-start items-start gap-2 inline-flex"
                >
                  <p
                    class="text-slate-700 text-base font-semibold leading-normal"
                  >
                    Job Description
                  </p>
                  <p
                    class="text-slate-600 text-base font-normal leading-normal"
                  >
                    Dynamic Project Manager adept at orchestrating complex
                    projects from initiation to completion. Skilled in strategic
                    planning, resource allocation, and team leadership. Proven
                    track record of delivering high-quality results within
                    deadlines and budgets. Effective communicator, collaborator,
                    and problem-solver, ensuring seamless project execution.
                    Expertise in Agile methodologies and project management
                    tools. Ready to drive success in a collaborative and
                    challenging environment.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            class="flex-col justify-start items-start inline-flex w-full gap-6 py-4 md:py-6"
          >
            <h4 class="text-gray-900 text-base font-semibold leading-normal">
              Application Details
            </h4>
            <div class="grid sm:grid-cols-2 gap-4 w-full">
              <div class="justify-start items-start gap-8 inline-flex">
                <div
                  class="flex-col justify-start items-start gap-2 inline-flex"
                >
                  <p
                    class="text-slate-700 text-base font-semibold leading-normal"
                  >
                    Application method
                  </p>
                  <p
                    class="text-slate-600 text-base font-normal leading-normal"
                  >
                    Apply URL
                  </p>
                </div>
              </div>
              <div class="justify-start items-start gap-8 inline-flex">
                <div
                  class="flex-col justify-start items-start gap-2 inline-flex"
                >
                  <p
                    class="text-slate-700 text-base font-semibold leading-normal"
                  >
                    Enter details
                  </p>
                  <p
                    class="text-slate-600 text-base font-normal leading-normal"
                  >
                    https://example.com/apply-here
                  </p>
                </div>
              </div>
            </div>

            <div class="grid sm:grid-cols-2 gap-4 w-full">
              <div class="justify-start items-start gap-8 inline-flex">
                <div
                  class="flex-col justify-start items-start gap-2 inline-flex"
                >
                  <p
                    class="text-slate-700 text-base font-semibold leading-normal"
                  >
                    Application deadline date
                  </p>
                  <p
                    class="text-slate-600 text-base font-normal leading-normal"
                  >
                    March 25,2024
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            class="flex-col justify-start items-start inline-flex w-full gap-6 py-4 md:py-6"
          >
            <h4 class="text-gray-900 text-base font-semibold leading-normal">
              Upgrade
            </h4>
            <div class="grid sm:grid-cols-2 gap-4 w-full">
              <div class="justify-start items-start gap-8 inline-flex">
                <div
                  class="flex-col justify-start items-start gap-2 inline-flex"
                >
                  <p
                    class="text-slate-700 text-base font-semibold leading-normal"
                  >
                    Feature your Job
                  </p>
                </div>
              </div>
              <div class="flex flex-row gap-3 items-start">
                <div class="flex items-center">
                  <div class="flex items-center mb-4">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      value=""
                      class="w-4 h-4 text-brand-600 mt-1 bg-gray-100 border-gray-300 rounded focus:ring-brand-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                </div>
                <div class="max-w-[303px]">
                  <h3 class="text-gray-700 text-base font-medium">
                    For only $25 make Featured jobs offer these benefits:
                  </h3>

                  <h2 class="mb-2.5 text-base font-normal text-gray-600">
                    Featured jobs offer these benefits:
                  </h2>
                  <ol class="space-y-1 text-gray-600 list-decimal list-inside">
                    <li>
                      <span class="font-normal text-gray-600">
                        Show on our home page
                      </span>
                    </li>

                    <li>
                      <span class="font-normal text-gray-600">
                        Appear higher in the search results
                      </span>
                    </li>
                    <li>
                      <span class="font-normal text-gray-600">
                        Are styled visually to stand out
                      </span>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex flex-col md:flex-row items-center justify-between gap-3 mt-4 md:mt-0"
        >
          <div class="w-full md:w-fit">
            <BaseButton
              label="Back"
              color="brand"
              navigate-to="/post-a-job/application-details"
              class="md:mt-5 md:mb-8"
            />
          </div>
          <div
            class="flex flex-col md:flex-row justify-end gap-3 md:pt-5 md:pb-8 w-full md:w-fit"
          >
            <BaseButton
              type="button"
              label="Cancel"
              color="gray"
              :outline="true"
              class="order-2 md:order-1"
            />
            <BaseButton
              label="Next"
              color="primary"
              class="order-1 md:order-2"
            />
          </div>
        </div>
      </div>

      <div class="w-full lg:w-1/5 flex flex-col gap-4 md:pt-8">
        <div
          class="block lg:max-w-sm p-4 border border-gray-200 rounded-lg shadow"
        >
          <p class="text-gray-900 text-base font-medium">Order Summary</p>

          <div class="w-full mt-5">
            <div class="flex flex-col gap-2">
              <div class="flex items-start justify-between gap-4">
                <p class="text-gray-600 text-sm font-medium">Job posting fee</p>
                <p class="text-gray-900 text-sm font-medium">$49</p>
              </div>
              <div class="flex items-start justify-between gap-4">
                <p class="text-gray-600 text-sm font-medium">Featuring fee</p>
                <p class="text-gray-900 text-sm font-medium">$25</p>
              </div>
            </div>
            <hr class="border-b border-gray-200 my-3 w-full" />
            <div class="flex items-center justify-between gap-4">
              <p class="text-gray-600 text-sm font-medium">Total</p>
              <p class="text-gray-900 text-lg font-semibold leading-7">$225</p>
            </div>
          </div>
        </div>

        <div
          class="hidden md:block lg:max-w-sm p-4 border border-gray-200 rounded-lg shadow"
        >
          <div class="flex-col items-start gap-5 flex w-full">
            <SvgoUpload class="h-12" />
            <div class="w-full flex-col justify-between items-start gap-5 flex">
              <div class="w-full">
                <p class="text-gray-900 text-base font-medium leading-normal">
                  Job Title
                </p>
                <p class="text-gray-600 text-sm font-normal leading-tight">
                  Company name
                </p>
              </div>

              <div
                class="justify-between w-full xl:items-center gap-4 flex lg:flex-col xl:flex-row"
              >
                <div class="flex items-center space-x-1.5">
                  <SvgoClock class="h-5" />
                  <p class="text-gray-600 text-sm font-medium leading-tight">
                    Full-time
                  </p>
                </div>
                <div class="flex items-center space-x-1.5">
                  <SvgoCurrencyDollar class="h-5" />
                  <p class="text-gray-600 text-sm font-medium leading-tight">
                    80k - 100k
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="block lg:max-w-sm p-4 border border-gray-200 rounded-lg shadow"
        >
          <div class="flex-col items-start gap-5 flex w-full">
            <div class="w-full flex-col justify-between items-start gap-5 flex">
              <div class="w-full">
                <p class="text-gray-900 text-base font-medium leading-normal">
                  We Care
                </p>
                <div class="">
                  <span
                    class="text-slate-600 text-xs font-normal leading-[18px]"
                    >We donate a percentage of job posting revenue to classroom
                    projects through our partnership</span
                  ><span
                    class="text-gray-600 text-sm font-normal leading-tight"
                  >
                  </span
                  ><span
                    class="text-brand-500 text-xs font-normal underline leading-[18px]"
                  >
                    DonorsChoose.org.</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <BaseButton
          label="Post a Job for $49"
          :outline="true"
          color="primary"
          full-sized
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss"></style>
