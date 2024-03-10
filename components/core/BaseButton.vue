<script setup lang="ts">
type ColorVariant = 'primary' | 'secondary' | 'ternary'
const props = defineProps<{
  color?: ColorVariant,
  label: string
  outline?: Boolean
  plane?: Boolean
  fullSized?: Boolean
}>()

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
</script>

<template>
  <button :class="[btnStyles, btnSize]">
    {{ label }}
  </button>
</template>
