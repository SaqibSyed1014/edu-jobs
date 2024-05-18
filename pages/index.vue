<template>
  <div>
    <Hero />
    <Partnerships />
<!--    <Testimonials />-->
    <BrowseJobsByCities />
    <FeaturedJobs />
    <ForCandidates />
    <ForOrganizations />
    <Blogs />
<!--    <ContactForm />-->
  </div>
</template>

<script setup>
import {useHomeStore} from "~/segments/home/store";
import {useJobStore} from "~/segments/jobs/store";
import {useBlogStore} from "~/segments/blogs/store";

const homeStore = useHomeStore();
const jobStore = useJobStore();
const blogStore = useBlogStore();

onMounted(async () => {
  const query = {
    q: '*',
    per_page: 12,
    page: 1,
    filter_by: 'featured:1'
  }
  await Promise.all([
    homeStore.fetchFeaturedOrganizations(),
    jobStore.fetchJobs(query),
    homeStore.fetchPartnersLogos(),
    homeStore.fetchJobsSummaryByCities(),
    blogStore.fetchBlogs()
  ])
})
</script>
