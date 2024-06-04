<script setup lang="ts">
import * as Yup from "yup";
import {Form, ErrorMessage, Field, useForm} from "vee-validate";
import {usePostjobStore} from "~/segments/postjobs/store";
import Multiselect from "vue-multiselect";

const emit = defineEmits(['handleFormSubmission', 'formDataListener']);

const props = defineProps<{
  initialFormValues: any
}>()

const jobPostStore = usePostjobStore();
const { orgTypesDropdown, orgNamesDropdown } = storeToRefs(jobPostStore);

const uploadedImage = ref("");

const handleImageUpload = (event: any) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader(); // Read the uploaded file as a data URL
    reader.onload = (e: any) => {
      uploadedImage.value = e.target.result; // Set the uploaded image URL to the state variable
    };
    reader.readAsDataURL(file);
  }
};

const schema = Yup.object({
  id: Yup.string(),
  organizationName: Yup.string().default('something@email.com')
      .required("Organization Name is required")
      .min(10, "Please enter a name that is at least 10 characters long"),
  organizationTypeId: Yup.string().required('Organization type is required'),
  email: Yup.string().required('Email is required').email('Invalid email'),
  fullName: Yup.string().required("Full Name is required"),
})


const { defineField, handleSubmit, values, resetForm } = useForm({
  validationSchema: schema
});
const [id] = defineField('id');
const [organizationName, orgNameAttrs] = defineField('organizationName');
const [organizationTypeId, orgTypeAttrs] = defineField('organizationTypeId');
const [email, emaileAttrs] = defineField('email');
const [fullName, fullNameAttrs] = defineField('fullName');

resetForm({
  values: props.initialFormValues,
});

watch(() => [values.organizationName, uploadedImage.value], (val) => {
  emit('formDataListener', {
    orgName: val[0],
    image: val[1]
  });
})

const onSubmit = handleSubmit(values => {
  emit('handleFormSubmission', values, 1)
});

const searchedName = ref<any>(null);
const searchingName = ref<boolean>(false)

async function getSearchedText(val :string) {
  if (val.length) {
    searchingName.value = true;
    await jobPostStore.fetchSearchedOrgNames(val);
    searchingName.value = false;
    if (!orgNamesDropdown.value.length) {  // if no results are found, assign default id
      searchedName.value = {
        label: val,
        value: 0
      }
      checkSelection(); // assign to form values
    }
  }
}

function checkSelection() {
  organizationName.value = searchedName.value.label;
  id.value = searchedName.value.value;
}

watch(() => props.initialFormValues, (val) => {
  if (val.organizationName) {  // if orgName is selected and exists in form
    searchedName.value = {
      label: val.organizationName,
      value: val.id
    }
  }
}, { immediate: true })
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="mt-5 space-y-8 border-b border-gray-900/10 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
      <div class="form-field-layout mb-2">
        <label class="block text-sm font-semibold text-gray-700 sm:pt-1.5">
          Org Name
        </label>
        <div class="mt-2 sm:col-span-2 sm:mt-0">
          <multiselect
              v-model="searchedName"
              :options="orgNamesDropdown"
              label="label"
              track-by="value"
              :multiple="false"
              :show-labels="false"
              :searchable="true"
              :preserve-search="true"
              :show-no-options="false"
              :show-no-results="false"
              class="custom-multi-select autocomplete"
              placeholder="e.g. Unified School District"
              :loading="searchingName"
              @search-change="getSearchedText"
              @select="checkSelection"
          >
            <template #caret>
              <span></span>
            </template>
            <template #noResult>
                <span></span>
            </template>
            <template #noOptions>
              <span></span>
            </template>
          </multiselect>

          <ErrorMessage
              class="error-message"
              name="organizationName"
          />
        </div>
      </div>

      <SelectBox
          v-model="organizationTypeId"
          v-bind="orgTypeAttrs"
          name="organizationTypeId"
          label="Organization Type"
          :data="orgTypesDropdown"
          :label-value-options="true"
          subLabel=""
          :value="values.organizationTypeId"
          className="form-field-layout"
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
            v-model="email"
            v-bind="emaileAttrs"
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
            v-model="fullName"
            v-bind="fullNameAttrs"
            name="fullName"
            type="text"
            label="Your full name*"
            placeholder="John Doe"
            subLabel=""
            className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6"
        />
      </div>
    </div>

    <FormFooterButtons
      :hide-back-button="true"
    />
  </form>
</template>
