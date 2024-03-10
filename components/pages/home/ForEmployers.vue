<script setup lang="ts">
const cardsList = [
  {
    title: 'Create Company Profile',
    text: 'Use your company profile to tell your story, build up your remote brand, and recruit the best. Job seekers come to us to research and discover remote companies.',
    linkText: 'Create a free company profile',
    icon: ''
  },
  {
    title: 'Define your hiring criteria',
    text: 'Specify time zone, visa, and skill requirements and get in front of the most relevant candidates. Promote your jobs to the world\'s best remote talent.',
    linkText: 'Post a job',
    icon: ''
  },
  {
    title: 'Be your company’s voice',
    text: 'Showcase your tech stack, company culture, perks and benefits, and more. We\'ll help you tell your story to make sure you attract the best talent.',
    linkText: 'Showcase employee brand',
    icon: ''
  }
]
</script>

<template>
  <section>
    <div class="container">
      <div class="content">
        <div class="heading-and-subheading flex flex-col justify-center items-center gap-3 text-center">
          <p class="text-brand-700 font-semibold">For Employers</p>
          <h2 class="text-4xl font-semibold tracking-[-2%]">
            Find out what we have for your company
          </h2>
          <p class="text-lg text-gray-600">
            Search and connect with the right candidates faster and go with a seamless flow
          </p>
        </div>

        <div class="grid grid-cols-3 gap-8 py-20">
          <template v-for="card in cardsList">
            <div class="flex flex-col gap-10 bg-gray-50 p-6">
              <div class="bg-brand-500 text-white rounded-xl mx-auto w-14 h-14">

              </div>
              <div class="flex flex-col gap-4 text-center">
                <h4 class="text-3xl mb-4">
                  {{ card.title }}
                </h4>
                <p class="text-gray-600 text-lg">
                  {{ card.text }}
                </p>
                <span class="text-brand-500 font-semibold">
                  {{ card.linkText }}
                </span>
              </div>
            </div>
          </template>
        </div>

        <div class="text-center">
          <BaseButton label="Create Company Profile" color="primary" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="postcss">

</style>
