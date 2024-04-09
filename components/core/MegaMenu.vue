<template>
  <div class="mega-menu relative inline-block" @mouseenter="showMenu = true" @mouseleave="showMenu = false">
    <div class="mega-menu-trigger flex items-center gap-6 relative cursor-pointer" :class="[{ 'before:hidden after:hidden': !showMenu }]">
      {{ label }}
      <div class="text-gray-600">
        <SvgoChevronDown class="w-5 h-5 transition" :class="{ 'rotate-180': showMenu }" />
      </div>
    </div>
    <Transition name="zoom-in">
      <div
          v-if="showMenu"
          class="menu absolute top-full border border-gray-200 mt-7 left-1/3 -translate-x-1/3 z-[50] bg-white rounded-lg shadow-lg p-6"
      >
        <slot />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const showMenu = ref(false);

const props = defineProps<{
  label: string
}>();
</script>

<style>
.mega-menu-trigger:before {
  content: "";
  position: absolute;
  top: 43px;
  left: 50%;
  transform: translate(-50%);
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 15px 15px 15px;
  border-color: transparent transparent #ffffff transparent;
  z-index: 111;
}
.mega-menu-trigger:after {
  content: "";
  position: absolute;
  top: 41.5px;
  left: 50%;
  transform: translate(-50%);
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 15px 15px 15px;
  border-color: transparent transparent theme('colors.gray.300') transparent;
  z-index: 11;
}

.zoom-in-enter-active,
.zoom-in-leave-active {
  transition: all 0.2s ease;
}

.zoom-in-enter-from,
.zoom-in-leave-to {
  transform: translateX(-33%) scale(.9);
  opacity: 0;
}

</style>
