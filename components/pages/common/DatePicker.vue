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
  format: "MM.dd.yyyy HH:mm",
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
    >
      <template #input-icon> </template>
      <template #dp-input="{ value, onEnter, onTab, onBlur, onPaste }">
        <input
          type="text"
          class="form-input w-full"
          placeholder="March 25, 2024"
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
    <SvgoCalendar class="absolute h-5 top-4 right-3" />

    <ErrorMessage
      class="text-red-500 text-sm font-normal leading-tight"
      :name="name"
    />
  </div>
</template>
