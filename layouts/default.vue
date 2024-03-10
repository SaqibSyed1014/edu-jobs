<template>
  <div>
    <NavBar></NavBar>
    <slot />
    <CTABanner></CTABanner>
    <Footer></Footer>
  </div>
</template>
<script setup lang="ts">
import Footer from "~/components/Footer.vue";
import CTABanner from "~/components/pages/CTABanner.vue";
</script>
