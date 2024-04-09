<script setup lang="ts">
defineProps<{ menuLinks: any[], isSidebarVisible: Boolean }>()

const emits = defineEmits(['toggleSidebar'])
</script>

<template>
  <SideBarWrapper
      :is-sidebar-visible="isSidebarVisible"
  >
    <nav>
      <ul class="font-semibold pb-6">
        <template v-for="link in menuLinks">
          <li class="hover:text-brand-500 transition py-3">
            <NuxtLink :to="link.path" @click.stop="emits('toggleSidebar')">{{ link.label }}</NuxtLink>
          </li>
        </template>
      </ul>

      <div class="cta-btns flex flex-col sm:hidden gap-3 py-6">
        <BaseButton navigate-to="/post-a-job" label="Post a Job" color="primary" full-sized @click.stop="emits('toggleSidebar')" />

        <BaseButton navigate-to="/login" label="Log in" :plane="true" full-sized @click.stop="emits('toggleSidebar')" />

        <BaseButton navigate-to="/signup" label="Sign up" :outline="true" full-sized @click.stop="emits('toggleSidebar')" />
      </div>
    </nav>
  </SideBarWrapper>
</template>

<style scoped lang="postcss">

</style>
