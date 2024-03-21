<script setup lang="ts">
import FilterLines from "~/assets/icons/filterLines.svg";
import BriefCase from "~/assets/icons/brief-case.svg";
import GraduationHat from "~/assets/icons/graduation-hat.svg";
import Building from "~/assets/icons/building.svg";

const jobOptions = ref([
  { id: "1", label: "0 to 10", checked: false },
  { id: "2", label: "11 to 50", checked: true },
  { id: "3", label: "51 to 100", checked: false },
  { id: "4", label: "100+", checked: false },
]);

const stuOptions = ref([
  { id: "1", label: "0 to 100", checked: false },
  { id: "2", label: "101 to 500", checked: false },
  { id: "3", label: "501 to 1000", checked: true },
  { id: "4", label: "1001 to 2000", checked: false },
  { id: "4", label: "2001 to 3000", checked: false },
  { id: "4", label: "3001 to 5000", checked: false },
  { id: "4", label: "5001 to 10,000", checked: false },
  { id: "4", label: "10,000+", checked: false },
]);

const schOptions = ref([
  { id: "1", label: "0 to 10", checked: false },
  { id: "2", label: "11 to 25", checked: true },
  { id: "3", label: "26 to 50", checked: false },
  { id: "4", label: "51 to 100", checked: false },
]);

const clearAll = () => {
  jobOptions?.value?.forEach((option: any) => {
    option.checked = false;
  });

  stuOptions?.value?.forEach((option: any) => {
    option.checked = false;
  });

  schOptions?.value?.forEach((option: any) => {
    option.checked = false;
  });
};
</script>

<template>
  <div class="py-2 flex-col justify-start items-start gap-2.5 inline-flex">
    <div
      class="justify-between items-center inline-flex w-full border-b border-gray-200 pb-2"
    >
      <div class="justify-start items-center gap-3 flex">
        <FilterLines class="size-6" />
        <div class="text-gray-700 text-base font-semibold leading-normal">
          Filters
        </div>
      </div>
      <div class="justify-center items-center gap-1.5 flex">
        <button
          @click="clearAll"
          class="text-brand-800 text-sm font-semibold leading-tight"
        >
          Clear All
        </button>
      </div>
    </div>

    <div class="divide-y divide-gray-200">
      <FilterSection
        title="No. of Jobs"
        :options="jobOptions"
        :icon-component="BriefCase"
        total-jobs="125"
      />

      <FilterSection
        title="No. of students"
        :options="stuOptions"
        :icon-component="GraduationHat"
        total-jobs="12,000"
      />

      <FilterSection
        title="No. of schools"
        :options="schOptions"
        :icon-component="Building"
        total-jobs="13"
      />
    </div>
  </div>
</template>
