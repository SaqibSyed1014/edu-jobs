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

const emit = defineEmits(['onInput'])

const date = ref(props?.values ?? "");

// const onInput = (event: Event) => {
//   // Update the value of `date` with the input's value
//   date.value = (event.target as HTMLInputElement).value;
// };

// const format = (date: any) => {
//   return date.toLocaleDateString("en-US", {
//     month: "long",
//     day: "numeric",
//     year: "numeric",
//   });
// };
const textInputOptions = {
  format: "MM/dd/yyyy",
};

watch(() => date.value, (val) => {
  emit('onInput', val)
})
</script>

<template>
  <div class="relative">
    <Datepicker
      v-model="date"
      class="fixed-input-icon"
      autoApply
      :text-input="textInputOptions"
      :enable-time-picker="false"
    >
      <template #input-icon> </template>
      <template #dp-input="{ value, onBlur, onInput, onEnter, onTab, onPaste }">
        <input
          type="text"
          class="form-input w-full"
          placeholder="MM/DD/YYYY"
          :value="value"
          @input="onInput"
          @keydown.enter="onEnter"
          @blur="onBlur"
          @keydown.tab="onTab"
          @paste="onPaste"
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
    <SvgoCalendar class="absolute h-5 top-3 right-3" />

    <ErrorMessage
      class="text-red-500 text-sm font-normal leading-tight"
      :name="name"
    />
  </div>
</template>

<style>
.dp__menu_inner {
  @apply rounded-lg bg-white p-4 shadow-lg;
}

.dp__arrow_bottom {
  @apply bg-white transform-none;
}
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
  @apply font-semibold text-sm;
}

.dp__icon {
  @apply stroke-gray-600;
}
</style>
