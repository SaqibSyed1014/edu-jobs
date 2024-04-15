<script lang="ts" setup>
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { Form, Field, ErrorMessage } from "vee-validate";

interface Props {
  name?: string;
  placeholder?: string;
  enableTimePicker?: boolean;
  values: string;
  error: string;
}

const props = withDefaults(defineProps<Props>(), {
  name: "",
  placeholder: "",
  enableTimePicker: true,
  values: "",
  error: "",
});

const date = ref(props?.values ?? "");

const onInput = (event: Event) => {
  // Update the value of `date` with the input's value
  date.value = (event.target as HTMLInputElement).value;
};

const format = (date: any) => {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};
const textInputOptions = {
  format: "MM/dd/yyyy",
};
</script>

<template>
  <div class="relative">
    <Datepicker
      v-model="date"
      class="fixed-input-icon"
      :format="format"
      placeholder="March 25, 2024"
      autoApply
      :text-input="textInputOptions"
      :enable-time-picker="false"
    >
      <template #input-icon> </template>
      <template #dp-input="{ value }">
        <input
          type="text"
          class="form-input w-full"
          placeholder="March 25, 2024"
          :value="value"
          @input="onInput"
          :class="{ 'has-error': error }"
        />
        <TextInput
          :name="name"
          class="sr-only"
          placeholder="March 25, 2024"
          :value="value"
          input-class="pl-5"
          label=""
          subLabel=""
        />
      </template>
    </Datepicker>
    <SvgoCalendar class="absolute h-5 top-4 right-3" />

    <ErrorMessage
      class="text-red-500 text-sm font-normal leading-tight"
      :name="name"
    />
  </div>
</template>

<style>
.dp__month_year_select {
  width: 20%;
}

.dp__month_year_wrap {
  align-items: center;
  justify-content: center;
}

.dp__active_date {
  @apply bg-brand-600 !text-white;
}

.dp__today {
  @apply border border-brand-600;
}

.dp__calendar_header {
  @apply leading-6 text-sm font-medium text-gray-500;
}

.dp__cell_inner {
  @apply text-gray-900 font-semibold text-sm;
}

.dp__icon {
  @apply stroke-gray-600;
}
</style>
