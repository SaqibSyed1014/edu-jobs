<script setup lang="ts">
defineProps<{
  title: String;
  options: any[];
  icon: Object;
  totalJobs: string;
}>();
</script>

<template>
  <div
    class="py-2 divide divide-gray-200 flex-col justify-start items-start gap-5 inline-flex w-full"
  >
    <div class="justify-between items-center inline-flex w-full pb-2">
      <div class="justify-start items-center gap-3 flex">
        <!-- <component :is="" class="w-5 h-5 text-gray-500" /> -->
        <component :is="icon" class="size-6" />
        <div class="text-gray-700 text-base font-semibold leading-normal">
          {{ title }}
        </div>
        <span class="text-gray-400 text-base font-normal leading-normal"
          >({{ totalJobs }})</span
        >
      </div>
    </div>

    <!-- Checkbox inputs -->
    <div
      class="pl-9 relative flex gap-x-6"
      v-for="option in options"
      :key="option.id"
    >
      <div class="flex h-6 items-center">
        <input
          :id="option.id"
          :name="option.id"
          type="checkbox"
          class="h-4 w-4 rounded-md border border-gray-300 text-brand-600 focus:ring-brand-600"
          :checked="option.checked"
        />
      </div>
      <label :for="option.id" class="text-gray-700 text-base font-medium">{{
        option.label
      }}</label>
    </div>
  </div>
</template>
