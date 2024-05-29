<script setup lang="ts">
import {
  applyMethodOptions,
  compensationTypesOptions,
  employmentOptions, hourlyRange, jobRolesOptions, salaryRange, toolbarOptions
} from "~/components/core/constants/post-job-form.constants";
import * as Yup from "yup";
import {Form, ErrorMessage, Field} from "vee-validate";
import {usePostjobStore} from "~/segments/postjobs/store";

const emit = defineEmits(['moveToPrevStep']);

const postJobStore = usePostjobStore();
const {
  gradeLevelDropdown,
  subjectsDropdown,
  experienceLevelOptions
} = storeToRefs(postJobStore);

const jobRoles = ref(jobRolesOptions);

const schema = Yup.object({
    jobTitle: Yup.string().required("Job Title is required"),
    startDate: Yup.string().required("Start Date is required"),
    employmentTypeId: Yup.string().required("Employment Type is required"),
    experience: Yup.string().required("Experience Level is required"),
    compensationTypeId: Yup.string(),
    minSalaryId: Yup.string().required("Salary Start Range is required"),
    maxSalaryId: Yup.string().required("Salary End Range is required"),
    minHourlyId: Yup.string().required("Hourly Start Range is required"),
    maxHourlyId: Yup.string().required("Hourly End Range is required"),
    jobRole: Yup.string().required("Job Role is required"),
    gradeLevel: Yup.string().required("Grade Level(s) is required"),
    startRange: Yup.string().required("Start Range is required"),
    endRange: Yup.string().required("End Range is required"),
    subjects: Yup.string().required("Subject Area(s) is required"),
    jobDescription: Yup.string(),
  })

const selectedLocation = ref<number[]>([])
function setLocationsCoordinates(location :any) {
  selectedLocation.value[0] = location.geometry.location.lat() as number;
  selectedLocation.value[1] = location.geometry.location.lng() as number;
}

const options = ref({
  modules: {
    toolbar: toolbarOptions,
  },
  readOnly: false,
});

const locError = ref(false);
const errorMessage = ref(false);

function saveFirstStep(values) {
  emit('handleFormSubmission', values, 1)
}


</script>

<template>
  <Form
      v-slot="{ handleSubmit, errors, values }"
      :validation-schema="schema"
      @submit="saveSecondStep"
  >
    <div class="w-full">
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
            Job Location
          </label>
          <div class="mt-2 sm:col-span-2 sm:mt-0 relative">
            <client-only>
              <GMapAutocomplete
                  id="jobLocation"
                  placeholder="Anywhere"
                  class="form-input job-location-input w-full"
                  :options="{
                    componentRestrictions: { country: 'US' },
                    strictBounds: true
                  }"
                  @place_changed="setLocationsCoordinates"
              />
            </client-only>
            <span
                v-if="locError"
                class="text-red-500 text-sm font-normal leading-tight"
            >
            Location is required
          </span>
          </div>
        </div>

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
                name="startDate"
                placeholder="MM/DD/YYYY"
            />
          </div>
        </div>

        <div
            class="sm:grid xl:grid-cols-3 xl:items-start gap-1.5 xl:gap-4 py-4 xl:py-6"
        >
          <label class="block text-sm font-semibold text-gray-700 sm:pt-1.5">
            Employment Type
          </label>
          <div class="mt-2 sm:col-span-2 sm:mt-0">
            <div class="flex flex-col gap-4">
              <template v-for="option in employmentOptions">
                <div class="flex items-center">
                  <Field
                      name="employmentTypeId"
                      type="radio"
                      :value="option.value"
                      class="cursor-pointer"
                  />
                  <label
                      :for="option.label"
                      class="ms-2 text-sm font-medium text-gray-900 cursor-pointer"
                  >{{ option.label }}</label>
                </div>
              </template>
            </div>
            <ErrorMessage
                class="text-red-500 text-sm font-normal leading-tight"
                name="employmentTypeId"
            />
          </div>
        </div>

        <div
            class="sm:grid xl:grid-cols-3 xl:items-start gap-1.5 xl:gap-4 py-4 xl:py-6"
        >
          <label
              for="experience"
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
                name="experienceLevelId"
            />
          </div>
        </div>

        <div>
          <div
              class="sm:grid xl:grid-cols-3 xl:items-start gap-1.5 xl:gap-4 py-4 xl:py-6"
          >
            <label
                for="compensation"
                class="block text-sm font-semibold text-gray-700 sm:pt-1.5"
            >
              Compensation Type
            </label>
            <div class="col-span-2">
              <div class="flex gap-20">
                <template v-for="option in compensationTypesOptions">
                  <div class="flex gap-3">
                    <Field
                        name="compensationTypeId"
                        type="radio"
                        :value="option.value"
                        class="cursor-pointer"
                    />
                    <label
                        :for="option.label"
                        class="text-sm font-medium text-gray-900"
                    >{{ option.label }}</label>
                  </div>
                </template>
              </div>
            </div>
          </div>

          <PayRangeSelectBox
              v-if="values.compensationTypeId === 'Salary'"
              name="minSalaryId"
              secondary-name="maxSalaryId"
              label="Salary Range"
              :data="salaryRange"
              :data2="salaryRange"
              subLabel="(USD)"
              className="sm:grid xl:grid-cols-3 xl:items-start gap-1.5 xl:gap-4 py-4 xl:py-6"
          />

          <PayRangeSelectBox
              v-else-if="values.compensationTypeId === 'Hourly'"
              name="minHourlyId"
              secondary-name="maxHourlyId"
              label="Hourly Range"
              :data="hourlyRange"
              :data2="hourlyRange"
              subLabel="(USD)"
              className="sm:grid xl:grid-cols-3 xl:items-start gap-1.5 xl:gap-4 py-4 xl:py-6"
          />
        </div>

        <SelectBox
            name="jobRole"
            label="Job Role"
            :data="jobRoles"
            :label-value-options="true"
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
              for="jobDescription"
              class="block text-sm font-semibold text-gray-700 sm:pt-1.5"
          >
            Job Description
          </label>
          <div class="mt-2 sm:col-span-2 sm:mt-0 rounded-lg">
            <quill-editor
                name="jobDescription"
                theme="snow"
                class="min-h-[102px]"
                placeholder="Enter a description.."
                :option="options"
                contentType="html"
                @textChange="(delta) => values.jobDescription = delta"
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
      {{ values }}
    </div>

    <FormFooterButtons
        @back-btn-clicked="() => emit('moveToPrevStep')"
    />
  </Form>
</template>
