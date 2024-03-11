<script setup lang="ts">
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
  }
]
</script>

<template>
  <section class="py-24">
    <div class="container">
      <div class="content">
        <div class="heading-and-supporting-content flex justify-between items-center pb-16">
          <div class="heading-and-subheading flex flex-col gap-3">
            <p class="text-brand-700 font-semibold">Testimonials</p>
            <h2 class="text-4xl font-semibold tracking-[-2%]">Over 100+ people trust us</h2>
            <p class="text-xl text-gray-600">Hear from some of our amazing customers</p>
          </div>
          <div>
            <BaseButton label="Search Jobs" color="primary"/>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-8">
          <template v-for="testimonial in testimonialsList">
            <div class="testimonial-card bg-gray-25 rounded-xl border border-gray-200 flex flex-col gap-3 p-5">
              <div>
                <div class="testimonial-card-header flex gap-3">
                  <div class="w-10 h-10 rounded-full overflow-hidden">
                    <img :src="`/images/people/${testimonial.reviewerImage}`" alt="Author Image"
                         class="w-full h-full object-cover">
                  </div>
                  <div class="text-sm">
                    <p class="font-semibold">
                      {{ testimonial.reviewerName }}
                    </p>
                    <p class="text-gray-600">
                      {{ testimonial.reviewerEmail }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="testimonial-card-body">
                <p v-for="text in testimonial.review" class="text-gray-600 pb-3 last:pb-0">
                  {{ text }}
                </p>
              </div>
              <div class="testimonial-card-footer flex items-center gap-3 text-gray-600 font-medium">
                <span>
                  {{ testimonial.reviewDate }}
                </span>
                <div class="w-2 h-2 bg-brand-500 rounded-full"></div>
                <span>
                  {{ testimonial.reviewTime }}
                </span>
              </div>
            </div>
          </template>
        </div>

        <div class="flex gap-8">
          <div class="flex justify-center items-center w-14 h-14 border border-gray-200 rounded-full">

          </div>
          <div class="flex justify-center items-center w-14 h-14 border border-gray-200 rounded-full">

          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="postcss">

</style>
