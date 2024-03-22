<script setup>
import ChevronRight from "~/assets/icons/chevron-right.svg";
import ArrowLeftBlue from "~/assets/icons/arrow-left-blue.svg";

const activeTab = ref(0); // Default to first tab

// Array of tab names and icons
const tabs = ref([
  { name: "About School District" },
  { name: "List of Schools" },
  { name: "Photos" },
  { name: "Videos" },
]);
</script>

<style>
/* Adjust styles as needed */
</style>

<template>
  <div class="border-t border-gray-200">
    <div class="container flex">
      <!-- Sidebar -->
      <aside class="w-64 flex flex-col border-r border-gray-200 pt-8">
        <!-- Tabs -->
        <div class="flex flex-col flex-grow">
          <!-- Loop through tabs -->
          <button
            v-for="(tab, index) in tabs"
            :key="index"
            :class="
              activeTab === index
                ? 'text-brand-800 text-sm font-semibold py-2 px-3 flex items-center justify-between border-l-2 border-brand-600'
                : 'py-2 px-3 flex items-center justify-between text-sm text-gray-500 '
            "
            @click="activeTab = index"
          >
            <span>{{ tab.name }}</span>
          </button>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-grow pt-8 pb-10">
        <!-- Content for each tab -->
        <div v-show="activeTab === 0">
          <div class="w-full h-5 justify-between items-start inline-flex">
            <div class="pl-3 justify-start items-center gap-3 flex">
              <div class="justify-center items-center flex">
                <div class="text-slate-600 text-sm font-medium leading-tight">
                  School districts
                </div>
              </div>
              <ChevronRight class="size-4" />
              <div class="justify-center items-center flex">
                <div class="text-blue-800 text-sm font-semibold leading-tight">
                  Palo alto unified school districts
                </div>
              </div>
            </div>
            <div class="justify-center items-center gap-1.5 flex">
              <ArrowLeftBlue class="size-5" />
              <div class="text-blue-800 text-sm font-semibold leading-tight">
                Back
              </div>
            </div>
          </div>

          <div class="pt-5">
            <img
              src="/images/schoolDistrict/cover.webp"
              class="h-60 w-full object-cover"
            />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
