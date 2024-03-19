<script setup lang="ts">
import UploadImageIcon from "~/assets/icons/upload.svg";
import ClockIcon from "~/assets/icons/clock.svg";
import DollarIcon from "~/assets/icons/currency-dollar.svg";
import StepRing from "~/assets/icons/ring-2-4.svg";
import CalendarSvg from "~/assets/icons/calendar.svg";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import * as Yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

const steps = ref([
  { name: "District Information", href: "/post-a-job", status: "complete" },
  { name: "Job Details", href: "/post-a-job/job-details", status: "current" },
  {
    name: "Application Details",
    href: "/post-a-job/application-details",
    status: "upcoming",
  },
  {
    name: "Review Information",
    href: "/post-a-job/review-information",
    status: "upcoming",
  },
]);

const date = ref();
const message = ref("");
const format = (date: any) => {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const router = useRouter();
function onSubmit(values: any) {
  console.log("🚀 ~ onSubmit ~ values:", values);
  //   router.push({
  //     path: "/post-a-job/job-details",
  //   });
  // alert(JSON.stringify(values, null, 2));
}

// Using yup to generate a validation schema
// https://vee-validate.logaretm.com/v4/guide/validation#validation-schemas-with-yup
const schema = Yup.object().shape({
  jobTitle: Yup.string().required("Please enter the job title"),
  date: Yup.string().required("Please enter the date title"),
  employment: Yup.string().required("You must choose an employment type"),

  //   email: Yup.string().email().required("Your Email Address is required"),
  //   fullName: Yup.string().required("Your Full Name is required"),
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
              Job Details
            </h2>
            <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
              Please fill the fields below regarding job information.
            </p>
          </div>
          <StepRing class="h-14 lg:hidden" />
        </div>
        <Form
          @submit="onSubmit"
          :validation-schema="schema"
          v-slot="{ values }"
        >
          <div
            class="mt-5 border-b border-gray-900/10 divide-y divide-gray-900/10 border-t pb-0"
          >
            <TextInput
              name="jobTitle"
              type="text"
              label="Job Title"
              placeholder="e.g. Project Manager"
              subLabel=""
              className="sm:grid xl:grid-cols-3 xl:items-start gap-1.5 xl:gap-4 py-4 xl:py-6"
            />

            <div
              class="sm:grid xl:grid-cols-3 xl:items-start gap-1.5 xl:gap-4 py-4 xl:py-6"
            >
              <label
                for="date"
                class="block text-sm font-semibold text-gray-700 sm:pt-1.5"
              >
                Start Date
              </label>
              <div class="mt-2 sm:col-span-2 sm:mt-0 relative">
                <VueDatePicker
                  v-model="date"
                  :format="format"
                  placeholder="March 25, 2024"
                />
                <CalendarSvg class="absolute h-5 bottom-3 right-3" />
              </div>
            </div>

            <div
              class="sm:grid xl:grid-cols-3 xl:items-start gap-1.5 xl:gap-4 py-4 xl:py-6"
            >
              <label
                for="employment"
                class="block text-sm font-semibold text-gray-700 sm:pt-1.5"
              >
                Employment Type
              </label>
              <div class="mt-2 sm:col-span-2 sm:mt-0">
                <div class="flex flex-col gap-4">
                  <div class="flex items-center">
                    <Field
                      name="employment"
                      type="radio"
                      value="full-time"
                      class="h-5 w-5"
                    />
                    <label
                      for="full-time"
                      class="ms-2 text-sm font-medium text-gray-900"
                      >Full-time</label
                    >
                  </div>
                  <div class="flex items-center">
                    <Field
                      name="employment"
                      type="radio"
                      value="part-time"
                      class="h-5 w-5 !border !border-gray-300"
                    />
                    <label
                      for="part-time"
                      class="ms-2 text-sm font-medium text-gray-900"
                      >Part-time</label
                    >
                  </div>
                  <div class="flex items-center">
                    <Field
                      name="employment"
                      type="radio"
                      value="contractor"
                      class="h-5 w-5"
                    />
                    <label
                      for="contractor"
                      class="ms-2 text-sm font-medium text-gray-900"
                      >Contractor</label
                    >
                  </div>
                  <div class="flex items-center">
                    <Field
                      name="employment"
                      type="radio"
                      value="intern"
                      class="h-5 w-5"
                    />
                    <label
                      for="intern"
                      class="ms-2 text-sm font-medium text-gray-900"
                      >Intern</label
                    >
                  </div>

                  <div class="flex items-center">
                    <Field
                      name="employment"
                      type="radio"
                      value="volunteer"
                      class="h-5 w-5"
                    />
                    <label
                      for="volunteer"
                      class="ms-2 text-sm font-medium text-gray-900"
                      >Volunteer</label
                    >
                  </div>
                </div>
                <ErrorMessage
                  class="text-red-500 text-sm font-normal leading-tight"
                  name="employment"
                />
              </div>
            </div>

            <div
              class="sm:grid xl:grid-cols-3 xl:items-start gap-1.5 xl:gap-4 py-4 xl:py-6"
            >
              <label
                for="jobrole"
                class="block text-sm font-semibold text-gray-700 sm:pt-1.5"
              >
                Job Role
              </label>
              <div class="mt-2 sm:col-span-2 sm:mt-0">
                <select
                  id="countries"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-[11px] px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected>Select</option>
                  <option value="US">...</option>
                </select>
              </div>
            </div>

            <div
              class="sm:grid xl:grid-cols-3 xl:items-start gap-1.5 xl:gap-4 py-4 xl:py-6"
            >
              <label
                for="gradelevel"
                class="block text-sm font-semibold text-gray-700 sm:pt-1.5"
              >
                Grade Level(s)
              </label>
              <div class="mt-2 sm:col-span-2 sm:mt-0">
                <select
                  id="countries"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-[11px] px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected>Select</option>
                  <option value="US">...</option>
                </select>
              </div>
            </div>

            <div
              class="sm:grid xl:grid-cols-3 xl:items-start gap-1.5 xl:gap-4 py-4 xl:py-6"
            >
              <label
                for="subjects"
                class="block text-sm font-semibold text-gray-700 sm:pt-1.5"
              >
                Subject Area(s)
              </label>
              <div class="mt-2 sm:col-span-2 sm:mt-0">
                <select
                  id="countries"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-[11px] px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected>Select</option>
                  <option value="US">...</option>
                </select>
              </div>
            </div>

            <div
              class="sm:grid xl:grid-cols-3 xl:items-start gap-1.5 xl:gap-4 py-4 xl:py-6"
            >
              <label
                for="jobdescription"
                class="block text-sm font-semibold text-gray-700 sm:pt-1.5"
              >
                Job Description
              </label>
              <div class="mt-2 sm:col-span-2 sm:mt-0">
                <textarea
                  id="message"
                  v-model="message"
                  rows="4"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter a description.."
                  maxlength="50"
                ></textarea>
                <div
                  class="text-gray-600 text-sm font-normal leading-tight pt-1.5"
                >
                  {{ 40 - message.length }} words left
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
                navigate-to="/post-a-job"
                class="md:mt-5 md:mb-8"
              />
            </div>
            <div
              class="flex flex-col md:flex-row justify-end gap-3 md:pt-5 md:pb-8 w-full md:w-fit"
            >
              <BaseButton
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
        </Form>
      </div>

      <div class="w-full lg:w-1/5 flex flex-col gap-4 md:pt-8">
        <div
          class="block lg:max-w-sm p-4 border border-gray-200 rounded-lg shadow"
        >
          <p class="text-gray-900 text-base font-medium">Order Summary</p>
          <div class="w-full mt-5">
            <div class="flex items-start justify-between gap-4">
              <p class="text-gray-600 text-sm font-medium">Job posting fee</p>
              <p class="text-gray-900 text-sm font-medium">$200</p>
            </div>
            <hr class="border-b border-gray-200 my-3 w-full" />
            <div class="flex items-center justify-between gap-4">
              <p class="text-gray-600 text-sm font-medium">Total</p>
              <p class="text-gray-900 text-lg font-semibold leading-7">$200</p>
            </div>
          </div>
        </div>

        <div
          class="hidden md:block lg:max-w-sm p-4 border border-gray-200 rounded-lg shadow"
        >
          <div class="flex-col items-start gap-5 flex w-full">
            <UploadImageIcon class="h-12" />
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
          label="Post a Job for $200"
          :outline="true"
          color="primary"
          full-sized
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss"></style>
