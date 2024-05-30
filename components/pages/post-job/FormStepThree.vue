<script setup lang="ts">
import {applyMethodOptions} from "~/components/core/constants/post-job-form.constants";
import * as Yup from "yup";
import {Form, ErrorMessage, Field, useForm} from "vee-validate";

const emit = defineEmits(['moveToPrevStep', 'handleFormSubmission']);

const urlRegex = /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/

const schema = Yup.object({
    applicationMethod: Yup.string().required("You must choose your application method"),
    applyURL: Yup.string().when("applicationMethod", {
      is: "URL",
      then: (schema) => schema.matches(urlRegex, "Enter correct url!").required("URL is required")
    }),
    applyEmail: Yup.string().when("applicationMethod", {
      is: "Email",
      then: (schema) => schema.email('Invalid email').required('Email is required')
    }),
    applicationDeadline: Yup.string().required("Please Enter Date"),
})
const initialFormValues = {
  applicationMethod: 'URL'
}

const { defineField, handleSubmit, values, errors } = useForm({
  validationSchema: schema,
  initialValues: initialFormValues
});
const [applicationMethod, applicationMethodAttrs] = defineField('applicationMethod');

const onSubmit = handleSubmit(values => {
  emit('handleFormSubmission', values, 3)
});
</script>

<template>
  <form @submit="onSubmit">
    <div class="w-full">
      <div
          class="mt-5 space-y-0 border-b border-gray-900/10 divide-y divide-gray-900/10 border-t sm:pb-0"
      >
        <SelectBox
            name="applicationMethod"
            label="Your work Application method"
            :data="applyMethodOptions"
            :value="values.applicationMethod"
            :label-value-options="true"
            subLabel="“Please choose how you would like to receive job applications when candidates apply"
            :errorMessage="errors.applicationMethod"
            className="form-field-layout"
        />
        <HttpInput
            v-if="values.applicationMethod === 'URL'"
            name="applyURL"
            type="text"
            label="Apply URL"
            placeholder="example.com/apply-here"
            subLabel=""
            className="form-field-layout"
        />
        <TextInput
            v-if="values.applicationMethod === 'Email'"
            name="applyEmail"
            type="email"
            label="Apply Email"
            placeholder="Email here"
            subLabel=""
        />

        <div class="xl:grid xl:grid-cols-3 xl:items-start xl:gap-8 py-4 sm:py-5">
          <label
              for="applicationDeadline"
              class="block text-sm font-semibold text-gray-700 sm:pt-1.5"
          >
            Application deadline date
          </label>
          <div class="mt-2 sm:col-span-2 relative">
            <DatePicker
                name="applicationDeadline"
                :values="values.applicationDeadlinel"
                :error="errors.applicationDeadlinel"
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

<style scoped lang="postcss">

</style>
