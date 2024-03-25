<script setup lang="ts">
</script>

<template>
  <div class="search-bar">
    <div class="filter-wrapper w-full">
      <div class="flex flex-1 items-center">
        <SvgoSearch class="w-4 h-4 text-gray-400" />
        <input
            type="text"
            placeholder="Keyword, Job title..."
            class="w-full"
        >
      </div>
      <hr class="hidden md:block h-3 w-px bg-gray-200 mx-2">
      <hr class="block md:hidden h-px w-[92%] mx-auto bg-gray-200">
      <div class="flex flex-1 items-center">
        <SvgoLocationPin class="w-4 h-4 text-gray-400" />
        <client-only>
          <GMapAutocomplete
              placeholder="Anywhere"
              class="form-input w-full"
              :options="{
                  bounds: {
                    north: 49.384358,
                    south: 24.396308,
                    east: -66.93457,
                    west: -125.001318,
                  },
                  componentRestrictions: { country: 'US' },
                  strictBounds: true
             }"
          />
        </client-only>
      </div>
    </div>
    <div class="max-md:w-full">
      <BaseButton label="Search" color="primary" :full-sized-on-small="true"/>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.search-bar{
  @apply flex max-md:flex-col justify-center items-center gap-4
}
.search-bar .filter-wrapper{
  @apply flex max-md:flex-col items-center bg-white field-shadow overflow-hidden rounded-lg max-md:w-full px-3
}
.search-bar .filter-wrapper div{
  @apply max-md:w-full
}
.search-bar .filter-wrapper input{
  @apply focus:outline-0 border-0 px-2 placeholder-gray-400
}
</style>
