<script setup lang="ts">
import { CheckIcon } from "@heroicons/vue/20/solid";
import UploadImageIcon from "~/assets/icons/upload.svg";
import ClockIcon from "~/assets/icons/clock.svg";
import DollarIcon from "~/assets/icons/currency-dollar.svg";
import FileUpload from "~/assets/icons/file-upload.svg";
import Step1Ring from "~/assets/icons/ring-1-4.svg";
import * as Yup from "yup";
import { Form } from "vee-validate";

const steps = ref([
  { name: "District Information", href: "/post-a-job", status: "current" },
  { name: "Job Details", href: "/post-a-job/job-details", status: "upcoming" },
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
const router = useRouter();
function onSubmit(values: any) {
  console.log("🚀 ~ onSubmit ~ values:", values);
  router.push({
    path: "/post-a-job/job-details",
  });
  // alert(JSON.stringify(values, null, 2));
}

// Using yup to generate a validation schema
// https://vee-validate.logaretm.com/v4/guide/validation#validation-schemas-with-yup
const schema = Yup.object().shape({
  schoolName: Yup.string()
    .min(10)
    .required("Please enter the name that is at least 10 characters long "),
  email: Yup.string().email().required("Your Email Address is required"),
  fullName: Yup.string().required("Your Full Name is required"),
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
      <UInput color="primary" variant="outline" placeholder="Search..." />
    </div>

    <hr class="border-b border-gray-200 mt-5" />
    <div class="flex flex-col lg:flex-row justify-between gap-8">
      <Stepper :steps="steps" class="w-1/5 pt-8 border-r border-gray-200" />
      <Form
        @submit="onSubmit"
        :validation-schema="schema"
        class="w-full lg:w-3/5 pt-8"
      >
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-lg font-semibold leading-7 text-gray-900">
              District Information
            </h2>
            <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
              Please fill the fields below regarding district information.
            </p>
          </div>
          <Step1Ring class="h-14 lg:hidden" />
        </div>
        <div
          class="mt-5 space-y-8 border-b border-gray-900/10 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0"
        >
          <TextInput
            name="schoolName"
            type="text"
            label="School district name*"
            placeholder="e.g. Unified School District"
            subLabel=""
            className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6"
          />

          <div class="sm:grid sm:grid-cols-3 sm:items-center sm:gap-4 sm:py-6">
            <label
              for="username"
              class="block text-sm font-semibold text-gray-700 sm:pt-1.5"
              >Your photo <br />
              <span
                class="w-[228px] text-slate-600 text-sm font-normal leading-normal"
                >This will be displayed on your profile.
              </span>
            </label>
            <div class="mt-2 sm:col-span-2 sm:mt-0">
              <div class="flex flex-col md:flex-row items-start gap-x-5">
                <UploadImageIcon class="h-12" />
                <div class="mt-2 sm:mt-0 w-full">
                  <div
                    class="flex w-full justify-center rounded-lg border border-gray-200 px-6 py-3.5"
                  >
                    <div
                      class="text-center flex flex-col justify-center items-center"
                    >
                      <FileUpload class="h-10 w-10" />
                      <div
                        class="mt-4 flex text-sm leading-6 text-center justify-center items-center text-gray-600"
                      >
                        <label
                          for="file-upload"
                          class="relative cursor-pointer rounded-md bg-white font-semibold text-brand-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-brand-600 focus-within:ring-offset-2 hover:text-brand-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            class="sr-only"
                          />
                        </label>
                        <p class="pl-1">or drag and drop</p>
                      </div>
                      <p class="text-xs leading-5 text-gray-600">
                        SVG, PNG, JPG or GIF (max. 800x400px)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            class="mt-5 space-y-8 divide-b divide-gray-900/10 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0"
          >
            <TextInput
              name="email"
              type="email"
              label="Your work email address*"
              placeholder="example@edujobs.com"
              subLabel="Used to send you an email confirmation"
              className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6"
            />
          </div>

          <div
            class="mt-5 space-y-8 border-b border-gray-900/10 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0"
          >
            <TextInput
              name="fullName"
              type="text"
              label="Your full name*"
              placeholder="John Doe"
              subLabel=""
              className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6"
            />
          </div>
        </div>
        <div class="flex flex-col md:flex-row justify-end gap-3 pt-5 md:pb-8">
          <BaseButton
            label="Cancel"
            color="gray"
            :outline="true"
            class="order-2 md:order-1"
          />
          <BaseButton label="Next" color="primary" class="order-1 md:order-2" />
        </div>
      </Form>

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
