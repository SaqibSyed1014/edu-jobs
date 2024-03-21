<script setup lang="ts">
import USFlag from "~/assets/icons/us-flag.svg";
import BriefCase from "~/assets/icons/brief-case-light.svg";
import Building from "~/assets/icons/building-light.svg";
import GraduationHat from "~/assets/icons/graduation-hat-light.svg";
defineProps<{ data: any }>();
</script>

<template>
  <div
    class="p-4 flex flex-col gap-5 sm:gap-0 sm:flex-row justify-between items-start rounded-xl border border-gray-200"
  >
    <div class="inline-flex space-x-3">
      <img :src="data.avatar" class="size-12" alt="Avatar" />

      <!-- <data.avatar class="size-12" /> -->
      <div>
        <h4
          class="text-gray-900 text-sm md:text-base font-semibold leading-normal"
        >
          {{ data?.schoolName }}
        </h4>

        <div class="inline-flex space-x-5">
          <div class="inline-flex items-center text-center space-x-2">
            <BriefCase class="size-5" />
            <span
              class="text-gray-600 text-xs md:text-sm font-medium leading-tight"
            >
              14 jobs
            </span>
          </div>
          <div class="inline-flex items-center text-center space-x-2">
            <Building class="size-5" />
            <span
              class="text-gray-600 text-xs md:text-sm font-medium leading-tight"
            >
              19 schools
            </span>
          </div>
          <div class="inline-flex items-center text-center space-x-2">
            <GraduationHat class="size-5" />
            <span class="text-gray-600 text-sm font-medium leading-tight">
              11,820 students
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-4">
      <div
        class="rounded-md inline-flex items-center w-fit space-x-1.5 px-1.5 py-0.5 shadow border border-gray-300"
      >
        <USFlag class="size-4" />
        <span
          class="text-center text-gray-700 text-xs md:text-sm font-medium leading-tight"
          >Palo Alto, CA
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss"></style>
