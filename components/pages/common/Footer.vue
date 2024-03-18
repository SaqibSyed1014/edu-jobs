<script setup lang="ts">
import InstagramIcon from "assets/icons/instagram.svg";
import FacebookIcon from "assets/icons/facebook.svg";
import TwitterIcon from "~/assets/icons/twitter-x.svg";

const footerLinks = [
  {
    heading: 'For School Districts',
    links: [
      { label: 'Why Us', path: '' },
      { label: 'Post Job', path: '' },
      { label: 'Pricing', path: '/pricing' },
      { label: 'Sign Up', path: '/signup' },
    ]
  },
  {
    heading: 'For Candidates',
    links: [
      { label: 'Why Us', path: '' },
      { label: 'Sign Up', path: '/signup' },
      { label: 'Browse Jobs', path: '' },
    ]
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us', path: '' },
      { label: 'Careers', path: '/signup' },
      { label: 'Blog', path: '/blogs' },
      { label: 'Contact Us', path: '/contact-us' },
    ]
  },
  {
    heading: 'Popular Job Searches',
    links: [
      { label: 'Teaching Jobs', path: '' },
      { label: 'School Jobs', path: '' },
      { label: 'Match Teacher Jobs', path: '' },
      { label: 'Stem Jobs', path: '' },
    ]
  }
]
</script>

<template>
  <footer class="bg-gray-50">
    <div class="container">
      <div class="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-12 max-md:gap-8 py-24">
        <div class="logo-and-text col-span-4">
          <img src="/images/logo.svg" alt="EduJobs Logo">

          <p class="max-md:pb-4 pt-8">Explore jobs and hire talent in the easiest possible way.</p>
        </div>
        <template v-for="linkSection in footerLinks">
          <div class="footer-links col-span-2 font-semibold">
            <p class="text-brand-700 text-sm">{{ linkSection.heading }}</p>
            <ul class="flex flex-col gap-3 text-gray-600 pt-4">
              <template v-for="link in linkSection.links">
                <li class="hover:text-gray-500 hover:underline cursor-pointer">
                  <NuxtLink :to="link.path">{{ link.label }}</NuxtLink>
                </li>
              </template>
            </ul>
          </div>
        </template>
      </div>
    </div>
    <section class="bg-gray-25 py-12">
      <div class="container">
        <div class="content flex max-md:flex-col justify-between md:items-center gap-8">
          <div class="supporting-text">
            <p class="font-semibold text-lg text-gray-900">Join our newsletter</p>
            <p class="text-gray-600 text-base">We’ll send you a nice letter once per week. No spam.</p>
          </div>
          <form class="flex max-md:flex-col md:justify-end gap-4 w-full">
            <input type="email" placeholder="Enter your email">
            <BaseButton label="Subscribe" color="primary" class="" />
          </form>
        </div>
      </div>
    </section>
    <div class="container py-12">
      <hr class="border-b border-gray-200 mb-8">
      <div class="flex justify-between max-md:flex-col-reverse md:items-center text-gray-500 font-normal max-md:gap-6">
        <div class="flex max-md:flex-col md:items-center gap-4">
          <span class="max-md:block flex-1">
            © 2024 EduJobs.org
          </span>
          <div class="hidden md:block w-2 h-2 rounded-full bg-gray-500"/>
          <div class="flex items-center gap-4">
            <span>Terms and conditions</span>
            <div class="w-2 h-2 rounded-full bg-gray-500"/>
            <span>Privacy Policy</span></div>
        </div>
        <div class="social-links flex flex-1 gap-6 md:justify-end">
          <TwitterIcon class="w-6 h-6" />
          <InstagramIcon class="w-6 h-6" />
          <FacebookIcon class="w-6 h-6" />
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="postcss">

</style>
