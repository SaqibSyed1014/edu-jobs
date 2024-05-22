<script setup lang="ts">
import { toRef } from "vue";
import { useField } from "vee-validate";
import { Form, Field, ErrorMessage } from "vee-validate";

const props = defineProps({
  value: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  subLabel: {
    type: String,
    required: true,
  },
  successMessage: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  className: {
    type: String,
    default: "",
  },
  data: {
    type: Array,
    default: [],
  },
  labelValueOptions: {
    type: Boolean,
    default: false
  },
  key: {
    type: String,
  },
  errorMessage: { type: String, default: "" },
});

const name = toRef(props, "name");

const {
  value: inputValue,
  handleBlur,
  handleChange,
  meta,
} = useField(name, undefined, {
  initialValue: props.value,
});
// console.log("errorMessage", errorMessage);
</script>

<template>
  <div :class="[className]">
    <label
      v-if="label"
      :for="name"
      class="block text-sm font-semibold text-gray-700 sm:pt-1.5"
    >
      {{ label }}
      <span
        v-show="subLabel"
        class="w-[228px] text-slate-600 text-sm font-normal leading-normal"
      >
        <br />
        {{ subLabel }}
      </span>
    </label>
    <div class="sm:col-span-2 sm:mt-0 pt-1">
      <Field
        v-slot="{ value }"
        :name="name"
        as="select"
        :class="[
          'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-[11px] px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
          [errorMessage && 'ring-2 !border-0 !ring-error-400'], // Apply border-red-300 class if errorMessage exists
        ]"
      >
        <option value="" disabled>Select</option>
        <template v-if="!labelValueOptions">
          <option
              v-for="item in data"
              :key="item + '1'"
              :value="item"
              :selected="value && value.includes(item)"
          >
            {{ item }}
          </option>
        </template>
        <template v-else>
          <option
              v-for="item in data"
              :key="item + '1'"
              :value="item.value"
          >
            {{ item.label }}
          </option>
        </template>
      </Field>
      <!-- Display the vee-validate error message -->
      <ErrorMessage
        class="text-red-500 text-sm font-normal leading-tight"
        :name="name"
      />
    </div>
  </div>
</template>
