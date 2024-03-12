<script setup lang="ts">
import UsersIcon from "assets/icons/users.svg";
import SearchRefractionIcon from "assets/icons/search-refraction.svg";
import AnnouncementIcon from "assets/icons/announcement.svg";
import ArrowUpRightIcon from "assets/icons/arrow-narrow-up-right.svg";

const cardsList = [
  {
    title: 'Create Company Profile',
    text: 'Use your company profile to tell your story, build up your remote brand, and recruit the best. Job seekers come to us to research and discover remote companies.',
    linkText: 'Create a free company profile',
    icon: UsersIcon
  },
  {
    title: 'Define your hiring criteria',
    text: 'Specify time zone, visa, and skill requirements and get in front of the most relevant candidates. Promote your jobs to the world\'s best remote talent.',
    linkText: 'Post a job',
    icon: SearchRefractionIcon
  },
  {
    title: 'Be your company’s voice',
    text: 'Showcase your tech stack, company culture, perks and benefits, and more. We\'ll help you tell your story to make sure you attract the best talent.',
    linkText: 'Showcase employee brand',
    icon: AnnouncementIcon
  }
]
</script>

<template>
  <section>
    <div class="container">
      <div class="content">
        <div class="heading-and-subheading flex flex-col justify-center items-center gap-3 text-center">
          <p class="section-subheading">For Employers</p>
          <h2 class="section-heading">
            Find out what we have for your company
          </h2>
          <p class="supporting-text">
            Search and connect with the right candidates faster and go with a seamless flow
          </p>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 py-20">
          <template v-for="card in cardsList">
            <div class="flex flex-col gap-10 bg-gray-50 p-6">
              <div class="flex justify-center items-center bg-brand-500 text-white rounded-xl mx-auto w-14 h-14">
                <component :is="card.icon" class="w-8 h-8" />
              </div>
              <div class="flex flex-col gap-3 text-center">
                <h4 class="text-lg sm:text-xl md:text-2xl lg:text-3xl md:mb-4">
                  {{ card.title }}
                </h4>
                <p class="text-gray-600 md:text-lg">
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
          <BaseButton label="Create Company Profile" color="primary" :full-sized-on-small="true">
            <template #append-icon>
              <ArrowUpRightIcon class="w-3 h-3" />
            </template>
          </BaseButton>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="postcss">

</style>
