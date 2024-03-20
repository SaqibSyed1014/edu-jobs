<script setup lang="ts">
import ClockIcon from '~/assets/icons/clock.svg'
import DollarIcon from '~/assets/icons/currency-dollar.svg'

defineProps<{
  job :any,
  cardForm: Boolean
}>()
</script>

<template>
  <div v-if="cardForm" class="job-card flex flex-col gap-5 bg-white border border-gray-200 shadow-xs rounded-xl p-5">
    <div class="job-card-header">
      <div class="flex justify-between">
        <div class="rounded-full overflow-hidden w-12 h-12">
          <img :src="`/images/logos/${job.logo}`" alt="Job Logo" class="w-full h-full object-cover">
        </div>
        <div class="job-badge flex justify-center items-center bg-brand-500 text-white rounded-2xl text-sm h-fit px-2.5 py-0.5">
          {{ job.postedAt }}
        </div>
      </div>
      <div class="pt-3">
        <p class="font-semibold">{{ job.title }}</p>
        <p class="text-gray-600 text-sm">{{ job.country }}</p>
      </div>
    </div>
    <div class="job-post-body flex flex-col gap-4">
      <div class="flex gap-3">
        <div class="border border-gray-300 shadow-xs rounded-md text-xs px-2 py-0.5 h-fit">
          {{ job.country }}
        </div>
        <div class="flex gap-2 items-center border border-gray-300 shadow-xs rounded-md text-xs px-2 py-0.5 h-fit">
          <div class="w-2 h-2 rounded-full bg-blue-500"/>
          {{ job.category }}
        </div>
      </div>
      <p class="text-gray-600">
        {{ job.description }}
      </p>
    </div>
    <div class="job-post-footer flex items-center gap-5 text-gray-600">
      <div class="flex items-center gap-2">
        <ClockIcon class="w-5 h-5" />
        <span>{{ job.duration }}</span>
      </div>

      <div class="flex items-center gap-2">
        <DollarIcon class="w-5 h-5" />
        <span>{{ job.wage }}</span>
      </div>
    </div>
  </div>

  <div v-else class="job-card flex justify-between gap-5 bg-white border border-gray-200 shadow-xs rounded-xl p-5">
    <div class="job-card-left">
      <div class="flex gap-3 items-center">
        <div class="rounded-full overflow-hidden w-12 h-12">
          <img :src="`/images/logos/${job.logo}`" alt="Job Logo" class="w-full h-full object-cover">
        </div>
        <div>
          <p class="font-semibold">{{ job.title }}</p>
          <p class="text-gray-600 text-sm">{{ job.country }}</p>
        </div>
      </div>
      <div class="flex items-center gap-5 text-gray-600 pt-5">
        <div class="flex items-center gap-2">
          <ClockIcon class="w-5 h-5" />
          <span>{{ job.duration }}</span>
        </div>

        <div class="flex items-center gap-2">
          <DollarIcon class="w-5 h-5" />
          <span>{{ job.wage }}</span>
        </div>
      </div>
    </div>
    <div class="jo-card-right h-full">
      <div class="flex flex-col items-end h-full">
        <div
            class="job-badge flex justify-center items-center bg-brand-500 text-white rounded-2xl text-sm h-fit px-2.5 py-0.5">
          {{ job.postedAt }}
        </div>
        <div class="flex gap-3 mt-auto">
          <div class="border border-gray-300 shadow-xs rounded-md text-xs px-2 py-0.5 h-fit">
            {{ job.country }}
          </div>
          <div class="flex gap-2 items-center border border-gray-300 shadow-xs rounded-md text-xs px-2 py-0.5 h-fit">
            <div class="w-2 h-2 rounded-full bg-blue-500"/>
            {{ job.category }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">

</style>
