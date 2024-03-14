<script setup lang="ts">
import LocationPinIcon from "assets/icons/location-pin.svg";
import SearchIcon from "assets/icons/search.svg";

import { register } from 'swiper/element/bundle';
register();

const jobPostsList = [
  {
    logo: 'logo-one.jpg',
    postedAt: '1h ago',
    title: 'Marketing Associate',
    country: 'Polymath, Melbourne, AU',
    category: 'Design',
    description: 'We’re looking for a mid-level product designer to join our team.',
    duration: 'Full-time',
    wage: '80k - 100k'
  },
  {
    logo: 'logo-two.jpg',
    postedAt: '6h ago',
    title: 'Senior Graphic Designer',
    country: 'Polymath, Melbourne, AU',
    category: 'Design',
    description: 'We’re looking for a mid-level product designer to join our team.',
    duration: 'Full-time',
    wage: '80k - 100k'
  },
  {
    logo: 'logo-three.jpg',
    postedAt: '2h ago',
    title: 'Lead Product Designer',
    country: 'Polymath, Melbourne, AU',
    category: 'Design',
    description: 'We’re looking for a mid-level product designer to join our team.',
    duration: 'Full-time',
    wage: '80k - 100k'
  },
  {
    logo: 'logo-four.jpg',
    postedAt: '6h ago',
    title: 'Senior Graphic Designer',
    country: 'Polymath, Melbourne, AU',
    category: 'Design',
    description: 'We’re looking for a mid-level product designer to join our team.',
    duration: 'Full-time',
    wage: '80k - 100k'
  },
  {
    logo: 'logo-two.jpg',
    postedAt: '6h ago',
    title: 'Senior Graphic Designer',
    country: 'Polymath, Melbourne, AU',
    category: 'Design',
    description: 'We’re looking for a mid-level product designer to join our team.',
    duration: 'Full-time',
    wage: '80k - 100k'
  },
  {
    logo: 'logo-one.jpg',
    postedAt: '6h ago',
    title: 'Senior Graphic Designer',
    country: 'Polymath, Melbourne, AU',
    category: 'Design',
    description: 'We’re looking for a mid-level product designer to join our team.',
    duration: 'Full-time',
    wage: '80k - 100k'
  },
  {
    logo: 'logo-two.jpg',
    postedAt: '2h ago',
    title: 'Lead Product Designer',
    country: 'Polymath, Melbourne, AU',
    category: 'Design',
    description: 'We’re looking for a mid-level product designer to join our team.',
    duration: 'Full-time',
    wage: '80k - 100k'
  },
  {
    logo: 'logo-three.jpg',
    postedAt: '2h ago',
    title: 'Lead Product Designer',
    country: 'Polymath, Melbourne, AU',
    category: 'Design',
    description: 'We’re looking for a mid-level product designer to join our team.',
    duration: 'Full-time',
    wage: '80k - 100k'
  },
]
</script>

<template>
  <section class="hero-section overflow-hidden">
    <div class="container relative">
      <div class="content text-center relative z-20 py-24">
        <h1 class="font-inter font-semibold text-4xl md:text-5xl lg:text-6xl tracking-[-2%] w-full md:w-10/12 2xl:w-8/12 mx-auto">
          Find the most <span class="text-brand-600">exciting jobs</span> in the easiest way possible
        </h1>

        <p class="text-gray-600 text-lg md:text-xl w-full md:w-8/12 mx-auto pt-6 pb-12">
          Explore thousands of job opportunities with all the information you need and manage all your job applications
          from start to finish.
        </p>

        <div class="home-search-filters">
          <div class="filter-wrapper">
            <div class="flex items-center">
              <SearchIcon class="w-4 h-4 text-gray-400" />
              <input
                  type="text"
                  placeholder="Keyword, Job title..."
                  class="w-full"
              >
            </div>
            <hr class="hidden md:block h-3 w-px bg-gray-200 mx-2">
            <hr class="block md:hidden h-px w-[92%] mx-auto bg-gray-200">
            <div class="flex items-center">
              <LocationPinIcon class="w-4 h-4 text-gray-400" />
              <input
                  type="text"
                  placeholder="Anywhere"
                  class="w-full"
              >
            </div>
          </div>
          <div>
            <BaseButton label="Search" color="primary" :full-sized-on-small="true"/>
          </div>
        </div>
      </div>

      <div class="dashed-ring forth-ring" />
      <div class="dashed-ring third-ring" />
      <div class="dashed-ring second-ring" />
      <div class="dashed-ring first-ring" />


      <div class="bg-brand-800/60 w-[300px] h-[300px] absolute -bottom-10 -right-1/4 blur-3xl z-[-1]"></div>
      <div class="bg-brand-100 w-[650px] h-[350px] absolute -bottom-1/2 -left-1/4 blur-3xl z-[-1]"></div>
    </div>

    <swiper-container
        :loop="true"
        :space-between="20"
        slides-per-view="auto"
        :auto-resize="false"
        :autoplay-delay="1"
        :autoplay-disable-on-interaction="false"
        :speed="4000"
        class="jobs-slider z-20"
    >
        <swiper-slide v-for="(job, i) in jobPostsList" :key="i" class="!w-[340px]">
          <JobCard :job="job" />
        </swiper-slide>
    </swiper-container>
  </section>
</template>

<style scoped lang="postcss">

</style>
