<script setup lang="ts">
import HamburgerSVG from '~/assets/icons/hamburger.svg'
import XClose from '~/assets/icons/x-close.svg'

const menuLinks = [
  {
    label: 'Home',
    path: ''
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
    path: ''
  },
  {
    label: 'Our Blogs',
    path: ''
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
      <div class="content flex items-center justify-between gap-10">
        <div class="logo shrink-0">
          <img src="/images/logo.svg" alt="EduJobs Logo">
        </div>
        <!-- Menu Links -->
        <nav class="shrink-0 hidden md:block">
          <ul class="flex gap-8 flex-nowrap items-center font-medium text-gray-600">
            <template v-for="link in menuLinks">
              <li class="cursor-pointer hover:text-brand-500 transition">
                {{ link.label }}
              </li>
            </template>
          </ul>

        </nav>
      </div>

      <!--  Hamburger Icon    -->
      <HamburgerSVG
          v-if="!toggleSideBar"
          class="block md:hidden w-6 h-6"
          @click="togglingSidebarVisibility"
      />
      <XClose
          v-else
          class="block md:hidden w-4 h-4"
          @click="togglingSidebarVisibility"
      />

      <!--  CTA Btns    -->
      <div class="nav-actions hidden md:flex shrink-0 gap-3">
        <BaseButton label="Log in" :plane="true" />

        <BaseButton label="Sign up" :outline="true" />

        <BaseButton label="Post a Job" color="primary" />
      </div>
    </div>

    <MenuSideBar
        :is-sidebar-visible="toggleSideBar"
        :menu-links="menuLinks"
    />
  </header>
</template>

<style scoped lang="postcss">

</style>
