<script setup lang="ts">
import ClockIcon from '~/assets/icons/clock.svg'
import DollarIcon from '~/assets/icons/currency-dollar.svg'

defineProps<{
  job :Job,
  cardForm: Boolean
  showJobDescription: Boolean
}>()

function getDaysDifference(givenDateString :Date) {
  const givenDate :any = new Date(givenDateString);
  const currentDate :any = new Date();
  return Math.floor((currentDate - givenDate) / (1000 * 60 * 60 * 24));
}
</script>

<template>
  <NuxtLink to="/jobs/details">
    <div v-if="cardForm" class="job-card flex flex-col gap-5 bg-white border border-gray-200 shadow-xs rounded-xl p-5">
      <div class="job-card-header">
        <div class="flex justify-between">
          <div class="flex place-items-center rounded-full overflow-hidden w-12 h-12">
            <img v-if="job.job_logo" :src="job.job_logo" :alt="job.job_title" class="w-full h-full object-cover">
            <SvgoBuilding v-else class="size-6" />
          </div>

          <div class="job-badge">
            {{ `${getDaysDifference(job.date_posted)}d ago` }}
          </div>
        </div>
        <div class="pt-3">
          <p class="font-semibold">{{ job.job_title }}</p>

          <p class="text-gray-600 text-sm">{{ job.organization_name }}</p>
        </div>
      </div>
      <div class="job-post-body flex flex-col gap-4">
        <div class="flex gap-3 font-medium">
          <div class="badges-outline">
            {{ job.job_location }}
          </div>

          <div class="badges-outline">
            <div class="w-2 h-2 rounded-full bg-blue-500"/>
            {{ job.job_role }}
          </div>
        </div>

        <template v-if="showJobDescription">
          <div v-html="job.job_description" class="text-gray-600" />
        </template>
      </div>
      <div class="job-post-footer flex items-center gap-5 font-medium text-gray-600">
        <div class="flex items-center gap-2">
          <ClockIcon class="w-5 h-5 text-gray-400" />
          <span>{{ job.employment_type }}</span>
        </div>

        <div class="flex items-center capitalize gap-2">
          <SvgoBuilding class="w-5 h-5 text-gray-400" />
          <span>{{ job.organization_type }}</span>
        </div>
      </div>
    </div>

    <div v-else class="job-card flex flex-col justify-between gap-5 bg-white border border-gray-200 shadow-xs rounded-xl p-5">
    <div class="job-card-top">
      <div class="flex justify-between gap-3">
        <div class="flex gap-3">
          <div class="flex place-items-center rounded-full overflow-hidden w-12 h-12">
            <img v-if="job.job_logo" :src="job.job_logo" :alt="job.job_title" class="w-full h-full object-cover">
            <SvgoBuilding v-else class="size-6"/>
          </div>
          <div>
            <p class="font-semibold">{{ job.job_title }}</p>

            <p class="text-gray-600 text-sm">{{ job.organization_name }}</p>
          </div>
        </div>
        <div class="job-badge">
          {{ `${getDaysDifference(job.date_posted)}d ago` }}
        </div>
      </div>
    </div>

    <div class="job-card-bottom flex justify-between items-center">
      <div class="flex items-center gap-5 text-gray-600 font-medium pt-5">
        <div class="flex items-center gap-2">
          <ClockIcon class="w-5 h-5 text-gray-400" />
          <span>{{ job.employment_type }}</span>
        </div>

        <div class="flex items-center capitalize gap-2">
          <DollarIcon class="w-5 h-5 text-gray-400" />
          <span>{{ job.organization_type }}</span>
        </div>
      </div>

      <div class="flex gap-3 mt-auto">
        <div class="badges-outline">
          {{ job.job_location }}
        </div>

        <div class="badges-outline">
          <div class="w-2 h-2 rounded-full bg-blue-500"/>
          {{ job.job_role }}
        </div>
      </div>
    </div>
  </div>
  </NuxtLink>
</template>

<style scoped lang="postcss">
.badges-outline{
  @apply flex gap-2 items-center border border-gray-300 shadow-xs rounded-md px-2 py-0.5 h-fit text-xs
}
.job-badge{
  @apply flex justify-center items-center bg-brand-500 text-white rounded-2xl text-sm h-fit px-2.5 py-0.5
}
</style>
