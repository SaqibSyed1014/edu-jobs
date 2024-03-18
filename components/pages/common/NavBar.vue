<script setup lang="ts">
import HamburgerIcon from '~/assets/icons/hamburger.svg'
import XCloseIcon from '~/assets/icons/x-close.svg'

const menuLinks = [
  {
    label: 'Home',
    path: '/'
  },
  {
    label: 'Jobs',
    path: ''
  },
  {
    label: 'School districts',
    path: ''
  },
  {
    label: 'Colleges',
    path: ''
  },
  {
    label: 'Pricing',
    path: '/pricing'
  },
  {
    label: 'Our Blogs',
    path: '/blogs'
  }
]

let toggleSideBar = ref(false)

function togglingSidebarVisibility() {
  toggleSideBar.value = !toggleSideBar.value
  if (toggleSideBar.value) {
    document.body.classList.add('overflow-hidden')
  } else {
    document.body.classList.remove('overflow-hidden')
  }
}
</script>

<template>
  <header>
    <div class="container mx-auto flex items-center justify-between bg-transparent py-4 relative z-40">
      <div class="content flex items-center justify-between gap-7 xl:gap-10">
        <div class="logo shrink-0">
          <img src="/images/logo.svg" alt="EduJobs Logo">
        </div>
        <!-- Menu Links -->
        <nav class="shrink-0 hidden md:block">
          <ul class="flex gap-5 xl:gap-8 flex-nowrap items-center font-medium text-gray-600">
            <template v-for="link in menuLinks">
              <li class="hover:text-brand-500 transition">
                <NuxtLink :to="link.path">{{ link.label }}</NuxtLink>
              </li>
            </template>
          </ul>

        </nav>
      </div>

      <!--  Hamburger Icon    -->
      <HamburgerIcon
          v-if="!toggleSideBar"
          class="block md:hidden w-6 h-6"
          @click="togglingSidebarVisibility"
      />
      <XCloseIcon
          v-else
          class="block md:hidden w-4 h-4"
          @click="togglingSidebarVisibility"
      />

      <!--  CTA Btns  -->
      <div class="nav-actions hidden md:flex shrink-0 gap-2 xl:gap-3">
        <BaseButton
            label="Log in"
            color="plain"
            navigate-to="/login"
        />

        <BaseButton
            label="Sign up"
            color="gray"
            :outline="true"
            navigate-to="/signup"
        />

        <BaseButton
            label="Post a Job"
            color="primary"
        />
      </div>
    </div>

    <MenuSideBar
        :is-sidebar-visible="toggleSideBar"
        :menu-links="menuLinks"
    />
  </header>
</template>

<style scoped>
header nav ul li .router-link-active{
  color: theme('colors.brand.600');
  font-weight: 600;
}
</style>
