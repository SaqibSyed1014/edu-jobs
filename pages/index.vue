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
