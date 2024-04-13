<template>
  <div
    class="max-w-md p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded-lg shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
  >
    <div class="mt-4 flex">
      <div class="w-12 h-12 bg-gray-200 rounded-full mr-2" />
      <div class="flex flex-col items-end justify-end">
        <div class="w-20 h-2.5 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        <div
          class="w-20 h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 mt-2"
        ></div>
      </div>
    </div>
    <div class="pt-5 flex flex-col gap-4">
      <div
        class="rounded-md w-20 inline-flex items-center space-x-1.5 px-1.5 py-0.5 shadow border border-gray-300"
      >
        <div class="size-4 bg-gray-200 rounded-full" />
        <span
          class="text-center h-2 w-20 bg-gray-200 text-gray-700 text-xs md:text-sm font-medium leading-tight"
        >
        </span>
      </div>

      <div class="inline-flex items-center text-center space-x-2">
        <div class="size-5 bg-gray-200 rounded-full" />
        <span
          class="text-gray-600 h-2 w-20 bg-gray-200 text-xs md:text-sm font-medium leading-tight"
        >
        </span>
      </div>

      <div class="inline-flex space-x-3">
        <div class="inline-flex items-center text-center space-x-2">
          <div class="size-5 bg-gray-200 rounded-full" />
          <span
            class="text-gray-600 h-2 w-20 bg-gray-200 text-xs md:text-sm font-medium leading-tight"
          >
          </span>
        </div>
        <div class="inline-flex items-center text-center space-x-2">
          <div class="size-5 bg-gray-200 rounded-full" />
          <span
            class="text-gray-600 h-2 w-20 bg-gray-200 text-sm font-medium leading-tight"
          >
          </span>
        </div>
      </div>
    </div>
    <span class="sr-only">Loading...</span>
  </div>
</template>
