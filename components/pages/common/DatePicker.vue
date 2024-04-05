<script lang="ts" setup>
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

interface Props {
  name?: string;
  placeholder?: string;
  enableTimePicker?: boolean;
}

withDefaults(defineProps<Props>(), {
  name: "",
  placeholder: "",
  enableTimePicker: true,
});

const date = ref("");

const format = (date: any) => {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};
</script>

<template>
  <div class="relative">
    <Datepicker
      v-model="date"
      :min-date="new Date()"
      class="fixed-input-icon"
      :format="format"
      placeholder="March 25, 2024"
      autoApply
      :enable-time-picker="enableTimePicker"
    >
      <template #input-icon> </template>
      <template #dp-input="{ value }">
        <TextInput
          :name="name"
          placeholder="March 25, 2024"
          :value="value"
          input-class="pl-5"
          label=""
          subLabel=""
        />
      </template>
    </Datepicker>
    <SvgoCalendar class="absolute h-5 top-4 right-3" />
  </div>
</template>
