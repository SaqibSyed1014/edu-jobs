<script setup lang="ts">
const orgLinks = [
  {
    label: "School Districts",
    path: "/school-districts",
  },
  {
    label: "Charter Schools",
    path: "/charter-schools",
  },
  {
    label: "Private Schools",
    path: "/private-schools",
  },
  {
    label: "Colleges",
    path: "/colleges",
  },
]

const organizations = [
  {
    logo: '/images/logos/logo-one.jpg',
    name: 'Arcadia Unified',
    counts: 20
  },
  {
    logo: '/images/logos/logo-two.jpg',
    name: 'Saratoga High',
    counts: 42
  },
  {
    logo: '/images/logos/logo-three.jpg',
    name: 'San Dieguito High',
    counts: 90
  },
  {
    logo: '/images/logos/logo-four.jpg',
    name: 'Saratoga Union',
    counts: 57
  },
  {
    logo: '/images/logos/logo-two.jpg',
    name: 'Palo Alto College',
    counts: 65
  },
  {
    logo: '/images/logos/logo-one.jpg',
    name: 'Saratoga Union',
    counts: 5
  }
]
</script>

<template>
  <div class="org-menu-wrapper w-[800px]">
    <div class="grid grid-cols-12">
      <div class="col-span-4">
        <h4 class="text-blue-600 text-lg font-semibold mb-4">Organizations Types</h4>
        <ul class="flex flex-col gap-4">
          <template v-for="orgLink in orgLinks">
            <li>
              <NuxtLink :to="orgLink.path" class="hover:text-brand-500 transition">{{ orgLink.label }}</NuxtLink>
            </li>
          </template>
        </ul>
      </div>
      <div class="col-span-8">
        <h4 class="text-blue-600 text-lg font-semibold mb-4">Organizations</h4>
        <div class="grid grid-cols-2 gap-x-4">
          <template v-for="org in organizations">
            <div class="flex items-center justify-between gap-12 rounded-lg py-3 px-2 hover:bg-gray-200 transition cursor-pointer">
              <div class="flex items-center gap-3">
                <div class="rounded-full overflow-hidden w-8 h-8 shrink-0">
                  <img :src="org.logo" alt="" class="w-full h-full object-cover">
                </div>
                <p class="text-sm shrink-0 text-ellipsis">{{ org.name }}</p>
              </div>
              <div class="border border-gray-300 text-gray-900 shrink-0 text-sm px-1">
                {{ org.counts }} jobs
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="text-end pt-4">
      <BaseButton navigate-to="" label="Create an organization account" />
    </div>
  </div>
</template>
