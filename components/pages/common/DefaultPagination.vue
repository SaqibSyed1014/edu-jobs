<script setup lang="ts">
import { ref, computed } from "vue";
// import ArrowLeftIcon from "assets/icons/arrowLeft.svg";

const currentPage = ref(1); // Example current page
const totalPages = ref(10); // Example total pages

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

// Function to handle pagination
const paginate = (page: number | "prev" | "next") => {
  if (page === "prev") {
    currentPage.value--;
  } else if (page === "next") {
    currentPage.value++;
  } else {
    currentPage.value = page;
  }
};
</script>

<template>
  <nav aria-label="Page navigation example">
    <ul class="inline-flex justify-between -space-x-px text-base w-full">
      <li>
        <a
          href="#"
          class="flex items-center gap-x-1.5 py-2 justify-center text-sm px-3 ms-0 leading-tight text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          @click.prevent="paginate('prev')"
        >
          <SvgoArrowLeft class="size-5" />
          <span class="hidden sm:block">Previous</span></a
        >
      </li>
      <div class="sm:inline-flex hidden">
        <li
          v-for="pageNumber in displayedPages"
          :key="pageNumber"
          :class="{ 'text-center items-center': pageNumber !== '...' }"
        >
          <a
            href="#"
            :class="[
              pageNumber === currentPage
                ? 'flex items-center justify-center px-3 py-2 leading-tight text-gray-800 bg-gray-100 hover:text-gray-700'
                : 'flex items-center justify-center px-3 py-2 leading-tight text-gray-600 hover:text-gray-700',
            ]"
            @click.prevent="paginate(pageNumber as number)"
            ><span class="">{{ pageNumber }}</span>
          </a>
        </li>
      </div>
      <span
        class="sm:hidden flex items-center text-slate-700 text-sm font-normal"
        >Page {{ currentPage + " of " + totalPages }}</span
      >
      <li>
        <a
          href="#"
          class="flex items-center gap-x-1.5 justify-center text-sm px-3 py-2 ms-0 leading-tight text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          @click.prevent="paginate('next')"
        >
          <span class="hidden sm:block"> Next </span>
          <SvgoArrowLeft class="size-5 rotate-180" />
        </a>
      </li>
    </ul>
  </nav>
</template>
