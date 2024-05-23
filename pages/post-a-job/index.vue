<script setup lang="ts">
import * as Yup from "yup";
import { Form, useForm, ErrorMessage, Field } from "vee-validate";
import { Tooltip } from "flowbite";
import { usePostjobStore } from "~/segments/postjobs/store";

const postJobStore = usePostjobStore();
const {
  gradeLevelDropdown,
  subjectsDropdown,
  experienceLevelOptions
} = storeToRefs(postJobStore);

const currentStep = ref(1);
const jobRoles = ref(["Instructional", "Non-instructional"]);
const subjects = ref(["English", "Math"]);
const paymentType = ref(["Cash", "Card"]);
const appMethods = ref(["Email", "Text"]);
const jobDesc = ref("");
const postjobStore = usePostjobStore();
const { content,status } = storeToRefs(postjobStore);
const isLoading = ref<boolean>(false);
const router = useRouter();
const startDate = ref(new Date());
const errorMessage = ref(false);
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],
  ["link", "image", "video", "formula"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean"], // remove formatting button
];

const options = ref({
  modules: {
    toolbar: toolbarOptions,
  },
  readOnly: false,
});

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

const unwatch = watch(currentStep, (newValue: number, oldValue: number) => {
  if (oldValue === 0 && newValue === 1) {
    // Update the status of Organization Information to 'complete'
    steps.value[0].status = "complete";
    steps.value[1].status = "current";
  } else if (oldValue === 1 && newValue === 2) {
    // Update the status of Job Details to 'complete'
    steps.value[1].status = "complete";
    steps.value[2].status = "current";
  } else if (oldValue === 2 && newValue === 3) {
    // Update the status of Application Details to 'complete'
    steps.value[2].status = "complete";
    steps.value[3].status = "complete";
    unwatch(); // Stop watching for further changes
  }
});


Yup.addMethod(Yup.string, 'emailDomain', function (message) {
  return this.test('email-domain', message, function (value) {
    const { path, createError } = this;

    if (!value) {
      return true; // Skip validation if the value is empty, let required handle it
    }

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); // Standard email regex
    const hasCorrectDomain = value.includes('@') && value.endsWith('.com');

    if (isValidEmail && hasCorrectDomain) {
      return true;
    }

    return createError({ path, message: message || 'Email must be valid and end with ".com"' });
  });
});

const schemas = [
  Yup.object().shape({
    organizationName: Yup.string()
      .min(10, "Please enter a name that is at least 10 characters long")
      .required("Organization Name is required"),
      email: Yup.string().email('Invalid email')
    .required('Email is required')
    .emailDomain('Email must contain "@" and end with ".com" not a valid'),
    fullName: Yup.string().required("Full Name is required"),
  }),
  Yup.object().shape({
    jobTitle: Yup.string().required("Job Title is required"),
    employment: Yup.string().required("Employment Type is required"),
    experience: Yup.string().required("Experience Level is required"),
    jobRole: Yup.string().required("Job Role is required"),
    gradeLevel: Yup.string().required("Grade Level(s) is required"),
    paymentType: Yup.string().required("Payment Type is required"),
    startRange: Yup.string().required("Start Range is required"),
    endRange: Yup.string().required("End Range is required"),
    subjects: Yup.string().required("Subject Area(s) is required"),
    startDate: Yup.string().required("Start Date is required"),
  }),
  Yup.object().shape({
    applicationMethod: Yup.string().required(
      "You must choose your application method"
    ),
    detail: Yup.string()
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        "Enter correct url!"
      )
      .required("Please enter detail"),
    deadlineDate: Yup.string().required("Please enter Date"),
  }),
  Yup.object().shape({
    terms: Yup.bool().required("Terms are required").equals([true]),
  }),
];

const uploadedImage = ref("");

