<script setup lang="ts">
import HamburgerIcon from "~/assets/icons/hamburger.svg";
import XCloseIcon from "~/assets/icons/x-close.svg";

const menuLinks = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Jobs",
    path: "/job-listings",
  },
  {
    label: "School districts",
    path: "/school-districts",
  },
  {
    label: "Colleges",
    path: "/colleges",
  },
  {
    label: "Pricing",
    path: "/pricing",
  },
  {
    label: "Our Blogs",
    path: "/blogs",
  },
];

let toggleSideBar = ref(false);

function togglingSidebarVisibility() {
  toggleSideBar.value = !toggleSideBar.value;
  if (toggleSideBar.value) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
  }
}
</script>

<template>
  <header class="max-md:sticky bg-gray-25 top-0 w-full z-[500]">
    <div
      class="container mx-auto flex items-center justify-between bg-transparent py-4 relative z-40"
    >
      <div class="content flex items-center justify-between gap-7 xl:gap-10">
        <div class="logo shrink-0">
          <img src="/images/logo.svg" alt="EduJobs Logo" />
        </div>
        <!-- Menu Links -->
        <nav class="shrink-0 hidden lg:block">
          <ul
            class="flex gap-5 xl:gap-8 flex-nowrap items-center font-medium text-gray-600"
          >
            <template v-for="link in menuLinks">
              <li class="hover:text-brand-500 transition">
                <NuxtLink :to="link.path">{{ link.label }}</NuxtLink>
              </li>
            </template>
          </ul>
        </nav>
      </div>

      <div class="flex items-center gap-3">
        <!--  CTA Btns  -->
        <div class="nav-actions hidden sm:flex shrink-0 gap-2 xl:gap-3">
          <BaseButton label="Log in" color="plain" navigate-to="/login"/>

          <BaseButton
              label="Sign up"
              color="gray"
              :outline="true"
              navigate-to="/signup"
          />

          <BaseButton
              label="Post a Job"
              color="primary"
              navigate-to="/post-a-job"
          />
        </div>

        <!--  Hamburger Icon    -->
        <div class="block lg:hidden">
          <HamburgerIcon
              v-if="!toggleSideBar"
              class=" w-6 h-6"
              @click="togglingSidebarVisibility"
          />
          <XCloseIcon
              v-else
              class="w-4 h-4"
              @click="togglingSidebarVisibility"
          />
        </div>
      </div>
    </div>

    <MenuSideBar
      :is-sidebar-visible="toggleSideBar"
      :menu-links="menuLinks"
      @toggle-sidebar="toggleSideBar = false"
    />
  </header>
</template>

<style>
header nav ul li .router-link-active {
  color: theme("colors.brand.600");
  font-weight: 600;
}
</style>
