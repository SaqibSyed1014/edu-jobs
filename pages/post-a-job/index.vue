<script setup lang="ts">
import * as Yup from "yup";
import { Form, useForm, ErrorMessage, Field } from "vee-validate";

const currentStep = ref(0);

const steps = ref([
  { name: "Organization Information", href: "/post-a-job", status: "current" },
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

const jobRoles = ref(["Role 1", "Role 2"]);
const grades = ref(["Grade 1", "Grade 2"]);
const subjects = ref(["English", "Math"]);
const paymentType = ref(["Cash", "Card"]);
const appMethods = ref(["Email", "Text"]);

const schemas = [
  Yup.object().shape({
    schoolName: Yup.string()
      .min(10, "Please enter a name that is at least 10 characters long")
      .required("Organization Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    fullName: Yup.string().required("Full Name is required"),
  }),
  Yup.object().shape({
    jobTitle: Yup.string().required("Job Title is required"),
    employment: Yup.string().required("Employment Type is required"),
    jobRole: Yup.string().required("Job Role is required"),
    gradeLevel: Yup.string().required("Grade Level(s) is required"),
    paymentType: Yup.string().required("Payment Type is required"),
    paymentRange: Yup.string().required("Payment Range is required"),
    subjects: Yup.string().required("Subject Area(s) is required"),
    startDate: Yup.string().required("Start Date is required"),
  }),
  Yup.object().shape({
    applicationMethod: Yup.string().required(
      "You must choose your application method"
    ),
    detail: Yup.string().required("Please enter detail"),
    deadlineDate: Yup.string().required("Please enter Date"),
  }),
  // Yup.object().shape({
  //   terms: Yup.bool().required().equals([true]),
  // }),
];

const currentSchema = computed(() => {
  return schemas[currentStep.value];
});
const { handleSubmit } = useForm();

function next() {
  if (currentStep.value >= 3) {
    currentStep.value++;
  }
}
// const instValue = ref({schoolName?: str});
const inputValues = ref<{}>({});

function nextStep(values: any) {
  if (currentStep.value === 2) {
    inputValues.value = values;
  }
  if (currentStep.value === 3) {
    console.log("Done: ", JSON.stringify(values, null, 2));
    return;
  }

  currentStep.value++;
}

function prevStep() {
  if (currentStep.value <= 0) {
    return;
  }

  currentStep.value--;
}
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
    {{ currentStep }}
    <hr class="border-b border-gray-200 mt-5" />
    <Form
      @submit="nextStep"
      v-slot="{ errors, values }"
      :validation-schema="currentSchema"
      keep-values
      class="flex flex-col lg:flex-row justify-between gap-8"
    >
      <Stepper
        :steps="steps"
        :currentStep="currentStep"
        class="w-1/5 pt-8 border-r border-gray-200"
      />

      <!-- {{ schema }} -->
      <div class="w-full lg:w-3/5 pt-8">
        <div class="">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-lg font-semibold leading-7 text-gray-900">
                Organization Information
              </h2>
              <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
                Please fill the fields below regarding institution information.
              </p>
            </div>
            <SvgoRing14 class="h-14 lg:hidden" />
          </div>
          <div
            v-if="currentStep === 0"
            class="mt-5 space-y-8 border-b border-gray-900/10 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0"
          >
            <TextInput
              name="schoolName"
              type="text"
              label="Organization Name*"
              placeholder="e.g. Unified School District"
              subLabel=""
              className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6"
            />

            <div
              class="sm:grid sm:grid-cols-3 sm:items-center sm:gap-4 sm:py-6"
            >
              <label
                for="username"
                class="block text-sm font-semibold text-gray-700 sm:pt-1.5"
                >Organization Logo/Icon <br />
                <span
                  class="w-[228px] text-slate-600 text-sm font-normal leading-normal"
                  >This will be displayed on your profile.
                </span>
              </label>
              <div class="mt-2 sm:col-span-2 sm:mt-0">
                <div class="flex flex-col md:flex-row items-start gap-x-5">
                  <SvgoUpload class="h-12" />
                  <div class="mt-2 sm:mt-0 w-full">
                    <div
                      class="flex w-full justify-center rounded-lg border border-gray-200 px-6 py-3.5"
                    >
                      <div
                        class="text-center flex flex-col justify-center items-center"
                      >
                        <SvgoFileUpload class="h-10 w-10" />
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

          <div v-if="currentStep === 1" class="w-full pt-8">
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
                  <DatePicker name="startDate" />
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
                        value="Full-time"
                        class="h-5 w-5"
                      />
                      <label
                        for="Full-time"
                        class="ms-2 text-sm font-medium text-gray-900"
                        >Full-time</label
                      >
                    </div>
                    <div class="flex items-center">
                      <Field
                        name="employment"
                        type="radio"
                        value="Part-time"
                        class="h-5 w-5"
                      />
                      <label
                        for="Part-time"
                        class="ms-2 text-sm font-medium text-gray-900"
                        >Part-time</label
                      >
                    </div>
                    <div class="flex items-center">
                      <Field
                        name="employment"
                        type="radio"
                        value="Contractor"
                        class="h-5 w-5"
                      />
                      <label
                        for="Contractor"
                        class="ms-2 text-sm font-medium text-gray-900"
                        >Contractor</label
                      >
                    </div>
                    <div class="flex items-center">
                      <Field
                        name="employment"
                        type="radio"
                        value="Intern"
                        class="h-5 w-5"
                      />
                      <label
                        for="Intern"
                        class="ms-2 text-sm font-medium text-gray-900"
                        >Intern</label
                      >
                    </div>

                    <div class="flex items-center">
                      <Field
                        name="employment"
                        type="radio"
                        value="Volunteer"
                        class="h-5 w-5"
                      />
                      <label
                        for="Volunteer"
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
              {{ errors }}
              <div>
                <SelectBox
                  name="paymentType"
                  label="Payment Type"
                  :data="paymentType"
                  subLabel=""
                  className="sm:grid xl:grid-cols-3 xl:items-start gap-1.5 xl:gap-4 py-4 xl:py-6"
                />

                <PayRangeSelectBox
                  name="paymentRange"
                  label="Pay Range"
                  :data="['1', '2']"
                  :data2="['2', '2']"
                  subLabel="(USD)"
                  className="sm:grid xl:grid-cols-3 xl:items-start gap-1.5 xl:gap-4 py-4 xl:py-6"
                />
              </div>

              <SelectBox
                name="jobRole"
                label="Job Role"
                :data="jobRoles"
                subLabel=""
                className="sm:grid xl:grid-cols-3 xl:items-start gap-1.5 xl:gap-4 py-4 xl:py-6"
              />

              <SelectBox
                name="gradeLevel"
                label="Grade Level(s)"
                :data="grades"
                subLabel=""
                className="sm:grid xl:grid-cols-3 xl:items-start gap-1.5 xl:gap-4 py-4 xl:py-6"
              />

              <SelectBox
                name="subjects"
                label="Subject Area(s)"
                :data="subjects"
                subLabel=""
                className="sm:grid xl:grid-cols-3 xl:items-start gap-1.5 xl:gap-4 py-4 xl:py-6"
              />

              <div
                class="sm:grid xl:grid-cols-3 xl:items-start gap-1.5 xl:gap-4 py-4 xl:py-6"
              >
                <label
                  for="jobDesc"
                  class="block text-sm font-medium md:font-semibold text-gray-700 sm:pt-1.5"
                >
                  Job Description
                </label>
                <div class="mt-2 sm:col-span-2 sm:mt-0">
                  <quill-editor theme="snow" style="min-height: 102px" />
                </div>
              </div>
            </div>
          </div>

          <div v-if="currentStep === 2" class="w-full pt-8">
            <div
              class="mt-5 space-y-0 border-b border-gray-900/10 divide-y divide-gray-900/10 border-t sm:pb-0"
            >
              <SelectBox
                name="applicationMethod"
                label="Your work Application method"
                :data="appMethods"
                subLabel="“Please choose how you would like to receive job applications
                when candidates apply"
                :errorMessage="errors.applicationMethod"
                className="sm:grid xl:grid-cols-3 xl:items-start gap-1.5 xl:gap-4 py-4 xl:py-6"
              />
              <HttpInput
                name="detail"
                type="text"
                label="Enter detail"
                placeholder="example.com/apply-here"
                subLabel=""
                className="sm:grid xl:grid-cols-3 xl:items-start gap-1.5 xl:gap-4 py-4 xl:py-6"
              />

              <div
                class="xl:grid xl:grid-cols-3 xl:items-start xl:gap-8 py-4 sm:py-5"
              >
                <label
                  for="date"
                  class="block text-sm font-semibold text-gray-700 sm:pt-1.5"
                >
                  Application deadline date
                </label>
                <div class="mt-2 sm:col-span-2 relative">
                  <DatePicker name="deadlineDate" />
                </div>
              </div>
            </div>
          </div>

          <div v-if="currentStep === 3" class="w-full pt-8">
            <ReviewInformation :inputValues="inputValues" />
          </div>
          <div
            class="flex flex-col md:flex-row items-end justify-end gap-3 mt-4 md:mt-0"
          >
            <div class="w-full md:w-fit">
              <BaseButton
                label="Back"
                color="brand"
                class="md:mt-5 md:mb-8"
                :disabled="false"
                v-if="currentStep != 0"
                @click="prevStep"
              />
            </div>
            <div
              class="flex flex-col md:flex-row justify-end gap-3 md:pt-5 md:pb-8 w-full md:w-fit"
            >
              <BaseButton
                type="button"
                label="Cancel"
                color="gray"
                :disabled="false"
                :outline="true"
                class="order-2 md:order-1"
              />

              <BaseButton
                label="Next"
                color="primary"
                type="submit"
                :disabled="false"
                v-if="currentStep !== 3"
                class="order-1 md:order-2"
              />

              <BaseButton
                label="Next"
                color="primary"
                type="submit"
                :disabled="false"
                v-if="currentStep === 3"
                class="order-1 md:order-2"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="w-full lg:w-1/5 flex flex-col gap-4 md:pt-8">
        <div
          class="block lg:max-w-sm p-4 border border-gray-200 rounded-lg shadow"
        >
          <p class="text-gray-900 text-base font-medium">Order Summary</p>
          <div class="w-full mt-5">
            <div class="flex items-start justify-between gap-4">
              <p class="text-gray-600 text-sm font-medium">Job posting fee</p>
              <p class="text-gray-900 text-sm font-medium">$49</p>
            </div>
            <hr class="border-b border-gray-200 my-3 w-full" />
            <div class="flex items-center justify-between gap-4">
              <p class="text-gray-600 text-sm font-medium">Total</p>
              <p class="text-gray-900 text-lg font-semibold leading-7">$49</p>
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
                  {{ values?.jobTitle ? values?.jobTitle : "Job Title" }}
                </p>
                <p class="text-gray-600 text-sm font-normal leading-tight">
                  {{ values?.schoolName ? values?.schoolName : "Company name" }}
                </p>
              </div>
              <div
                class="justify-between w-full xl:items-center gap-4 flex lg:flex-col xl:flex-row"
              >
                <div class="flex items-center space-x-1.5">
                  <SvgoClock class="h-5" />
                  <p class="text-gray-600 text-sm font-medium leading-tight">
                    {{ values?.employment ? values?.employment : "Full-time" }}
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
          :disabled="false"
        />
      </div>
    </Form>
  </div>
</template>

<style scoped lang="postcss"></style>
