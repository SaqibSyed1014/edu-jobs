<script setup lang="ts">
defineProps<{ filtrationList: any[] }>()

const emits = defineEmits(['closeFilterSidebar'])
</script>

<template>
  <div class="flex flex-col gap-3 max-md:h-screen max-md:overflow-y-auto">
    <div @click="emits('closeFilterSidebar')" class="flex justify-end md:hidden">
      <SvgoXClose class="w-4 h-4" />
    </div>
    <div class="flex justify-between items-center font-semibold border-b border-gray-200 py-2">
      <div class="flex justify-center items-center gap-3 text-gray-700">
        <SvgoFilter class="w-4 h-4" />
        <p>Filters</p>
      </div>
      <span class="text-brand-700 text-sm cursor-pointer">
          Clear All
        </span>
    </div>

    <template v-for="filter in filtrationList">
      <div>
        <div class="flex items-center gap-3 font-semibold">
          <component :is="filter.icon" class="w-5 h-5 text-gray-500" />
          <span class="">{{ filter.title }}</span>
        </div>
        <div class="filter-list pl-8 border-b border-gray-200">
          <template v-for="(item, i) in filter.list">
            <div class="flex items-center gap-3 first:pt-2 pb-4">
              <div class="shrink-0 relative">
                <input :id="`filter-cb-${i}`" type="checkbox" :checked="item.checked">
              </div>
              <label :for="`filter-cb-${i}`" class="cursor-pointer">
                {{ item.label }}
                <span class="text-gray-400 font-normal">({{ item.counts }})</span>
              </label>
            </div>
          </template>
        </div>
      </div>
    </template>

    <div class="md:hidden">
      <BaseButton label="Apply" :full-sized="true" />
    </div>
  </div>
</template>