// Function to handle image upload
const handleImageUpload = (event: any) => {
  const file = event.target.files[0];
  if (file) {
    // Read the uploaded file as a data URL
    const reader = new FileReader();
    reader.onload = (e: any) => {
      // Set the uploaded image URL to the state variable
      uploadedImage.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};
  const email = ref<string>('');
  const organiName = ref<string>('');
  const name = ref<string>('');
// Function to handle checkout payment
async function checkout () {

  isLoading.value = true;
  const requestBody = {
        email : email.value,
        price_id : 'price_1P0v2M00kiM97A5ms79o8u4q',
        fullname : name.value,
        organizationName: organiName.value,
        price : 123,
    };

  console.log('check ', requestBody)

  await postjobStore.fetchPayment(null,requestBody);

  console.log('check chekout func content', content?.value?.url )
  console.log('check chekout func status', status?.value)

  if(status?.value === '200'){

    window.open (content?.value?.url);
    postjobStore.reset()
    //postjobStore.$reset();

  } else {
    useNuxtApp().$toast.error("Failed To make Payment");
  }
  isLoading.value = false;
  //totalPages.value = total_page?.value;

}
const currentSchema = computed(() => {
  return schemas[currentStep.value];
});

function nextStep(values: any) {
  if (currentStep.value === 3) {
    console.log("Done: ", JSON.stringify(values, null, 2));
    return;
  }
  // Check if jobDesc is empty
  if (currentStep.value === 1 && !jobDesc.value.trim()) {
    // If jobDesc is empty, set errorMessage to true
    errorMessage.value = true;
    return; // Prevent proceeding to the next step
  }
  errorMessage.value = false;
  // Proceed to the next step if jobDesc is not empty
  currentStep.value++;
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function prevStep() {
  if (currentStep.value <= 0) {
    return;
  }

  currentStep.value--;
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

onMounted(async() => {
  await Promise.all([
    postJobStore.fetchGradeLevels(),
    postJobStore.fetchSubjects(),
    postJobStore.fetchExperienceLevels()
  ])

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
// const currentStep = ref(props.currentStep);

// Function to handle button click
function handleButtonClick(e: number) {
  // Update currentStep value
  currentStep.value = e;
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Watch for changes in currentStep prop
watch(
  () => currentStep.value,
  (newValue: number) => {
    currentStep.value = newValue;
  }
);

function changeStep(stepIdx: number) {
  currentStep.value = stepIdx;
  // nextStep(currentStep.value)
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function handleStepClick() {
  useNuxtApp().$toast.error("Please Fill the Form");
}

const selectedCompensation = ref('salary');

const salaryRange = [
  "$20,000", "$25,000", "$30,000", "$35,000", "$40,000",
  "$45,000", "$50,000", "$55,000", "$60,000", "$65,000",
  "$70,000", "$75,000", "$80,000", "$85,000", "$90,000",
  "$95,000", "$100,000", "$105,000", "$110,000", "$115,000",
  "$120,000", "$125,000", "$130,000", "$135,000", "$140,000",
  "$145,000", "$150,000", "$155,000", "$160,000", "$165,000",
  "$170,000", "$175,000", "$180,000", "$185,000", "$190,000",
  "$195,000", "$200,000"
]

const hourlyRange = [
  "$10", "$15", "$20", "$25", "$30", "$35", "$40", "$45", "$50",
  "$55", "$60", "$65", "$70", "$75", "$80", "$85", "$90", "$95",
  "$100", "$105", "$110", "$115", "$120", "$125", "$130", "$135",
  "$140", "$145", "$150"
]

</script>

<template>
  <div class="border-t border-b border-gray-200 mb-10 lg:mb-24">
    <div class="container pt-8">
      <div class="">
        <h2 class="text-2xl lg:text-3xl font-semibold">Post a Job</h2>
        <p class="text-base font-normal">
          Your job post will be pinned to the top and highlighted in relevant
          search results for 30 days.
        </p>
        <UInput color="primary" variant="outline" placeholder="Search..." />
      </div>
      <hr class="border-b border-gray-200 mt-5" />
      <Form
        @submit="nextStep"
        v-slot="{ errors, values }"
        :validation-schema="currentSchema"
        keep-values
        class="flex flex-col md:flex-row justify-between gap-8"
      >
        <!-- {{ errors }} -->

        <div class="hidden xl:block w-1/5 border-r border-gray-200">
          <div class="sticky right-0 top-0 w-full pt-8">
            <div class="flex flex-row justify-between gap-8">
              <nav aria-label="Progress" class="">
                <ol role="list" class="overflow-hidden pl-1 pt-1">
                  <li
                    v-for="(step, stepIdx) in steps"
                    :key="step.name"
                    :class="[
                      stepIdx !== steps.length - 1 ? 'pb-8' : '',
                      'relative flex items-center',
                    ]"
                  >
                    <template v-if="step.status === 'complete'">
                      <div
                        v-if="stepIdx !== steps.length - 1"
                        class="absolute left-[8%] top-3.5 -ml-px mt-7 h-[30%] w-0.5 bg-brand-600"
                        aria-hidden="true"
                      />
                      <div
                        class="group relative flex items-center"
                        :aria-disabled="step.status !== 'complete'"
                      >
                        <SvgoStepComp class="h-9 w-9" />
                      </div>
                    </template>
                    <template v-else-if="step.status === 'current'">
                      <div
                        v-if="stepIdx !== steps.length - 1"
                        class="absolute left-[8%] top-3.5 -ml-px mt-7 h-[30%] w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                      <div
                        class="group relative flex items-center"
                        aria-current="step"
                      >
                        <span
                          class="bg-brand-100 rounded-full h-11 w-11 -left-1 absolute"
                        ></span>
                        <span
                          class="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 border-brand-600 bg-brand-600"
                        >
                          <span class="h-2.5 w-2.5 rounded-full bg-white" />
                        </span>
                      </div>
                    </template>
                    <template v-else>
                      <div
                        v-if="stepIdx !== steps.length - 1"
                        class="absolute left-[8%] top-3.5 mt-7 h-[30%] w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                      <button
                        disabled="true"
                        class="group relative flex items-center"
                      >
                        <span class="flex h-9 items-center" aria-hidden="true">
                          <span
                            class="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 border-gray-200 bg-white group-hover:border-gray-400"
                          >
                            <span
                              class="h-2.5 w-2.5 rounded-full bg-gray-200"
                            />
                          </span>
                        </span>
                      </button>
                    </template>
                    <button
                      v-if="Object.keys(errors).length > 0"
                      type="submit"
                      class="flex flex-col cursor-pointer"
                      @click="currentStep !== stepIdx && handleStepClick()"
                    >
                      <span class="ml-4 flex min-w-0 flex-col">
                        <span
                          :class="
                            currentStep === stepIdx
                              ? 'text-base font-semibold text-brand-700'
                              : 'text-base font-semibold text-gray-700'
                          "
                          >{{ step.name }}</span
                        >
                      </span>
                    </button>
                    <button
                      v-else
                      type="button"
                      @click="
                        step.status === 'complete' || step.status === 'current'
                          ? changeStep(stepIdx)
                          : handleStepClick()
                      "
                      class="flex flex-col cursor-pointer"
                    >
                      <span class="ml-4 flex min-w-0 flex-col">
                        <span
                          :class="
                            currentStep === stepIdx
                              ? 'text-base font-semibold text-brand-700'
                              : 'text-base font-semibold text-gray-700'
                          "
                          >{{ step.name }}</span
                        >
                      </span>
                    </button>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
        <div class="w-full md:w-3/4 xl:w-3/5 pt-8">
          <div class="">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-lg font-semibold leading-7 text-gray-900">
                  {{
                    currentStep === 0
                      ? "Organization Information"
                      : currentStep === 1
                      ? " Job Details"
                      : currentStep === 2
                      ? " Application Details"
                      : currentStep === 3
                      ? " Review Information"
                      : ""
                  }}
                </h2>
                <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
                  {{
                    currentStep === 0
                      ? "Please fill the fields below regarding institution information."
                      : currentStep === 1
                      ? "Please fill the fields below regarding job information."
                      : currentStep === 2
                      ? "Please fill the fields below regarding application details."
                      : currentStep === 3
                      ? "Please review your application before submitting."
                      : ""
                  }}
                </p>
              </div>
              <div>
                <SvgoRing14 v-if="currentStep === 0" class="h-14 xl:hidden" />
                <SvgoRing24
                  v-else-if="currentStep === 1"
                  class="h-14 xl:hidden"
                />
                <SvgoRing34
                  v-else-if="currentStep === 2"
                  class="h-14 xl:hidden"
                />
                <SvgoRing44 v-else class="h-14 xl:hidden" />
              </div>
            </div>
            <div
              v-if="currentStep === 0"
              class="mt-5 space-y-8 border-b border-gray-900/10 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0"
            >
              <TextInput
                name="organizationName"
                type="text"
                v-model="organiName"
                label="Organization Name*"
                placeholder="e.g. Unified School District"
                subLabel=""
                className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6"
              />

              <ImageFileUpload
                label="Organization Logo/Icon"
                subLabel="This will be displayed on your profile."
                :uploaded-image="uploadedImage"
                :handle-image-upload="handleImageUpload"
              />

              <div
                class="mt-5 space-y-8 divide-b divide-gray-900/10 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0"
              >
                <TextInput
                  name="email"
                  type="email"
                  v-model="email"
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
                  v-model="name"
                  label="Your full name*"
                  placeholder="John Doe"
                  subLabel=""
                  className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6"
                />
              </div>
            </div>

            <div v-if="currentStep === 1" class="w-full">
              <div
                class="mt-5 border-b border-gray-900/10 divide-y divide-gray-900/10 border-t"
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
                    <DatePicker
                      v-model="startDate"
                      name="startDate"
                      :values="values.startDate"
                      :error="errors.startDate"
                      @on-input="(date) => startDate = date"
                    />
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
                          class="cursor-pointer"
                        />
                        <label
                          for="Full-time"
                          class="ms-2 text-sm font-medium text-gray-900 cursor-pointer"
                          >Full-time</label>
                      </div>
                      <div class="flex items-center">
                        <Field
                          name="employment"
                          type="radio"
                          value="Part-time"
                          class="cursor-pointer"
                        />
                        <label
                          for="Part-time"
                          class="ms-2 text-sm font-medium text-gray-900 cursor-pointer">
                            Part-time
                        </label>
                      </div>
                      <div class="flex items-center">
                        <Field
                          name="employment"
                          type="radio"
                          value="Contractor"
                          class="cursor-pointer"
                        />
                        <label
                          for="Contractor"
                          class="ms-2 text-sm font-medium text-gray-900 cursor-pointer"
                          >Contractor</label>
                      </div>
                      <div class="flex items-center">
                        <Field
                          name="employment"
                          type="radio"
                          value="Intern"
                          class="cursor-pointer"
                        />
                        <label
                          for="Intern"
                          class="ms-2 text-sm font-medium text-gray-900 cursor-pointer"
                          >Intern</label>
                      </div>

                      <div class="flex items-center">
                        <Field
                          name="employment"
                          type="radio"
                          value="Volunteer"
                          class="cursor-pointer"
                        />
                        <label
                          for="Volunteer"
                          class="ms-2 text-sm font-medium text-gray-900 cursor-pointer"
                          >Volunteer</label>
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
                      for="employment"
                      class="block text-sm font-semibold text-gray-700 sm:pt-1.5"
                  >
                    Experience Level
                  </label>
                  <div class="mt-2 sm:col-span-2 sm:mt-0">
                    <div class="flex flex-col gap-4">
                      <template v-for="(experience, i) in experienceLevelOptions">
                        <div class="flex items-center">
                          <BaseTooltip
                              :id="`exp-rb-${i}`"
                              :tooltip-content="experience.experience_level_description"
                              position="right"
                          >
                            <Field
                                name="experience"
                                type="radio"
                                :value="experience.experience_level"
                                class="cursor-pointer"
                            />
                            <label
                                for="Full-time"
                                class="ms-2 me-1 text-sm font-medium text-gray-900 cursor-pointer"
                            >{{ experience.experience_level }}</label>
                          </BaseTooltip>
                        </div>
                      </template>
                    </div>
                    <ErrorMessage
                        class="text-red-500 text-sm font-normal leading-tight"
                        name="experience"
                    />
                  </div>
                </div>

                <div>
                  <div
                      class="sm:grid xl:grid-cols-3 xl:items-start gap-1.5 xl:gap-4 py-4 xl:py-6"
                  >
                    <label
                        for="employment"
                        class="block text-sm font-semibold text-gray-700 sm:pt-1.5"
                    >
                      Compensation Type
                    </label>
                    <div class="col-span-2">
                      <div class="flex gap-20">
                        <div class="flex gap-3">
                          <Field
                              v-model="selectedCompensation"
                              name="Salary"
                              type="radio"
                              value="salary"
                              class="cursor-pointer"
                          />
                          <label
                              for="salary"
                              class="text-sm font-medium text-gray-900"
                          >Salary</label>
                        </div>
                        <div class="flex gap-3">
                          <Field
                              v-model="selectedCompensation"
                              name="hourly"
                              type="radio"
                              value="hourly"
                              class="cursor-pointer"
                          />
                          <label
                              for="hourly"
                              class="text-sm font-medium text-gray-900"
                          >Hourly</label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <PayRangeSelectBox
                    v-if="selectedCompensation === 'salary'"
                    name="startRange"
                    secondary-name="endRange"
                    label="Salary Range"
                    :data="salaryRange"
                    :data2="salaryRange"
                    subLabel="(USD)"
                    :value="values.startRange"
                    className="sm:grid xl:grid-cols-3 xl:items-start gap-1.5 xl:gap-4 py-4 xl:py-6"
                  />

                  <PayRangeSelectBox
                      v-else-if="selectedCompensation === 'hourly'"
                      name="startRange"
                      secondary-name="endRange"
                      label="Hourly Range"
                      :data="hourlyRange"
                      :data2="hourlyRange"
                      subLabel="(USD)"
                      :value="values.startRange"
                      className="sm:grid xl:grid-cols-3 xl:items-start gap-1.5 xl:gap-4 py-4 xl:py-6"
                  />
                </div>

                <SelectBox
                  name="jobRole"
                  label="Job Role"
                  :data="jobRoles"
                  subLabel=""
                  :value="values.jobRole"
                  className="sm:grid xl:grid-cols-3 xl:items-start gap-1.5 xl:gap-4 py-4 xl:py-6"
                />

                <SelectBox
                  v-if="values.jobRole === 'Instructional'"
                  name="gradeLevel"
                  label="Grade Level(s)"
                  :data="gradeLevelDropdown"
                  :label-value-options="true"
                  subLabel=""
                  :value="values.gradeLevel"
                  className="sm:grid xl:grid-cols-3 xl:items-start gap-1.5 xl:gap-4 py-4 xl:py-6"
                />

                <SelectBox
                  v-if="values.jobRole === 'Instructional'"
                  name="subjects"
                  label="Subject Area(s)"
                  :data="subjectsDropdown"
                  :label-value-options="true"
                  subLabel=""
                  :value="values.subjects"
                  className="sm:grid xl:grid-cols-3 xl:items-start gap-1.5 xl:gap-4 py-4 xl:py-6"
                />

                <div
                  class="sm:grid xl:grid-cols-3 xl:items-start gap-1.5 xl:gap-4 py-4 xl:py-6 mb-0 sm:mb-12 xl:mb-0"
                >
                  <label
                    for="jobDesc"
                    class="block text-sm font-semibold text-gray-700 sm:pt-1.5"
                  >
                    Job Description
                  </label>
                  <div class="mt-2 sm:col-span-2 sm:mt-0 rounded-lg">
                    <quill-editor
                      name="jobDesc"
                      theme="snow"
                      class="min-h-[102px]"
                      placeholder="Enter a description.."
                      :option="options"
                      contentType="html"
                      v-model:content="jobDesc"
                    />
                    <span
                      v-if="errorMessage"
                      class="text-red-500 text-sm font-normal leading-tight"
                    >
                      Please add job description
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="currentStep === 2" class="w-full">
              <div
                class="mt-5 space-y-0 border-b border-gray-900/10 divide-y divide-gray-900/10 border-t sm:pb-0"
              >
                <SelectBox
                  name="applicationMethod"
                  label="Your work Application method"
                  :data="appMethods"
                  :value="values.applicationMethod"
                  subLabel="“Please choose how you would like to receive job applications when candidates apply"
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
                    <DatePicker
                      name="deadlineDate"
                      :values="values.deadlineDate"
                      :error="errors.deadlineDate"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div v-if="currentStep === 3" class="w-full">
              <div
                class="mt-5 border-b border-gray-900/10 divide-y divide-gray-900/10 border-t pb-0"
              >
                <div
                  class="flex-col justify-start items-start inline-flex w-full gap-6 py-4 md:py-6"
                >
                  <h4
                    class="text-gray-900 text-base font-semibold leading-normal"
                  >
                    Organization Information
                  </h4>
                  <div class="grid sm:grid-cols-2 gap-4 w-full">
                    <div class="justify-start items-start gap-8 inline-flex">
                      <div
                        class="flex-col justify-start items-start gap-2 inline-flex"
                      >
                        <div class="inline-flex items-center gap-1">
                          <p
                            class="text-gray-700 text-base font-semibold leading-normal"
                          >
                            Organization Name*
                          </p>
                          <button
                            id="tooltipButton"
                            type="button"
                            @click="handleButtonClick(0)"
                          >
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
                          class="text-gray-600 text-base font-normal leading-normal"
                        >
                          {{ values?.organizationName ? values?.organizationName : "N/a" }}
                        </p>
                      </div>
                    </div>
                    <div class="justify-start items-start gap-8 inline-flex">
                      <div
                        class="flex-col justify-start items-start gap-2 inline-flex"
                      >
                        <div class="inline-flex items-center gap-1">
                          <p
                            class="text-gray-700 text-base font-semibold leading-normal"
                          >
                            Your work email address
                          </p>
                          <button
                            id="tooltipButton"
                            type="button"
                            @click="handleButtonClick(0)"
                          >
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
                          class="text-gray-600 text-base font-normal leading-normal"
                        >
                          {{ values?.email ? values?.email : "N/a" }}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div class="grid sm:grid-cols-2 gap-4 w-full">
                    <div class="justify-start items-start gap-8 inline-flex">
                      <div
                        class="flex-col justify-start items-start gap-2 inline-flex"
                      >
                        <div class="inline-flex items-center gap-1">
                          <p
                            class="text-gray-700 text-base font-semibold leading-normal"
                          >
                            Your full name
                          </p>
                          <button
                            id="tooltipButton"
                            type="button"
                            @click="handleButtonClick(0)"
                          >
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
                          class="text-gray-600 text-base font-normal leading-normal"
                        >
                          {{ values?.fullName ? values?.fullName : "N/a" }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  class="flex-col justify-start items-start inline-flex w-full gap-6 py-4 md:py-6"
                >
                  <h4
                    class="text-gray-900 text-base font-semibold leading-normal"
                  >
                    Job Details
                  </h4>
                  <div class="grid sm:grid-cols-2 gap-4 w-full">
                    <div class="justify-start items-start gap-8 inline-flex">
                      <div
                        class="flex-col justify-start items-start gap-2 inline-flex"
                      >
                        <div class="inline-flex items-center gap-1">
                          <p
                            class="text-gray-700 text-base font-semibold leading-normal"
                          >
                            Job Title
                          </p>
                          <button
                            id="tooltipButton"
                            type="button"
                            @click="handleButtonClick(1)"
                          >
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
                          class="text-gray-600 text-base font-normal leading-normal"
                        >
                          {{ values?.jobTitle ? values?.jobTitle : "N/a" }}
                        </p>
                      </div>
                    </div>
                    <div class="justify-start items-start gap-8 inline-flex">
                      <div
                        class="flex-col justify-start items-start gap-2 inline-flex"
                      >
                        <div class="inline-flex items-center gap-1">
                          <p
                            class="text-gray-700 text-base font-semibold leading-normal"
                          >
                            Start Date
                          </p>
                          <button
                            id="tooltipButton"
                            type="button"
                            @click="handleButtonClick(1)"
                          >
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
                          class="text-gray-600 text-base font-normal leading-normal"
                        >
                          {{ values?.startDate ? values?.startDate : "N/a" }}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div class="grid sm:grid-cols-2 gap-4 w-full">
                    <div class="justify-start items-start gap-8 inline-flex">
                      <div
                        class="flex-col justify-start items-start gap-2 inline-flex"
                      >
                        <div class="inline-flex items-center gap-1">
                          <p
                            class="text-gray-700 text-base font-semibold leading-normal"
                          >
                            Employment Type
                          </p>
                          <button
                            id="tooltipButton"
                            type="button"
                            @click="handleButtonClick(1)"
                          >
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
                          class="text-gray-600 text-base font-normal leading-normal"
                        >
                          {{ values?.employment ? values?.employment : "N/a" }}
                        </p>
                      </div>
                    </div>

                    <div class="justify-start items-start gap-8 inline-flex">
                      <div
                        class="flex-col justify-start items-start gap-2 inline-flex"
                      >
                        <div class="inline-flex items-center gap-1">
                          <p
                            class="text-gray-700 text-base font-semibold leading-normal"
                          >
                            Job Role
                          </p>
                          <button
                            id="tooltipButton"
                            type="button"
                            @click="handleButtonClick(1)"
                          >
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
                          class="text-gray-600 text-base font-normal leading-normal"
                        >
                          {{ values?.jobRole ? values?.jobRole : "N/a" }}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div class="grid sm:grid-cols-2 gap-4 w-full">
                    <div class="justify-start items-start gap-8 inline-flex">
                      <div
                        class="flex-col justify-start items-start gap-2 inline-flex"
                      >
                        <div class="inline-flex items-center gap-1">
                          <p
                            class="text-gray-700 text-base font-semibold leading-normal"
                          >
                            Grade Level(s)
                          </p>
                          <button
                            id="tooltipButton"
                            type="button"
                            @click="handleButtonClick(1)"
                          >
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
                          class="text-gray-600 text-base font-normal leading-normal"
                        >
                          {{ values?.gradeLevel ? values?.gradeLevel : "N/a" }}
                        </p>
                      </div>
                    </div>

                    <div class="justify-start items-start gap-8 inline-flex">
                      <div
                        class="flex-col justify-start items-start gap-2 inline-flex"
                      >
                        <div class="inline-flex items-center gap-1">
                          <p
                            class="text-gray-700 text-base font-semibold leading-normal"
                          >
                            Subject Area(s)
                          </p>
                          <button
                            id="tooltipButton"
                            type="button"
                            @click="handleButtonClick(1)"
                          >
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
                          class="text-gray-600 text-base font-normal leading-normal"
                        >
                          {{ values?.subjects ? values?.subjects : "N/a" }}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div class="flex flex-col gap-4 w-full">
                    <div class="justify-start items-start gap-8 inline-flex">
                      <div
                        class="flex-col justify-start items-start gap-2 inline-flex"
                      >
                        <div class="inline-flex items-center gap-1">
                          <p
                            class="text-gray-700 text-base font-semibold leading-normal"
                          >
                            Job Description
                          </p>
                          <button
                            id="tooltipButton"
                            type="button"
                            @click="handleButtonClick(1)"
                          >
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
                          class="text-gray-600 text-base font-normal leading-normal"
                          v-html="jobDesc"
                        ></p>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  class="flex-col justify-start items-start inline-flex w-full gap-6 py-4 md:py-6"
                >
                  <h4
                    class="text-gray-900 text-base font-semibold leading-normal"
                  >
                    Application Details
                  </h4>
                  <div class="grid sm:grid-cols-2 gap-4 w-full">
                    <div class="justify-start items-start gap-8 inline-flex">
                      <div
                        class="flex-col justify-start items-start gap-2 inline-flex"
                      >
                        <div class="inline-flex items-center gap-1">
                          <p
                            class="text-gray-700 text-base font-semibold leading-normal"
                          >
                            Application method
                          </p>
                          <button
                            id="tooltipButton"
                            type="button"
                            @click="handleButtonClick(2)"
                          >
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
                          class="text-gray-600 text-base font-normal leading-normal"
                        >
                          {{
                            values?.applicationMethod
                              ? values?.applicationMethod
                              : "N/a"
                          }}
                        </p>
                      </div>
                    </div>
                    <div class="justify-start items-start gap-8 inline-flex">
                      <div
                        class="flex-col justify-start items-start gap-2 inline-flex"
                      >
                        <div class="inline-flex items-center gap-1">
                          <p
                            class="text-gray-700 text-base font-semibold leading-normal"
                          >
                            Enter details
                          </p>
                          <button
                            id="tooltipButton"
                            type="button"
                            @click="handleButtonClick(2)"
                          >
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
                          class="text-gray-600 text-base font-normal leading-normal"
                        >
                          {{
                            values.detail ? "http://" + values.detail : "N/a"
                          }}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div class="grid sm:grid-cols-2 gap-4 w-full">
                    <div class="justify-start items-start gap-8 inline-flex">
                      <div
                        class="flex-col justify-start items-start gap-2 inline-flex"
                      >
                        <div class="inline-flex items-center gap-1">
                          <p
                            class="text-gray-700 text-base font-semibold leading-normal"
                          >
                            Application deadline date
                          </p>
                          <button
                            id="tooltipButton"
                            type="button"
                            @click="handleButtonClick(2)"
                          >
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
                          class="text-gray-600 text-base font-normal leading-normal"
                        >
                          {{
                            values?.deadlineDate ? values?.deadlineDate : "N/a"
                          }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  class="flex-col justify-start items-start inline-flex w-full gap-6 py-4 md:py-6"
                >
                  <h4
                    class="text-gray-900 text-base font-semibold leading-normal"
                  >
                    Upgrade
                  </h4>
                  <div class="grid sm:grid-cols-2 gap-4 w-full">
                    <div class="justify-start items-start gap-8 inline-flex">
                      <div
                        class="flex-col justify-start items-start gap-2 inline-flex"
                      >
                        <p
                          class="text-gray-700 text-base font-semibold leading-normal"
                        >
                          Feature your Job
                        </p>
                      </div>
                    </div>
                    <div class="flex flex-row gap-3 items-start">
                      <div class="flex items-center">
                        <div class="flex items-center mb-4">
                          <Field
                            name="terms"
                            type="checkbox"
                            id="terms"
                            :value="true"
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
                        <ol
                          class="space-y-1 text-gray-600 list-decimal list-inside"
                        >
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
                        <ErrorMessage
                          class="text-red-500 text-sm font-normal leading-tight"
                          name="terms"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="flex flex-col md:flex-row items-end justify-between gap-3 mt-4 md:mt-0"
            >
              <div class="w-full md:w-fit">
                <BaseButton
                  label="Back"
                  color="brand"
                  type="button"
                  class="md:mt-5 md:mb-8 w-full"
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
                  @click="() => router.back()"
                />

                <BaseButton
                  label="Next"
                  color="primary"
                  type="submit"
                  :disabled="false"
                  v-if="currentStep !== 3"
                  class="order-1 md:order-2"
                  @click="Object.keys(errors).length > 0 && handleStepClick()"
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

        <div class="w-full md:w-1/4 xl:w-1/5 flex flex-col gap-4 md:pt-8">
          <div
            class="block xl:max-w-sm p-4 border border-gray-200 rounded-lg shadow"
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
              <div>
                <img
                  :src="uploadedImage"
                  v-if="uploadedImage"
                  class="size-12 rounded-full object-cover"
                />
                <SvgoUpload v-else class="size-12" />
              </div>
              <div
                class="w-full flex-col justify-between items-start gap-5 flex"
              >
                <div class="w-full">
                  <p class="text-gray-900 text-base font-medium leading-normal">
                    {{ values?.jobTitle ? values?.jobTitle : "Job Title" }}
                  </p>
                  <p class="text-gray-600 text-sm font-normal leading-tight">
                    {{
                      values?.organizationName ? values?.organizationName : "Company name"
                    }}
                  </p>
                </div>
                <div
                  class="justify-between w-full xl:items-center gap-4 flex lg:flex-col xl:flex-row"
                >
                  <div class="flex items-center space-x-1.5">
                    <SvgoClockLight class="h-5" />
                    <p class="text-gray-600 text-sm font-medium leading-tight">
                      {{
                        values?.employment ? values?.employment : "Full-time"
                      }}
                    </p>
                  </div>
                  <div class="flex items-center space-x-1.5">
                    <SvgoCurrencyDollarLight class="h-5" />
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
              <div
                class="w-full flex-col justify-between items-start gap-5 flex"
              >
                <div class="w-full">
                  <p class="text-gray-900 text-base font-medium leading-normal">
                    We Care
                  </p>
                  <div class="">
                    <span
                      class="text-gray-600 text-xs font-normal leading-[18px]"
                      >We donate a percentage of job posting revenue to
                      classroom projects through our partnership</span
                    ><span
                      class="text-gray-600 text-sm font-normal leading-tight"
                    >
                    </span>
                    <NuxtLink
                      to="#"
                      class="text-brand-500 text-xs font-normal underline leading-[18px]"
                    >
                      DonorsChoose.org.
                    </NuxtLink>
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
            @click="checkout"
            type="button"
            :disabled="false"
          />
        </div>
      </Form>
    </div>
  </div>
</template>

<style scoped lang="postcss"></style>
