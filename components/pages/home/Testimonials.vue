<script setup lang="ts">
import TestimonialCard from "~/components/core/TestimonialCard.vue";

const testimonialsList = [
  {
    reviewerImage: 'olivia.png',
    reviewerName: 'Olivia Rhye',
    reviewerEmail: 'olivia@untitledui.com',
    review: [
        'Whether you want to build a team of 2 or 200, edujobs provides best options to everyone keeping the process easy and simple.'
    ],
    reviewDate: '23 April 2023',
    reviewTime: '8:13 AM',
    ratings: 0
  },
  {
    reviewerImage: 'david.png',
    reviewerName: 'Pheonix Baker',
    reviewerEmail: 'olivia@untitledui.com',
    review: [
        'Whether you want to build a team of 2 or 200, edujobs provides best options to everyone keeping the process easy and simple.',
        'Whether you want to build a team of 2 or 200, edujobs provides best options to everyone keeping the process easy and simple.'
    ],
    reviewDate: '23 April 2023',
    reviewTime: '8:13 AM',
    ratings: 0
  },
  {
    reviewerImage: 'lana.png',
    reviewerName: 'Lana Stiener',
    reviewerEmail: 'olivia@untitledui.com',
    review: [
      'Whether you want to build a team of 2 or 200, edujobs provides best options to everyone keeping the process easy and simple.'
    ],
    reviewDate: '23 April 2023',
    reviewTime: '8:13 AM',
    ratings: 0
  },
  {
    reviewerImage: 'demi.png',
    reviewerName: 'Demi Wilkinson',
    reviewerEmail: 'olivia@untitledui.com',
    review: [
      'Whether you want to build a team of 2 or 200, edujobs provides best options to everyone keeping the process easy and simple.',
      'Whether you want to build a team of 2 or 200, edujobs provides best options to everyone keeping the process easy and simple.'
    ],
    reviewDate: '23 April 2023',
    reviewTime: '8:13 AM',
    ratings: 0
  },
  {
    reviewerImage: 'andi.png',
    reviewerName: 'Andi Lane',
    reviewerEmail: 'olivia@untitledui.com',
    review: [
      'Whether you want to build a team of 2 or 200, edujobs provides best options to everyone keeping the process easy and simple.'
    ],
    reviewDate: '23 April 2023',
    reviewTime: '8:13 AM',
    ratings: 0
  }
  ,{
    reviewerImage: 'natalie.png',
    reviewerName: 'Natalie Crag',
    reviewerEmail: 'olivia@untitledui.com',
    review: [
      'Whether you want to build a team of 2 or 200, edujobs provides best options to everyone keeping the process easy and simple.',
        'Whether you want to build a team of 2 or 200, edujobs provides best options to everyone keeping the process easy and simple.'
    ],
    reviewDate: '23 April 2023',
    reviewTime: '8:13 AM',
    ratings: 0
  },
  {
    reviewerImage: 'demi.png',
    reviewerName: 'Demi Wilkinson',
    reviewerEmail: 'olivia@untitledui.com',
    review: [
      'Whether you want to build a team of 2 or 200, edujobs provides best options to everyone keeping the process easy and simple.',
      'Whether you want to build a team of 2 or 200, edujobs provides best options to everyone keeping the process easy and simple.'
    ],
    reviewDate: '23 April 2023',
    reviewTime: '8:13 AM',
    ratings: 0
  },
  {
    reviewerImage: 'andi.png',
    reviewerName: 'Andi Lane',
    reviewerEmail: 'olivia@untitledui.com',
    review: [
      'Whether you want to build a team of 2 or 200, edujobs provides best options to everyone keeping the process easy and simple.'
    ],
    reviewDate: '23 April 2023',
    reviewTime: '8:13 AM',
    ratings: 0
  },
  {
    reviewerImage: 'olivia.png',
    reviewerName: 'Olivia Rhye',
    reviewerEmail: 'olivia@untitledui.com',
    review: [
      'Whether you want to build a team of 2 or 200, edujobs provides best options to everyone keeping the process easy and simple.'
    ],
    reviewDate: '23 April 2023',
    reviewTime: '8:13 AM',
    ratings: 0
  },
]

const testimonialSlider = ref(null)
</script>

<template>
  <section class="py-24">
    <div class="container">
      <div class="content">
        <div class="heading-and-supporting-content flex max-md:flex-col justify-between md:items-center gap-5 pb-16">
          <div class="heading-and-subheading flex flex-col gap-3">
            <p class="section-subheading">Testimonials</p>
            <h2 class="section-heading">Over 100+ people trust us</h2>
            <p class="supporting-text">Hear from some of our amazing customers</p>
          </div>
          <div>
            <BaseButton label="Search Jobs" color="primary"/>
          </div>
        </div>

        <swiper-container
            ref="testimonialSlider"
            :loop="true"
            :grab-cursor="false"
            :space-between="32"
            :slides-per-view="3"
            :grid-rows="2"
            grid-fill="row"
            navigation-next-el=".next"
            class="testimonial-slider"
        >
          <swiper-slide v-for="testimonial in testimonialsList">
            <TestimonialCard :testimonial="testimonial" />
          </swiper-slide>
        </swiper-container>
        <div class="grid grid-cols-3 gap-8">

        </div>

        <div class="flex gap-8 pt-8">
          <div @click="testimonialSlider?.swiper?.slidePrev()" class="slider-nav-arrows right">

          </div>
          <div @click="testimonialSlider?.swiper?.slideNext()" class="slider-nav-arrows left">

          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="postcss">

</style>
