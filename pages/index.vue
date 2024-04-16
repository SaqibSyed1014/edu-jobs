<template>
  <div>
    <Hero />
    <Partnerships />
    <Testimonials />
    <SearchedByCities />
    <FeaturedJobs />
    <ForCandidates />
    <ForEmployers />
    <Blogs />
<!--    <ContactForm />-->
  </div>
</template>

<script setup>
import {useJobStore} from "~/segments/jobs/store";

const jobStore = useJobStore();

onMounted(async () => {
  const query = {
    q: '*',
    per_page: 12,
    page: 1
  }
  await jobStore.fetchJobs(query)
})
</script>
