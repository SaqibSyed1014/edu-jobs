<script setup lang="ts">
const partnersList = [
  'boltshift.png',
  'lightbox.png',
  'featherdev.png',
  'globalbank.png',
  'nietsceza.png',
  'nietsceza.png',
  'globalbank.png',
  'boltshift.png',
  'lightbox.png',
  'featherdev.png',
]
</script>

<template>
  <section class="py-24">
    <div class="container">
        <p class="section-title">
          Trusted by World’s leading names
        </p>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-16 gap-y-8">
        <div v-for="partner in partnersList">
          <img :src="`/images/partners/${partner}`" alt="Partner Logo">
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="postcss">

</style>
