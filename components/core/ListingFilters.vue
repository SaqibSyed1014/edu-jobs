<script setup lang="ts">
const props = defineProps<{ filtrationList: any[] }>()

const emits = defineEmits(['closeFilterSidebar'])

const initialFilterState = ref(structuredClone(toRaw(props.filtrationList)))

const filterState = ref(props.filtrationList)

function resetFilters() {
  filterState.value = structuredClone(toRaw(initialFilterState.value))
}

const updateChecked = (index: number, subIndex: number, checked: boolean) => {
  filterState.value[index].list[subIndex].checked = checked;
};
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
      <span @click="resetFilters" class="text-brand-700 text-sm cursor-pointer">
          Clear All
      </span>
    </div>

    <template v-for="(filter, index) in filterState">
      <div>
        <div class="flex items-center gap-3 font-semibold">
          <component :is="filter.icon" class="w-5 h-5 text-gray-500" />
          <span class="">{{ filter.title }}</span>
        </div>
        <div class="filter-list pl-8 border-b border-gray-200">
          <template v-if="filter.type === 'checkbox'">
            <template v-for="(item, i) in filter.list">
              <div class="flex items-center gap-3 first:pt-2 pb-4">
                <div class="shrink-0 relative">
                  <input :checked="item.checked" @change="updateChecked(index, i, $event.target.checked)"
                         :id="`filter-cb-${index}-${i}`" type="checkbox">
                </div>
                <label :for="`filter-cb-${index}-${i}`" class="font-medium cursor-pointer">
                  {{ item.label }}
                  <span class="text-gray-400 font-normal">({{ item.counts }})</span>
                </label>
              </div>
            </template>
          </template>
          <template v-else-if="filter.type === 'range'">
            <RangeSlider :max-value="filter.max" :min-value="filter.min"  />
            <div class="flex gap-3 first:pt-2 pb-4 pt-12">
              <div class="shrink-0 relative">
                <input :checked="true" type="checkbox">
              </div>
              <label class="font-medium cursor-pointer">
                Include jobs without salary
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
