<script setup lang="ts">

import BaseButton from "~/components/core/BaseButton.vue";

const footerLinks = [
  {
    heading: 'For School Districts',
    links: ['Why Us', 'Post Job', 'Pricing', 'Sign Up']
  },
  {
    heading: 'For Candidates',
    links: ['Why Us', 'Sign Up', 'Browse Jobs']
  },
  {
    heading: 'Company',
    links: ['About Us', 'Careers', 'Blog', 'Contact Us']
  },
  {
    heading: 'Popular Job Searches',
    links: ['Teaching Jobs', 'School Jobs', 'Match Teacher Jobs', 'Stem Jobs']
  }
]
</script>

<template>
  <footer class="bg-gray-50">
    <div class="container">
      <div class="grid grid-cols-12 py-24">
        <div class="logo-and-text col-span-4">
          <img src="/images/logo.svg" alt="EduJobs Logo">

          <p class="pt-8">Explore jobs and hire talent in the easiest possible way.</p>
        </div>
        <template v-for="linkObj in footerLinks">
          <div class="footer-links col-span-2 font-semibold">
            <p class="text-brand-700 text-sm">{{ linkObj.heading }}</p>
            <ul class="flex flex-col gap-3 pt-4">
              <template v-for="link in linkObj.links">
                <li class="hover:text-gray-500 hover:underline cursor-pointer">{{ link }}</li>
              </template>
            </ul>
          </div>
        </template>
      </div>
    </div>
    <section class="bg-gray-25 py-12">
      <div class="container">
        <div class="content flex justify-between items-center">
          <div class="supporting-text">
            <p class="font-semibold text-lg">Join our newsletter</p>
            <p class="text-gray-600">We’ll send you a nice letter once per week. No spam.</p>
          </div>
          <form>
            <input type="email" placeholder="Enter your email">
            <BaseButton label="Subscribe" color="primary" class="ml-4" />
          </form>
        </div>
      </div>
    </section>
    <div class="container py-12">
      <hr class="border-b border-gray-200 mb-8">
      <div class="flex justify-between items-center text-gray-500">
        <div class="flex items-center gap-4">
          <span>
            © 2024 EduJobs.org
          </span>
          <div class="w-2 h-2 rounded-full bg-gray-500"/>
          <span>Terms and conditions</span>
          <div class="w-2 h-2 rounded-full bg-gray-500"/>
          <span>Privacy Policy</span></div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="postcss">

</style>
