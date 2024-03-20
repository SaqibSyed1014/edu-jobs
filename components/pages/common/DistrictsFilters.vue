<script setup lang="ts">
import FilterLines from "~/assets/icons/filterLines.svg";
import BriefCase from "~/assets/icons/brief-case.svg";
import GraduationHat from "~/assets/icons/graduation-hat.svg";
import Building from "~/assets/icons/building.svg";
</script>

<template>
  <!-- Sidebar component, swap this element with another sidebar if you like -->

  <div
    class="py-2 border-b border-gray-200 flex-col justify-start items-start gap-2.5 inline-flex"
  >
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
        <div class="text-brand-800 text-sm font-semibold leading-tight">
          Clear All
        </div>
      </div>
    </div>

    <div class="inline-flex items-center space-x-3 pt-6 w-full">
      <BriefCase class="size-6" />
      <div>
        <span class="text-slate-700 text-base font-semibold leading-normal"
          >No. of jobs </span
        ><span class="text-gray-400 text-base font-normal leading-normal"
          >(125)</span
        >
      </div>
    </div>

    <div class="flex flex-col gap-6 pl-8 border-b border-gray-200 pb-2 w-full">
      <div class="relative flex gap-x-3">
        <div class="flex h-6 items-center">
          <input
            id="comments"
            name="comments"
            type="checkbox"
            class="h-4 w-4 rounded-md border border-gray-300 text-brand-600 focus:ring-brand-600"
          />
        </div>

        <p class="text-gray-700 text-base font-medium">0 to 10</p>
      </div>
      <div class="relative flex gap-x-3">
        <div class="flex h-6 items-center">
          <input
            id="comments"
            name="comments"
            type="checkbox"
            class="h-4 w-4 rounded-md border border-gray-300 text-brand-600 focus:ring-brand-600"
          />
        </div>

        <p class="text-gray-700 text-base font-medium">11 to 50</p>
      </div>
      <div class="relative flex gap-x-3">
        <div class="flex h-6 items-center">
          <input
            id="comments"
            name="comments"
            type="checkbox"
            checked
            class="h-4 w-4 rounded-md border border-gray-300 text-brand-600 focus:ring-brand-600"
          />
        </div>

        <p class="text-gray-700 text-base font-medium">51 to 100</p>
      </div>
      <div class="relative flex gap-x-3">
        <div class="flex h-6 items-center">
          <input
            id="comments"
            name="comments"
            type="checkbox"
            class="h-4 w-4 rounded-md border border-gray-300 text-brand-600 focus:ring-brand-600"
          />
        </div>

        <p class="text-gray-700 text-base font-medium">100+</p>
      </div>
    </div>

    <div class="inline-flex items-center space-x-3 pt-6 w-full">
      <GraduationHat class="size-6" />
      <div>
        <span class="text-slate-700 text-base font-semibold leading-normal"
          >No. of students </span
        ><span class="text-gray-400 text-base font-normal leading-normal"
          >(12,000)</span
        >
      </div>
    </div>

    <div class="flex flex-col gap-6 pl-8 border-b border-gray-200 pb-2 w-full">
      <div class="relative flex gap-x-3">
        <div class="flex h-6 items-center">
          <input
            id="comments"
            name="comments"
            type="checkbox"
            class="h-4 w-4 rounded-md border border-gray-300 text-brand-600 focus:ring-brand-600"
          />
        </div>

        <p class="text-gray-700 text-base font-medium">0 to 100</p>
      </div>
      <div class="relative flex gap-x-3">
        <div class="flex h-6 items-center">
          <input
            id="comments"
            name="comments"
            type="checkbox"
            class="h-4 w-4 rounded-md border border-gray-300 text-brand-600 focus:ring-brand-600"
          />
        </div>

        <p class="text-gray-700 text-base font-medium">101 to 500</p>
      </div>
      <div class="relative flex gap-x-3">
        <div class="flex h-6 items-center">
          <input
            id="comments"
            name="comments"
            type="checkbox"
            class="h-4 w-4 rounded-md border border-gray-300 text-brand-600 focus:ring-brand-600"
          />
        </div>

        <p class="text-gray-700 text-base font-medium">501 to 1000</p>
      </div>
      <div class="relative flex gap-x-3">
        <div class="flex h-6 items-center">
          <input
            id="comments"
            name="comments"
            type="checkbox"
            checked
            class="h-4 w-4 rounded-md border border-gray-300 text-brand-600 focus:ring-brand-600"
          />
        </div>

        <p class="text-gray-700 text-base font-medium">1001 to 2000</p>
      </div>
      <div class="relative flex gap-x-3">
        <div class="flex h-6 items-center">
          <input
            id="comments"
            name="comments"
            type="checkbox"
            class="h-4 w-4 rounded-md border border-gray-300 text-brand-600 focus:ring-brand-600"
          />
        </div>

        <p class="text-gray-700 text-base font-medium">2001 to 3000</p>
      </div>
      <div class="relative flex gap-x-3">
        <div class="flex h-6 items-center">
          <input
            id="comments"
            name="comments"
            type="checkbox"
            class="h-4 w-4 rounded-md border border-gray-300 text-brand-600 focus:ring-brand-600"
          />
        </div>

        <p class="text-gray-700 text-base font-medium">3001 to 5000</p>
      </div>
      <div class="relative flex gap-x-3">
        <div class="flex h-6 items-center">
          <input
            id="comments"
            name="comments"
            type="checkbox"
            class="h-4 w-4 rounded-md border border-gray-300 text-brand-600 focus:ring-brand-600"
          />
        </div>

        <p class="text-gray-700 text-base font-medium">5001 to 10,000</p>
      </div>
      <div class="relative flex gap-x-3">
        <div class="flex h-6 items-center">
          <input
            id="comments"
            name="comments"
            type="checkbox"
            class="h-4 w-4 rounded-md border border-gray-300 text-brand-600 focus:ring-brand-600"
          />
        </div>

        <p class="text-gray-700 text-base font-medium">10,000+</p>
      </div>
    </div>

    <div class="inline-flex items-center space-x-3 pt-6">
      <Building class="size-6" />
      <div>
        <span class="text-slate-700 text-base font-semibold leading-normal"
          >No. of colleges </span
        ><span class="text-gray-400 text-base font-normal leading-normal"
          >(13)</span
        >
      </div>
    </div>

    <div class="flex flex-col gap-6 pl-8 pb-2 w-full">
      <div class="relative flex gap-x-3">
        <div class="flex h-6 items-center">
          <input
            id="comments"
            name="comments"
            type="checkbox"
            class="h-4 w-4 rounded-md border border-gray-300 text-brand-600 focus:ring-brand-600"
          />
        </div>

        <p class="text-gray-700 text-base font-medium">0 to 10</p>
      </div>

      <div class="relative flex gap-x-3">
        <div class="flex h-6 items-center">
          <input
            id="comments"
            name="comments"
            type="checkbox"
            class="h-4 w-4 rounded-md border border-gray-300 text-brand-600 focus:ring-brand-600"
          />
        </div>

        <p class="text-gray-700 text-base font-medium">11 to 25</p>
      </div>
      <div class="relative flex gap-x-3">
        <div class="flex h-6 items-center">
          <input
            id="comments"
            name="comments"
            checked
            type="checkbox"
            class="h-4 w-4 rounded-md border border-gray-300 text-brand-600 focus:ring-brand-600"
          />
        </div>

        <p class="text-gray-700 text-base font-medium">26 to 50</p>
      </div>
      <div class="relative flex gap-x-3">
        <div class="flex h-6 items-center">
          <input
            id="comments"
            name="comments"
            type="checkbox"
            class="h-4 w-4 rounded-md border border-gray-300 text-brand-600 focus:ring-brand-600"
          />
        </div>

        <p class="text-gray-700 text-base font-medium">51 to 100</p>
      </div>
    </div>
  </div>
</template>
