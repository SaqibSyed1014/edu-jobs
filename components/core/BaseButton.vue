<script setup lang="ts">
type ColorVariant = 'primary' | 'secondary' | 'gray' | 'plain'
const props = defineProps<{
  color?: ColorVariant,
  label: string
  outline?: Boolean
  fullSized?: Boolean
  fullSizedOnSmall?: Boolean
}>()

const defaultStyles = 'flex items-center justify-center gap-3'

const btnStyles = computed(() => {
  const colorStyles = {
    primary: props.outline ? 'border border-brand-600 text-brand-600 hover:bg-brand-600 hover:text-white' : 'bg-brand-600 text-white hover:bg-brand-500',
    secondary: props.outline ? 'border border-brand-600 text-brand-600 hover:bg-brand-600 hover:text-white' : 'bg-brand-600 text-white hover:bg-brand-500',
    gray: props.outline ? 'border border-gray-300 text-gray-700 hover:bg-gray-200' : 'bg-gray-300 text-white hover:bg-gray-200',
    plain: props.outline ? 'border border-gray-700 transparent text-gray-600' : 'bg-transparent text-gray-600 hover:bg-gray-200'
  };

  const baseStyles = 'rounded-lg px-4 py-2.5 font-semibold transition';

  const outlineStyles = props.outline ? 'hover:bg-gray-200' : '';

  return [
    colorStyles[props.color || 'primary'],
    outlineStyles,
    baseStyles
  ].filter(Boolean).join(' ');
});

const btnSize = computed(() => props.fullSized ? 'w-full' : '');
const btnSizeOnSmall = computed(() => props.fullSizedOnSmall ? 'max-sm:w-full' : '');

const btnStyleClasses = computed(() => [
  defaultStyles,
  btnStyles.value,
  btnSize.value,
  btnSizeOnSmall.value
]);
</script>

<template>
  <button :class="[defaultStyles, btnStyleClasses]">
    <slot name="prepend-icon"></slot>
    {{ label }}
    <slot name="append-icon"></slot>
  </button>
</template>
