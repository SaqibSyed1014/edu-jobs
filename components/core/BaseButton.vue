<script setup lang="ts">
type ColorVariant = 'primary' | 'secondary' | 'ternary'
const props = defineProps<{
  color?: ColorVariant,
  label: string
  outline?: Boolean
  plane?: Boolean
  fullSized?: Boolean
  fullSizedOnSmall?: Boolean
}>()

const defaultStyles = 'flex items-center justify-center gap-3'

const btnStyles = computed(() => {
  if (props.color === 'primary')
    return 'bg-brand-600 text-white rounded-lg px-4 py-2.5 font-semibold hover:bg-brand-500 transition'
  else if (props.color === 'secondary')
    return 'bg-brand-600 text-white rounded-lg px-4 py-2.5 font-semibold'
  else if (props.outline) {
    return 'border border-gray-300 text-gray-700 rounded-lg px-4 py-2.5 font-semibold hover:bg-gray-200 transition'
  }
  else if (props.plane)
    return 'bg-transparent text-gray-600 rounded-lg px-4 py-2.5 font-semibold hover:bg-gray-200 transition'
})

const btnSize = computed(() => {
  if (props.fullSized)
    return 'w-full'
  return ''
})

const btnSizeOnSmall = computed(() => {
  if (props.fullSizedOnSmall)
    return 'max-sm:w-full'
  return ''
})
</script>

<template>
  <button :class="[defaultStyles, btnStyles, btnSize, btnSizeOnSmall]">
    <slot name="prepend-icon"></slot>
    {{ label }}
    <slot name="append-icon"></slot>
  </button>
</template>
