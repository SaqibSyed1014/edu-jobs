<script setup lang="ts">
import ArrowIcon from "assets/icons/arrow-right.svg";

const selectedTab = ref(0)
</script>

<template>
  <section class="py-24">
    <div class="container">
      <div class="content">
        <div class="heading-and-subheading flex flex-col gap-3">
          <p class="section-subheading">For Candidates</p>
          <h2 class="section-heading">Get rid of old recruitment processes</h2>
        </div>

        <div class="grid md:grid-cols-2 gap-16 process-steps pt-16">
          <div>
            <div :class="[ selectedTab === 0 ? 'border-brand-600' : 'border-gray-100' ]" @click="selectedTab = 0" class="border-l-4 px-6 py-4 cursor-pointer">
              <h4 class="font-semibold text-lg">
                Access job openings from anywhere
              </h4>
              <p class="text-gray-600 pt-1 pb-5">
                Edujobs provides access to many job openings around the globe, making it easier to find a good match.
              </p>

              <button class="flex items-center gap-3 text-brand-700 font-semibold group">
                Explore
                <ArrowIcon class="w-3 h-3 group-hover:translate-x-[8px] transition" />
              </button>
            </div>
            <div :class="[ selectedTab === 1 ? 'border-brand-600' : 'border-gray-100' ]" @click="selectedTab = 1" class="border-l-4 px-6 py-4 cursor-pointer">
              <h4 class="font-semibold text-lg">
                Meet career experts
              </h4>
              <p class="text-gray-600 pt-1 pb-5">
                With the help of this platform, candidates can access to a large network of potential employers.
              </p>

              <button class="flex items-center gap-3 text-brand-700 font-semibold group">
                Apply Now
                <ArrowIcon class="w-3 h-3 group-hover:translate-x-[8px] transition" />
              </button>
            </div>
            <div :class="[ selectedTab === 2 ? 'border-brand-600' : 'border-gray-100' ]" @click="selectedTab = 2" class="border-l-4 px-6 py-4 cursor-pointer">
              <h4 class="font-semibold text-lg">
                Stay up to date
              </h4>
              <p class="text-gray-600 pt-1 pb-5">
                Edujobs enables the candidate to stay up to date with the latest trends in the job market.
              </p>

              <button class="flex items-center gap-3 text-brand-700 font-semibold group">
                Join Us
                <ArrowIcon class="w-3 h-3 group-hover:translate-x-[8px] transition" />
              </button>
            </div>
          </div>
          <div>
            <img src="/images/others/cards.png" alt="PNG image">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="postcss">

</style>
