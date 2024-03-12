<script setup lang="ts">

import BaseButton from "~/components/core/BaseButton.vue";
</script>

<template>
  <div class="cta-banner">
    <div class="container">
      <div class="banner relative bg-brand-800 rounded-[16px] overflow-hidden py-24 px-12">
        <div class="flex max-md:flex-col justify-between relative gap-8 z-20">
          <div class="heading-and-subheading flex flex-col gap-4 md:gap-2">
            <h4 class="text-3xl text-white font-semibold">
              We believe in supporting the community
            </h4>
            <p class="text-brand-200 text-lg">
              We donate a percentage of our revenue to classrooms in need
            </p>
          </div>
          <div>
            <BaseButton label="Our Pledge" color="primary"/>
          </div>
        </div>

        <div class="dashed-ring first-ring"></div>
        <div class="dashed-ring second-ring"></div>
        <div class="dashed-ring third-ring"></div>
        <div class="dashed-ring forth-ring"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">

</style>
