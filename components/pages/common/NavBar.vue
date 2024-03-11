<script setup lang="ts">
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
</script>

<template>
  <header>
    <div class="container mx-auto flex justify-between bg-transparent py-4">
      <div class="content flex items-center justify-between gap-10">
        <div class="logo">
          <img src="/images/logo.svg" alt="EduJobs Logo">
        </div>
        <nav class="shrink-0">
          <ul class="flex gap-8 flex-nowrap items-center font-medium text-gray-600">
            <template v-for="link in menuLinks">
              <li class="cursor-pointer hover:text-brand-500 transition">
                {{ link.label }}
              </li>
            </template>
          </ul>

        </nav>
      </div>
      <div class="nav-actions flex shrink-0 gap-3">
        <BaseButton label="Log in" :plane="true" />

        <BaseButton label="Sign up" :outline="true" />

        <BaseButton label="Post a Job" color="primary" />
      </div>
    </div>
  </header>
</template>

<style scoped lang="postcss">

</style>
