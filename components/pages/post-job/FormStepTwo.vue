<script setup lang="ts">
import {
  compensationTypesOptions,
  employmentOptions,
  hourlyRange,
  jobRolesOptions,
  salaryRange,
  toolbarOptions
} from "~/components/core/constants/post-job-form.constants";
import * as Yup from "yup";
import {Form, ErrorMessage, Field, useForm} from "vee-validate";
import {usePostjobStore} from "~/segments/postjobs/store";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const emit = defineEmits(['moveToPrevStep', 'handleFormSubmission', 'formDataListener']);

const props = defineProps<{
  initialFormValues: any
}>()

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
    experienceLevelId: Yup.string().required("Experience Level is required"),
    compensationTypeId: Yup.string(),
    minSalaryId: Yup.string().when("compensationTypeId", {
      is: "Salary",
      then: (schema) => schema.required("Salary Start Range is required")
    }),
    maxSalaryId: Yup.string().when("compensationTypeId", {
      is: "Salary",
      then: (schema) => schema.required("Salary End Range is required")
    }),
    minHourlyId: Yup.string().when("compensationTypeId", {
      is: "Hourly",
      then: (schema) => schema.required("Hourly Start Range is required")
    }),
    maxHourlyId: Yup.string().when("compensationTypeId", {
      is: "Hourly",
      then: (schema) => schema.required("Hourly End Range is required")
    }),
    jobRole: Yup.string().required("Job Role is required"),
    gradeLevel: Yup.string().when("jobRole", {
      is: "Instructional",
      then: (schema) => schema.required("Grade Level(s) is required")
    }),
    subjects: Yup.string().when("jobRole", {
      is: "Instructional",
      then: (schema) => schema.required("Subject Area(s) is required")
    }),
    jobDescription: Yup.string().required("Job Description is required"),
})

const { defineField, handleSubmit, values, errors, resetForm } = useForm({
  validationSchema: schema,
});
const [jobTitle, jobTitleAttrs] = defineField('jobTitle');
const [startDate, startDateAttrs] = defineField('startDate');
const [employmentTypeId, employmentTypeIdAttrs] = defineField('employmentTypeId');
const [experienceLevelId, experienceLevelIdAttrs] = defineField('experienceLevelId');
const [compensationTypeId, compensationTypeIdAttrs] = defineField('compensationTypeId');
const [minSalaryId, minSalaryIdAttrs] = defineField('minSalaryId');
const [maxSalaryId, maxSalaryIdAttrs] = defineField('maxSalaryId');
const [minHourlyId, minHourlyIdAttrs] = defineField('minHourlyId');
const [maxHourlyId, maxHourlyIdAttrs] = defineField('maxHourlyId');
const [jobRole, jobRoleAttrs] = defineField('jobRole');
const [gradeLevel, gradeLevelAttrs] = defineField('gradeLevel');
const [subjects, subjectsAttrs] = defineField('subjects');
const [jobDescription, jobDescriptionAttrs] = defineField('jobDescription');

resetForm({
  values: props.initialFormValues,
});

const selectedSalaryRange = ref([])
const selectedHourlyRange = ref([])
if (minSalaryId.value && maxSalaryId.value) selectedSalaryRange.value = [minSalaryId.value, maxSalaryId.value];
if (minHourlyId.value && maxHourlyId.value) selectedHourlyRange.value = [minHourlyId.value, maxHourlyId.value];

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

watch(() => [values.jobTitle, values.employmentTypeId], (val) => {
  emit('formDataListener', {
    jobTitle: val[0],
    employment: val[1]
  });
})

const onSubmit = handleSubmit(values => {
  emit('handleFormSubmission', values, 2);
});

function handleInput(delta) {
  if (delta === '<p><br></p>') jobDescription.value = ''
}

const textInputOptions = {
  format: "MM/dd/yyyy",
};

