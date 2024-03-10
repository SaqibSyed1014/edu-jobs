<script setup lang="ts">

import BaseButton from "~/components/core/BaseButton.vue";
</script>

<template>
  <section class="hero-section overflow-hidden">
    <div class="container relative mx-auto">
      <div class="content text-center relative z-20 py-24">
        <h1 class="font-semibold text-6xl leading-[60px] tracking-[-2%] w-10/12 mx-auto">
          Find the most <span class="text-brand-600">exciting jobs</span> in the easiest way possible
        </h1>

        <p class="text-gray-600 text-xl w-8/12 mx-auto pt-6 pb-12">
          Explore thousands of job opportunities with all the information you need and manage all your job applications
          from start to finish.
        </p>

        <div class="home-search-filters">
          <div class="filter-wrapper">
            <div>
              <input
                  type="text"
                  placeholder="Keyword, Job title..."
                  class="w-full"
              >
            </div>
            <hr class="h-3 w-px bg-gray-200 mx-2">
            <div>
              <input
                  type="text"
                  placeholder="Anywhere"
                  class="w-full"
              >
            </div>
          </div>
          <BaseButton label="Search" color="primary" />
        </div>
      </div>

      <div class="dashed-ring forth-ring" />
      <div class="dashed-ring third-ring" />
      <div class="dashed-ring second-ring" />
      <div class="dashed-ring first-ring" />


      <div class="bg-brand-800/60 w-[300px] h-[300px] absolute -bottom-10 -right-1/4 blur-3xl z-[-1]"></div>
      <div class="bg-brand-800/30 w-[250px] h-[250px] absolute -bottom-10 -left-[1/2] blur-3xl z-[-1]"></div>
    </div>
  </section>
</template>

<style scoped lang="postcss">

</style>
