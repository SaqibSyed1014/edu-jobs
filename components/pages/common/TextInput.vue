<script setup lang="ts">
import { toRef } from "vue";
import { useField } from "vee-validate";

const props = defineProps({
  type: {
    type: String,
    default: "text",
  },
  value: {
    type: String,
    default: undefined,
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
  autofocus: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

// use `toRef` to create reactive references to `name` prop which is passed to `useField`
// this is important because vee-validte needs to know if the field name changes
// https://vee-validate.logaretm.com/v4/guide/composition-api/caveats
const name = toRef(props, "name");

// we don't provide any rules here because we are using form-level validation
// https://vee-validate.logaretm.com/v4/guide/validation#form-level-validation
const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
  setValue,
} = useField(name, undefined, {
  initialValue: props.value,
});

watch(
  () => props.value,
  (newValue: any) => {
    setValue(newValue);
  }
);
</script>

<template>
  <div
    :class="[className, { 'has-error': !!errorMessage, success: meta.valid }]"
  >
    <label
      :for="name"
      v-if="label"
      class="block text-sm font-semibold text-gray-700 sm:pt-1.5"
    >
      {{ label }}
      <span
        v-show="subLabel"
        class="w-[210px] text-slate-600 text-sm font-normal leading-normal"
      >
        <br />
        {{ subLabel }}
      </span></label
    >
    <div class="mt-2 sm:col-span-2 sm:mt-0">
      <div class="relative">
        <div class="flex flex-col gap-y-1.5 relative">
          <div
            :class="
              errorMessage
                ? 'border border-red-300 flex relative rounded-md ring-0 ring-inset ring-gray-300 '
                : 'flex relative rounded-md '
            "
          >
            <input
              :name="name"
              :id="name"
              :type="type"
              :value="inputValue"
              :placeholder="placeholder"
              :autofocus="autofocus"
              :disabled="disabled"
              @input="handleChange"
              @blur="handleBlur"
              class="form-input w-full"
              :class="{ 'has-error': errorMessage }"
            />
          </div>
          <!-- class="block flex-1 placeholder:pl-1.5 py-2.5 pl-3.5 text-gray-900 placeholder:text-gray-500 placeholder:text-base placeholder:font-normal sm:text-sm sm:leading-6" -->
          <p
            class="text-red-500 text-sm font-normal leading-tight"
            v-show="errorMessage || meta.valid"
          >
            {{ errorMessage || successMessage }}
          </p>
        </div>
        <div v-if="errorMessage" class="absolute right-2 top-3">
          <SvgoAlertCircle class="h-4" />
        </div>
      </div>
    </div>
  </div>
</template>
