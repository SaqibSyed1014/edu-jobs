<script setup lang="ts">
import { ref } from "vue";
import FilterLines from "~/assets/icons/filterLines.svg";
import BriefCase from "~/assets/icons/brief-case.svg";
import GraduationHat from "~/assets/icons/graduation-hat.svg";
import Building from "~/assets/icons/building.svg";
import ListIcon from "~/assets/icons/list.svg";
import GridIcon from "~/assets/icons/grid.svg";

import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { Bars3Icon, MagnifyingGlassIcon } from "@heroicons/vue/20/solid";

const capitals = ref([]);
for (let i = 65; i <= 90; i++) {
  capitals.value.push(String.fromCharCode(i));
}

const sidebarOpen = ref(false);
</script>

<template>
  <div class="container flex pb-20">
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
              class="relative mr-16 flex w-full max-w-xs flex-1 pl-10 pt-5 bg-white"
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
                  class="absolute left-full top-0 flex w-16 justify-center pt-5"
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
              <!-- Sidebar component, swap this element with another sidebar if you like -->
              <DistrictsFilters />
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div class="hidden xl:inset-y-0 xl:z-50 xl:flex xl:w-1/5 xl:flex-col">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div
        class="flex grow flex-col gap-y-5 pt-8 overflow-y-auto border-r pr-2 border-gray-200 bg-transparent ring-1 ring-white/5"
      >
        <DistrictsFilters />
      </div>
    </div>

    <div class="w-4/5 px-8 pt-8">
      <!-- Sticky search header -->
      <div
        class="z-40 flex shrink-0 items-center gap-x-6 px-4 shadow-sm sm:px-6 lg:px-8"
      >
        <button
          type="button"
          class="-m-2.5 p-2.5 text-black xl:hidden"
          @click="sidebarOpen = true"
        >
          <span class="sr-only">Open sidebar</span>
          <Bars3Icon class="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <main class="">
        <div class="flex-col justify-start items-start gap-1 inline-flex">
          <div class="text-gray-900 text-3xl font-semibold leading-[38px]">
            School Districts
          </div>
          <div class="text-gray-600 text-base font-normal leading-normal">
            Find job openings at any school in any district.
          </div>
        </div>

        <div class="pt-8 flex flex-row justify-between">
          <form class="flex flex-1" action="#" method="GET">
            <label for="search-field" class="sr-only">Search</label>
            <div class="relative">
              <MagnifyingGlassIcon
                class="pointer-events-none absolute inset-y-0 left-2 h-full w-5 text-gray-500"
                aria-hidden="true"
              />
              <input
                id="search-field"
                class="block h-full w-[320px] shadow border border-gray-300 bg-transparent py-[11px] pl-8 pr-0 text-black focus:ring-0 sm:text-sm"
                placeholder="Search..."
                type="search"
                name="search"
              />
            </div>
          </form>

          <div
            class="rounded-lg shadow border border-gray-300 justify-start items-start inline-flex"
          >
            <button
              type="button"
              class="pl-3.5 pr-4 py-2 bg-white border-r border-gray-300 justify-center items-center gap-2 flex"
            >
              <ListIcon class="size-5" />
              <div class="text-slate-700 text-sm font-semibold leading-tight">
                List
              </div>
            </button>
            <button
              type="button"
              class="pl-3.5 pr-4 py-2 bg-gray-50 border-r border-gray-300 justify-center items-center gap-2 flex"
            >
              <GridIcon class="size-5" />
              <div class="text-gray-800 text-sm font-semibold leading-tight">
                Grid
              </div>
            </button>
          </div>
        </div>

        <div class="pt-6 w-full gap-2.5 flex">
          <div>
            <p class="text-gray-500 text-sm font-semibold !w-[139px]">
              Search by alphabet
            </p>
          </div>

          <div class="flex w-full justify-between">
            <div v-for="(capital, index) in capitals" :key="index">
              <button
                :class="
                  index === 0 ? 'text-blue-800 border-b-2 border-blue-800' : ''
                "
              >
                {{ capital }}
              </button>
            </div>
            <div class="text-brand-800 text-sm font-semibold leading-tight">
              Clear
            </div>
          </div>
        </div>

        <!-- Deployment list -->
        <!-- <ul role="list" class="divide-y divide-white/5">
          <li
            v-for="deployment in deployments"
            :key="deployment.id"
            class="relative flex items-center space-x-4 px-4 py-4 sm:px-6 lg:px-8"
          >
            <div class="min-w-0 flex-auto">
              <div class="flex items-center gap-x-3">
                <div
                  :class="[
                    statuses[deployment.status],
                    'flex-none rounded-full p-1',
                  ]"
                >
                  <div class="h-2 w-2 rounded-full bg-current" />
                </div>
                <h2 class="min-w-0 text-sm font-semibold leading-6 text-black">
                  <a :href="deployment.href" class="flex gap-x-2">
                    <span class="truncate">{{ deployment.teamName }}</span>
                    <span class="text-gray-400">/</span>
                    <span class="whitespace-nowrap">{{
                      deployment.projectName
                    }}</span>
                    <span class="absolute inset-0" />
                  </a>
                </h2>
              </div>
              <div
                class="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-gray-400"
              >
                <p class="truncate">{{ deployment.description }}</p>
                <svg
                  viewBox="0 0 2 2"
                  class="h-0.5 w-0.5 flex-none fill-gray-300"
                >
                  <circle cx="1" cy="1" r="1" />
                </svg>
                <p class="whitespace-nowrap">{{ deployment.statusText }}</p>
              </div>
            </div>
            <div
              :class="[
                environments[deployment.environment],
                'rounded-full flex-none py-1 px-2 text-xs font-medium ring-1 ring-inset',
              ]"
            >
              {{ deployment.environment }}
            </div>
            <ChevronRightIcon
              class="h-5 w-5 flex-none text-gray-400"
              aria-hidden="true"
            />
          </li>
        </ul> -->
      </main>
    </div>
  </div>
</template>
