<script setup lang="ts">
type ColorVariant = 'primary' | 'secondary' | 'gray' | 'plain'
const props = defineProps<{
  btnsGroup: any[]
  color? : ColorVariant,
  label: String
  outline? : Boolean
}>()

const emits = defineEmits(['optionSelected'])

let selectedOption = ref<number>(0)

function selectingOption(index :number) {
  selectedOption.value = index
  emits('optionSelected', index)
}
</script>

<template>
  <template v-for="(btn, i) in btnsGroup">
    <BaseButton
        :label="btn.label"
        :color="color"
        :outline="outline"
        :class="{
          'rounded-e-none': i === 0,
           'rounded-s-none': i === btnsGroup.length - 1,
           'bg-gray-200': i === selectedOption,
           '!py-[.575rem] text-sm': true
        }"
        @click="selectingOption(i)"
    >
      <template #prepend-icon>
        <component :is="btn.icon" class="w-4 h-4 text-gray-600" />
      </template>
    </BaseButton>
  </template>
</template>

<style scoped lang="postcss">

</style>
