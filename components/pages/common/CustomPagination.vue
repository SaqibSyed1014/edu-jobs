<script setup lang="ts">
import { ref, computed, defineProps, watch } from "vue";

// Props
const props = defineProps<{ currentPage: number; totalPages: number }>();

// State
const currentPage = ref(props.currentPage);
const totalPages = ref(Math.ceil(props.totalPages / 12));

// Watch for changes in props
watch(
  () => props.currentPage,
  (newValue) => {
    currentPage.value = newValue;
  }
);

watch(
  () => props.totalPages,
  (newValue) => {
    totalPages.value = newValue;
  }
);

// Calculate the range of displayed page numbers
const displayedPages = computed(() => {
  const pages = [];
  const numPages = totalPages.value;

  // Display the first three pages
  for (let i = 1; i <= Math.min(3, numPages); i++) {
    pages.push(i);
  }

  // Display ellipsis if there are more than six pages
  if (numPages > 6 && currentPage.value > 3) {
    pages.push("...");
  }

  // Display three pages before the current page, the current page, and three pages after
  const startPage = Math.max(currentPage.value - 3, 4);
  const endPage = Math.min(currentPage.value + 3, numPages - 3);
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  // Display ellipsis if there are more than six pages and the current page is not close to the last three pages
  if (numPages > 6 && currentPage.value < numPages - 2) {
    pages.push("...");
  }

  // Display the last three pages
  for (let i = numPages - 2; i <= numPages; i++) {
    pages.push(i);
  }

  return pages;
});
</script>

<template>
  <nav aria-label="Page navigation example">
    <ul class="inline-flex justify-between -space-x-px text-base w-full">
      <li>
        <button
          type="button"
          class="flex items-center gap-x-1.5 py-2 justify-center text-sm px-3 ms-0 leading-tight text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          @click="$emit('paginate', 'prev')"
        >
          <SvgoArrowLeft class="w-4 h-4 text-gray-600" />
          <span class="hidden sm:block">Previous</span>
        </button>
      </li>
      <div class="sm:inline-flex hidden">
        <li
          v-for="pageNumber in displayedPages"
          :key="pageNumber"
          :class="{ 'text-center items-center': pageNumber !== '...' }"
        >
          <button
            type="button"
            :class="[
              pageNumber === currentPage
                ? 'flex items-center justify-center px-3 py-2 leading-tight text-gray-800 bg-gray-100 hover:text-gray-700'
                : 'flex items-center justify-center px-3 py-2 leading-tight text-gray-600 hover:text-gray-700',
            ]"
            @click="pageNumber === '...' ? '' : $emit('paginate', pageNumber)"
          >
            <span class="">{{ pageNumber }}</span>
          </button>
        </li>
      </div>
      <span
        class="sm:hidden flex items-center text-slate-700 text-sm font-normal"
        >Page {{ currentPage + " of " + totalPages }}</span
      >
      <li>
        <button
          type="button"
          class="flex items-center gap-x-1.5 justify-center text-sm px-3 py-2 ms-0 leading-tight text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          @click="$emit('paginate', 'next')"
        >
          <span class="hidden sm:block"> Next </span>
          <SvgoArrowRight class="w-4 h-4 text-gray-600" />
        </button>
      </li>
    </ul>
  </nav>
</template>