const selectedMin = computed(() => {
  return compensationTypeId.value === 'Salary' ? minSalaryId.value : minHourlyId.value;
});
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="w-full">
      <div class="mt-5 border-b border-gray-900/10 divide-y divide-gray-900/10 border-t">
        <!--    Job Title Field    -->
        <TextInput
            v-model="jobTitle"
            name="jobTitle"
            type="text"
            label="Job Title"
            placeholder="e.g. Project Manager"
            subLabel=""
            className="form-field-layout"
        />

        <!--    Location Field    -->
        <div class="form-field-layout">
          <label for="date" class="block text-sm font-semibold text-gray-700 sm:pt-1.5">
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
                class="error-message"
            >
            Location is required
          </span>
          </div>
        </div>

        <!--    Start Date Field    -->
        <div class="form-field-layout">
          <label for="date" class="block text-sm font-semibold text-gray-700 sm:pt-1.5">
            Start Date
          </label>
          <div class="mt-2 sm:col-span-2 sm:mt-0 relative">
            <Datepicker
                v-model="startDate"
                name="startDate"
                :min-date="new Date()"
                class="fixed-input-icon"
                input-class-name="form-input w-full"
                menu-class-name="dp-custom-menu"
                autoApply
                :state="!errors?.startDate?.length"
                :text-input="textInputOptions"
                :enable-time-picker="false"
                placeholder="MM/DD/YYYY"
            >
              <template #input-icon> </template>
            </Datepicker>
            <SvgoCalendar class="absolute h-5 top-3 right-3" />
            <ErrorMessage
                class="error-message"
                name="startDate"
            />
          </div>
        </div>

        <!--    Employment Type Field    -->
        <div class="form-field-layout">
          <label class="block text-sm font-semibold text-gray-700 sm:pt-1.5">
            Employment Type
          </label>
          <div class="mt-2 sm:col-span-2 sm:mt-0">
            <div class="flex flex-col gap-4">
              <template v-for="option in employmentOptions">
                <div class="flex items-center">
                  <Field
                      v-model="employmentTypeId"
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
                class="error-message"
                name="employmentTypeId"
            />
          </div>
        </div>

        <!--    Experience Level Field    -->
        <div class="form-field-layout">
          <label for="experience" class="block text-sm font-semibold text-gray-700 sm:pt-1.5">
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
                        v-model="experienceLevelId"
                        name="experienceLevelId"
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
                class="error-message"
                name="experienceLevelId"
            />
          </div>
        </div>

        <!--    Compensation Type Field    -->
        <div class="compensation-field-group">
          <div class="form-field-layout">
            <label for="compensation" class="block text-sm font-semibold text-gray-700 sm:pt-1.5">
              Compensation Type
            </label>
            <div class="col-span-2">
              <div class="flex gap-20">
                <template v-for="option in compensationTypesOptions">
                  <div class="flex gap-3">
                    <Field
                        v-model="compensationTypeId"
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
              v-if="compensationTypeId === 'Salary'"
              v-model="selectedSalaryRange"
              name="minSalaryId"
              secondary-name="maxSalaryId"
              label="Salary Range"
              :data="salaryRange"
              :data2="salaryRange"
              subLabel="(USD)"
              className="form-field-layout"
          />
          <PayRangeSelectBox
              v-else-if="compensationTypeId === 'Hourly'"
              v-model="selectedHourlyRange"
              name="minHourlyId"
              secondary-name="maxHourlyId"
              label="Hourly Range"
              :data="hourlyRange"
              :data2="hourlyRange"
              subLabel="(USD)"
              className="form-field-layout"
          />
        </div>

        <!--    Job Role Field    -->
        <SelectBox
            v-model="jobRole"
            name="jobRole"
            label="Job Role"
            :data="jobRoles"
            :label-value-options="true"
            subLabel=""
            :value="values.jobRole"
            className="form-field-layout"
        />

        <!--    Grade Level Field    -->
        <SelectBox
            v-if="jobRole === 'Instructional'"
            v-model="gradeLevel"
            name="gradeLevel"
            label="Grade Level(s)"
            :data="gradeLevelDropdown"
            :label-value-options="true"
            subLabel=""
            :value="values.gradeLevel"
            className="form-field-layout"
        />

        <!--    Subject Areas Field    -->
        <SelectBox
            v-if="jobRole === 'Instructional'"
            v-model="subjects"
            name="subjects"
            label="Subject Area(s)"
            :data="subjectsDropdown"
            :label-value-options="true"
            subLabel=""
            :value="values.subjects"
            className="form-field-layout"
        />

        <!--    Job Description Field    -->
        <div class="form-field-layout mb-0 sm:mb-12 xl:mb-0">
          <label for="jobDescription" class="block text-sm font-semibold text-gray-700 sm:pt-1.5">
            Job Description
          </label>
          <div class="mt-2 sm:col-span-2 sm:mt-0 rounded-lg">
            <quill-editor
                v-model:content="jobDescription"
                name="jobDescription"
                theme="snow"
                class="min-h-[102px]"
                placeholder="Enter a description.."
                :option="options"
                contentType="html"
                @update:content="handleInput"
            />
            <ErrorMessage
                class="error-message"
                name="jobDescription"
            />
          </div>
        </div>
      </div>
    </div>

    <FormFooterButtons
        @back-btn-clicked="() => emit('moveToPrevStep')"
    />
  </form>
</template>
