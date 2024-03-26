<script setup lang="ts">
defineProps<{ data: any }>();
</script>

<template>
  <NuxtLink
    to="/school-districts/123"
    class="p-4 flex flex-col gap-5 sm:gap-0 sm:flex-row justify-between items-start rounded-xl border border-gray-200"
  >
    <div class="flex flex-col md:flex-row gap-3">
      <img :src="data.avatar" class="size-12" alt="Avatar" />
      <div>
        <h4
          class="text-gray-900 text-sm md:text-base font-semibold leading-normal"
        >
          {{ data?.schoolName }}
        </h4>

        <div class="inline-flex flex-wrap gap-5 pt-2 md:pt-0">
          <div class="inline-flex items-center text-center space-x-2">
            <SvgoBriefCase class="size-5" />
            <span
              class="text-gray-600 text-xs md:text-sm font-medium leading-tight"
            >
              14 jobs
            </span>
          </div>
          <div class="inline-flex items-center text-center space-x-2">
            <SvgoBuilding class="size-5" />
            <span
              class="text-gray-600 text-xs md:text-sm font-medium leading-tight"
            >
              19 schools
            </span>
          </div>
          <div class="inline-flex items-center text-center space-x-2">
            <SvgoGraduationHat class="size-5" />
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
        <SvgoUsFlag class="size-4" />
        <span
          class="text-center text-gray-700 text-xs md:text-sm font-medium leading-tight"
          >Palo Alto, CA
        </span>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped lang="postcss"></style>
