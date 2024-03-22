<script setup lang="ts">
import ArrowUpRightIcon from "assets/icons/arrow-narrow-up-right.svg";
import ArrowLeftIcon from "assets/icons/arrow-left.svg";
import ArrowRightIcon from "assets/icons/arrow-right.svg";

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

const sliderBreakpoints = {
  320: {
    slidesPerView: 1
  },
  768: {
    slidesPerView: 'auto',
    autoResize: false
  }
}
</script>

<template>
  <section class="py-24 overflow-hidden">
    <div class="content">
      <div class="container">
        <div class="grid grid-cols-1 lg:grid-cols-3 items-center">
          <div class="col-span-1">
            <p class="section-subheading">Featured</p>
            <h3 class="section-heading pt-3 pb-5">
              Jobs of the day
            </h3>
            <p class="supporting-text pb-8">
              Discover tech stacks, employee benefits, and open roles.
            </p>
            <BaseButton class="max-md:hidden" label="Explore More" color="primary">
              <template #append-icon>
                <ArrowUpRightIcon class="w-3 h-3" />
              </template>
            </BaseButton>

            <div class="hidden md:flex items-center gap-8 pt-16">
              <div @click="jobSlider?.swiper?.slidePrev()" class="slider-nav-arrows right">
                <ArrowLeftIcon class="w-4 h-4" />
              </div>
              <div @click="jobSlider?.swiper?.slideNext()" class="slider-nav-arrows left">
                <ArrowRightIcon class="w-4 h-4" />
              </div>
            </div>
          </div>
          <div class="col-span-2 pt-16">
            <swiper-container
                ref="jobSlider"
                :loop="true"
                :free-mode="true"
                :space-between="20"
                :breakpoints="sliderBreakpoints"
                class="jobs-slider z-20"
            >
              <swiper-slide v-for="job in jobPostsList" class="md:!w-[340px]">
                <JobCard :job="job" :card-form="true" />
              </swiper-slide>
            </swiper-container>

            <div class="flex md:hidden justify-between gap-8 pt-8">
              <div @click="jobSlider?.swiper?.slidePrev()" class="slider-nav-arrows right">
                <ArrowLeftIcon class="w-4 h-4" />
              </div>
              <div @click="jobSlider?.swiper?.slideNext()" class="slider-nav-arrows left">
                <ArrowRightIcon class="w-4 h-4" />
              </div>
            </div>
          </div>

        </div>

        <BaseButton class="md:hidden" label="Explore More" color="primary" :full-sized-on-small="true">
          <template #append-icon>
            <ArrowUpRightIcon class="w-3 h-3" />
          </template>
        </BaseButton>
      </div>
    </div>
  </section>
</template>

<style scoped lang="postcss">

</style>
