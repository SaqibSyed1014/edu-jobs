<script setup lang="ts">
import { ref } from "vue";
import ListIcon from "~/assets/icons/list.svg";
import GridIcon from "~/assets/icons/grid.svg";

import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import FilterLines from "~/assets/icons/filterLines.svg";
import SearchIcon from "~/assets/icons/search-icon.svg";

const capitals = ref<string[]>([]); // Declare capitals as a ref of type string array
for (let i = 65; i <= 90; i++) {
  capitals.value.push(String.fromCharCode(i));
}

const sidebarOpen = ref(false);
const isGridView = ref(true); // Reactive variable to store the current view mode
const selectedAlphabet = ref<number>(0); // Reactive variable to store the selected alphabet index

const schoolList = ref([
  {
    avatar: "/images/schoolLogo/Avatar1.png",
    schoolName: "Palo Alto Unified School District",
  },
  {
    avatar: "/images/schoolLogo/avatar2.png",
    schoolName: "San Dieguito Union High School District",
  },
  {
    avatar: "/images/schoolLogo/avatar3.png",
    schoolName: "Arcadia Unified School District",
  },
  {
    avatar: "/images/schoolLogo/avatar4.png",
    schoolName: "Saratoga Joint Union High School District",
  },
  {
    avatar: "/images/schoolLogo/avatar5.png",
    schoolName: "Palo Alto Unified School Districts",
  },
  {
    avatar: "/images/schoolLogo/avatar6.png",
    schoolName: "San Dieguito Union High School District",
  },
  {
    avatar: "/images/schoolLogo/avatar7.png",
    schoolName: "Arcadia Unified School District",
  },
  {
    avatar: "/images/schoolLogo/avatar8.png",
    schoolName: "Saratoga Joint Union High School District",
  },

  {
    avatar: "/images/schoolLogo/avatar9.png",
    schoolName: "Palo Alto Unified School Districts",
  },
  {
    avatar: "/images/schoolLogo/avatar10.png",
    schoolName: "San Dieguito Union High School District",
  },
  {
    avatar: "/images/schoolLogo/avatar11.png",
    schoolName: "Arcadia Unified School District",
  },
  {
    avatar: "/images/schoolLogo/avatar12.png",
    schoolName: "Saratoga Joint Union High School District",
  },
]);

// Function to switch to list view
const switchToListView = () => {
  isGridView.value = false;
};

// Function to switch to grid view
const switchToGridView = () => {
  isGridView.value = true;
};

const selectAlphabet = (index: number) => {
  selectedAlphabet.value = index;
};
</script>

