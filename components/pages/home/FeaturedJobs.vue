<script setup lang="ts">
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

const jobSlider = ref(null)
</script>

<template>
  <section class="py-24 overflow-hidden">
    <div class="content">
      <div class="container">
        <div class="grid grid-cols-3 items-center">
          <div class="col-span-1">
            <p class="text-brand-700 font-semibold">Featured</p>
            <h3 class="text-4xl pt-3 pb-5">
              Jobs of the day
            </h3>
            <p class="text-xl text-gray-600 pb-8">
              Discover tech stacks, employee benefits, and open roles.
            </p>
            <BaseButton label="Explore More" color="primary" />

            <div class="flex items-center gap-8 pt-16">
              <div @click="jobSlider?.swiper?.slidePrev()" class="slider-nav-arrows right">

              </div>
              <div @click="jobSlider?.swiper?.slideNext()" class="slider-nav-arrows left">

              </div>
            </div>
          </div>
          <div class="col-span-2">
            <swiper-container
                ref="jobSlider"
                :loop="true"
                :free-mode="true"
                :space-between="20"
                :slides-per-view="2.5"
                class="jobs-slider z-20"
            >
              <swiper-slide v-for="job in jobPostsList">
                <JobCard :job="job"/>
              </swiper-slide>
            </swiper-container>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="postcss">

</style>
