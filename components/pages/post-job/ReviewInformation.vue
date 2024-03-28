<script setup lang="ts">
import { Tooltip } from "flowbite";

defineProps<{ inputValues: Object }>();

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
          <div class="flex-col justify-start items-start gap-2 inline-flex">
            <div class="inline-flex items-center gap-1">
              <p class="text-slate-700 text-base font-semibold leading-normal">
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

            <p class="text-slate-600 text-base font-normal leading-normal">
              {{ inputValues?.schoolName ? inputValues?.schoolName : "N/a" }}
            </p>
          </div>
        </div>
        <div class="justify-start items-start gap-8 inline-flex">
          <div class="flex-col justify-start items-start gap-2 inline-flex">
            <p class="text-slate-700 text-base font-semibold leading-normal">
              Your work email address
            </p>
            <p class="text-slate-600 text-base font-normal leading-normal">
              {{ inputValues?.email ? inputValues?.email : "N/a" }}
            </p>
          </div>
        </div>
      </div>

      <div class="grid sm:grid-cols-2 gap-4 w-full">
        <div class="justify-start items-start gap-8 inline-flex">
          <div class="flex-col justify-start items-start gap-2 inline-flex">
            <p class="text-slate-700 text-base font-semibold leading-normal">
              Your full name
            </p>
            <p class="text-slate-600 text-base font-normal leading-normal">
              {{ inputValues?.fullName ? inputValues?.fullName : "N/a" }}
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
          <div class="flex-col justify-start items-start gap-2 inline-flex">
            <p class="text-slate-700 text-base font-semibold leading-normal">
              Job Title
            </p>
            <p class="text-slate-600 text-base font-normal leading-normal">
              {{ inputValues?.jobTitle ? inputValues?.jobTitle : "N/a" }}
            </p>
          </div>
        </div>
        <div class="justify-start items-start gap-8 inline-flex">
          <div class="flex-col justify-start items-start gap-2 inline-flex">
            <p class="text-slate-700 text-base font-semibold leading-normal">
              Start Date
            </p>
            <p class="text-slate-600 text-base font-normal leading-normal">
              {{ inputValues?.startDate ? inputValues?.startDate : "N/a" }}
            </p>
          </div>
        </div>
      </div>

      <div class="grid sm:grid-cols-2 gap-4 w-full">
        <div class="justify-start items-start gap-8 inline-flex">
          <div class="flex-col justify-start items-start gap-2 inline-flex">
            <p class="text-slate-700 text-base font-semibold leading-normal">
              Employment Type
            </p>
            <p class="text-slate-600 text-base font-normal leading-normal">
              {{ inputValues?.employment ? inputValues?.employment : "N/a" }}
            </p>
          </div>
        </div>

        <div class="justify-start items-start gap-8 inline-flex">
          <div class="flex-col justify-start items-start gap-2 inline-flex">
            <p class="text-slate-700 text-base font-semibold leading-normal">
              Job Role
            </p>
            <p class="text-slate-600 text-base font-normal leading-normal">
              {{ inputValues?.jobRole ? inputValues?.jobRole : "N/a" }}
            </p>
          </div>
        </div>
      </div>

      <div class="grid sm:grid-cols-2 gap-4 w-full">
        <div class="justify-start items-start gap-8 inline-flex">
          <div class="flex-col justify-start items-start gap-2 inline-flex">
            <p class="text-slate-700 text-base font-semibold leading-normal">
              Grade Level(s)
            </p>
            <p class="text-slate-600 text-base font-normal leading-normal">
              {{ inputValues?.gradeLevel ? inputValues?.gradeLevel : "N/a" }}
            </p>
          </div>
        </div>

        <div class="justify-start items-start gap-8 inline-flex">
          <div class="flex-col justify-start items-start gap-2 inline-flex">
            <p class="text-slate-700 text-base font-semibold leading-normal">
              Subject Area(s)
            </p>
            <p class="text-slate-600 text-base font-normal leading-normal">
              {{ inputValues?.subjects ? inputValues?.subjects : "N/a" }}
            </p>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-4 w-full">
        <div class="justify-start items-start gap-8 inline-flex">
          <div class="flex-col justify-start items-start gap-2 inline-flex">
            <p class="text-slate-700 text-base font-semibold leading-normal">
              Job Description
            </p>
            <p class="text-slate-600 text-base font-normal leading-normal">
              Dynamic Project Manager adept at orchestrating complex projects
              from initiation to completion. Skilled in strategic planning,
              resource allocation, and team leadership. Proven track record of
              delivering high-quality results within deadlines and budgets.
              Effective communicator, collaborator, and problem-solver, ensuring
              seamless project execution. Expertise in Agile methodologies and
              project management tools. Ready to drive success in a
              collaborative and challenging environment.
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
          <div class="flex-col justify-start items-start gap-2 inline-flex">
            <p class="text-slate-700 text-base font-semibold leading-normal">
              Application method
            </p>
            <p class="text-slate-600 text-base font-normal leading-normal">
              {{
                inputValues?.applicationMethod
                  ? inputValues?.applicationMethod
                  : "N/a"
              }}
            </p>
          </div>
        </div>
        <div class="justify-start items-start gap-8 inline-flex">
          <div class="flex-col justify-start items-start gap-2 inline-flex">
            <p class="text-slate-700 text-base font-semibold leading-normal">
              Enter details
            </p>
            <p class="text-slate-600 text-base font-normal leading-normal">
              https://example.com/apply-here
            </p>
          </div>
        </div>
      </div>

      <div class="grid sm:grid-cols-2 gap-4 w-full">
        <div class="justify-start items-start gap-8 inline-flex">
          <div class="flex-col justify-start items-start gap-2 inline-flex">
            <p class="text-slate-700 text-base font-semibold leading-normal">
              Application deadline date
            </p>
            <p class="text-slate-600 text-base font-normal leading-normal">
              {{
                inputValues?.deadlineDate ? inputValues?.deadlineDate : "N/a"
              }}
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
          <div class="flex-col justify-start items-start gap-2 inline-flex">
            <p class="text-slate-700 text-base font-semibold leading-normal">
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
</template>

<style scoped lang="postcss"></style>
