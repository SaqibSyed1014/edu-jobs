<script setup lang="ts">

const steps = ref([
    { name: 'District Information', href: '/post-a-job', status: 'complete' },
    { name: 'Job Details', href: '/post-a-job/job-detail', status: 'complete' },
    { name: 'Application Details', href: '/post-a-job/application-details', status: 'complete' },
    { name: 'Review Information', href: '/post-a-job/review-information', status: 'current' },
])
</script>

<template>
    <div class="container py-8">
        <div class="">
            <h2 class="text-2xl lg:text-3xl font-semibold">
                Post a Job </h2>
            <p class="text-base font-normal">Your job post
                will be pinned to the top and highlighted in relevant search results for 30 days.
            </p>
        </div>
        <hr class="border-b border-gray-200 mt-5">
        <div class="flex flex-col md:flex-row justify-between gap-8">
            <Stepper :steps="steps" class="w-1/5 pt-8 border-r border-gray-200" />
            <p>review information</p>
        </div>

    </div>
</template>


<style scoped lang="postcss"></style>