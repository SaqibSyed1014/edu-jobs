<script setup lang="ts">
import ArrowUpRightIcon from "assets/icons/arrow-narrow-up-right.svg";
import LocationPinIcon from "~/assets/icons/location-pin.svg"

const citiesList = [
  {
    name: 'Los Angeles',
    openings: 1200,
    companies: 360,
    image: 'los-angeles.jpg'
  },
  {
    name: 'New York',
    openings: 740,
    companies: 360,
    image: 'new-york.jpg'
  },
  {
    name: 'Miami',
    openings: 123,
    companies: 360,
    image: 'miami.jpg'
  },
  {
    name: 'Paris',
    openings: 340,
    companies: 360,
    image: 'paris.jpg'
  },
  {
    name: 'London',
    openings: 87,
    companies: 360,
    image: 'london.jpg'
  },
  {
    name: 'Berlin',
    openings: 354,
    companies: 360,
    image: 'berlin.jpg'
  }
]
</script>

<template>
  <section>
    <div class="container">
      <div class="content">
        <div class="heading-and-supporting-content flex  max-md:flex-col justify-between md:items-center gap-5 pb-16">
          <div class="heading-and-subheading flex flex-col gap-3">
            <p class="section-subheading">Top Searches</p>
            <h2 class="section-heading">Search Jobs by Cities</h2>
            <p class="supporting-text">Find your fittest job in your desired city</p>
          </div>
          <div>
            <BaseButton label="View All" color="primary" :full-sized-on-small="true">
              <template #append-icon>
                <ArrowUpRightIcon class="w-3 h-3" />
              </template>
            </BaseButton>
          </div>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <template v-for="city in citiesList">
            <div class="city-card border border-gray-200 rounded-xl overflow-hidden">
              <div class="city-image h-[175px]">
                <img :src="`/images/cities/${city.image}`" alt="City Image" class="w-full h-full object-cover">
              </div>
              <div class="city-jobs-details px-4 py-5">
                <div class="flex gap-2 items-center pb-0 mb-1">
                  <LocationPinIcon class="w-5 h-5" />
                  <span class="font-semibold text-lg">{{ city.name }}</span>
                </div>
                <div class="flex items-center gap-3 text-gray-600">
                  <span>{{ city.openings }} openings</span>
                  <div class="w-2 h-2 rounded-full bg-brand-500"></div>
                  <span>{{ city.companies }} companies</span>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="postcss">

</style>
