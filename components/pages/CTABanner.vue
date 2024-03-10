<script setup lang="ts">

import BaseButton from "~/components/core/BaseButton.vue";
</script>

<template>
  <div class="cta-banner">
    <div class="container">
      <div class="banner relative bg-brand-800 rounded-[16px] overflow-hidden py-24 px-12">
        <div class="flex justify-between relative z-20">
          <div class="heading-and-subheading">
            <h4 class="text-3xl text-white font-semibold">
              We believe in supporting the community
            </h4>
            <p class="text-brand-200 text-lg pt-2">
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
