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
import {useHomeStore} from "~/segments/home/store";

const jobStore = useJobStore();
const homeStore = useHomeStore();

onMounted(async () => {
  const query = {
    q: '*',
    per_page: 12,
    page: 1,
    filter_by: 'featured:1'
  }
  await jobStore.fetchJobs(query);
  await homeStore.fetchJobsSummaryByCities();
})
</script>
