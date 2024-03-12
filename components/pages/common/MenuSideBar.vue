<script setup lang="ts">
defineProps<{ menuLinks: any[], isSidebarVisible: Boolean }>()
</script>

<template>
  <SideBarWrapper
      class="transform transition-all"
      :class="[isSidebarVisible ? 'translate-x-0' : '-translate-x-full']"
  >
    <div class="">
      <ul class="font-semibold pb-6">
        <template v-for="link in menuLinks">
          <li class="hover:text-brand-500 transition py-3">
            {{ link.label }}
          </li>
        </template>
      </ul>

      <div class="CTA-btns flex flex-col gap-3 py-6">
        <BaseButton label="Post a Job" color="primary" full-sized />

        <BaseButton label="Log in" :plane="true" full-sized />

        <BaseButton label="Sign up" :outline="true" full-sized />
      </div>
    </div>
  </SideBarWrapper>
</template>

<style scoped lang="postcss">

</style>