<template>
  <div class="container flex pb-20 w-full">
    <!-- For Mobile -->
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog
        as="div"
        class="relative z-50 xl:hidden"
        @close="sidebarOpen = false"
      >
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-900/80" />
        </TransitionChild>

        <div class="fixed inset-0 flex">
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <DialogPanel
              class="relative flex pb-20 overflow-scroll w-full max-w-xs flex-1 px-4 pt-5 bg-white"
            >
              <TransitionChild
                as="template"
                enter="ease-in-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in-out duration-300"
                leave-from="opacity-100"
                leave-to="opacity-0"
              >
                <div
                  class="absolute -right-16 top-0 flex w-16 justify-center pt-5"
                >
                  <button
                    type="button"
                    class="-m-2.5 p-2.5"
                    @click="sidebarOpen = false"
                  >
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <DistrictsFilters />
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- for desktop -->
    <div class="hidden xl:inset-y-0 xl:z-50 xl:flex xl:w-1/5 xl:flex-col">
      <div
        class="flex grow flex-col gap-y-5 pt-8 overflow-y-auto border-r pr-4 border-gray-200 bg-transparent ring-1 ring-white/5"
      >
        <DistrictsFilters />
      </div>
    </div>

    <div class="w-full xl:w-4/5 xl:px-8 pt-8">
      <div class="flex-col justify-start items-start gap-1 inline-flex">
        <div class="text-gray-900 text-3xl font-semibold leading-[38px]">
          School Districts
        </div>
        <div class="text-gray-600 text-base font-normal leading-normal">
          Find job openings at any school in any district.
        </div>
      </div>

      <div class="pt-8 flex sm:flex-row flex-col gap-4 justify-between">
        <form class="flex flex-1" action="#" method="GET">
          <label for="search-field" class="sr-only">Search</label>
          <div class="relative">
            <SearchIcon
              class="pointer-events-none absolute inset-y-0 left-2 h-full w-5 text-gray-500"
              aria-hidden="true"
            />
            <input
              id="search-field"
              class="block h-full w-[320px] shadow border border-gray-300 bg-transparent py-[13px] pl-8 pr-0 text-black focus:ring-0 sm:text-sm"
              placeholder="Search..."
              type="search"
              name="search"
            />
          </div>
        </form>

        <div class="inline-flex">
          <div class="z-40 flex shrink-0 items-center shadow-sm pr-3">
            <button
              type="button"
              class="size-11 flex items-center text-black xl:hidden rounded-lg shadow border border-gray-300 justify-center"
              @click="sidebarOpen = true"
            >
              <span class="sr-only">Open sidebar</span>
              <FilterLines class="size-6" />
            </button>
          </div>

          <div class="rounded-lg shadow justify-start items-start inline-flex">
            <button
              type="button"
              @click="switchToListView"
              :class="{
                'pl-3.5 pr-4 py-[11px] rounded-s-lg justify-center bg-white border border-gray-300 h-full items-center gap-2 flex':
                  isGridView,
                'pl-3.5 pr-4 py-[11px] rounded-s-lg justify-center bg-gray-50 border border-gray-300 h-full items-center gap-2 flex':
                  !isGridView,
              }"
            >
              <ListIcon class="size-5" />
              <div class="text-slate-700 text-sm font-semibold leading-tight">
                List
              </div>
            </button>
            <button
              type="button"
              @click="switchToGridView"
              :class="{
                'pl-3.5 pr-4 py-[11px] rounded-e-lg justify-center bg-gray-50 border border-gray-300 h-full items-center gap-2 flex':
                  isGridView,
                'pl-3.5 pr-4 py-[11px] rounded-e-lg justify-center bg-white border border-gray-300 h-full items-center gap-2 flex':
                  !isGridView,
              }"
            >
              <GridIcon class="size-5" />
              <div class="text-gray-800 text-sm font-semibold leading-tight">
                Grid
              </div>
            </button>
          </div>
        </div>
      </div>

      <div class="pt-6 w-full gap-2 flex flex-col xl:flex-row">
        <div>
          <p class="text-gray-500 text-sm font-semibold !w-[139px]">
            Search by alphabet
          </p>
        </div>

        <div
          class="flex flex-wrap gap-2.5 sm:gap-x-0 items-center w-full justify-between"
        >
          <div v-for="(capital, index) in capitals" :key="index" class="pr-1.5">
            <button
              :class="[
                index === selectedAlphabet
                  ? 'text-blue-800 border-b-2 border-blue-800'
                  : '',
              ]"
              @click="selectAlphabet(index)"
            >
              {{ capital }}
            </button>
          </div>
          <div class="text-brand-800 text-sm font-semibold leading-tight">
            Clear
          </div>
        </div>
      </div>

      <div class="border-t mt-1.5 mb-8 border-gray-200">
        <!-- Grid View -->
        <div
          v-if="isGridView"
          class="grid sm:grid-cols-2 pt-8 lg:grid-cols-3 gap-6"
        >
          <div v-for="(item, index) in schoolList" :key="index">
            <DIstrictGridCard :data="item" />
          </div>
        </div>
        <!-- Lsit View -->
        <div v-if="!isGridView" class="grid gap-6 pt-8">
          <div v-for="(item, index) in schoolList" :key="index">
            <DistrictListCard :data="item" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
