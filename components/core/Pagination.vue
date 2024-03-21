<script setup lang="ts">

</script>

<template>
  <div class="pagination border-t border-[#EAECF0] flex justify-between text-sm pt-5">
    <BaseButton color="gray" :outline="true" label="Previous">
      <template #prepend-icon>
        <SvgoArrowLeft class="w-4 h-4 text-gray-600"/>
      </template>
    </BaseButton>
    <p class="flex items-center text-sm text-[#344054] block md:hidden font-medium">Page 1 of 10</p>
    <ul class="hidden md:flex pagination font-medium">
      <li class="active">1</li>
      <li>2</li>
      <li>3</li>
      <li>...</li>
      <li>8</li>
      <li>9</li>
      <li>10</li>
    </ul>
    <BaseButton color="gray" :outline="true" label="Next">
      <template #append-icon>
        <SvgoArrowRight class="w-4 h-4 text-gray-600"/>
      </template>
    </BaseButton>
  </div>
</template>

<style scoped lang="postcss">
.pagination ul li{
  @apply px-4 py-2 cursor-pointer text-gray-600 hover:bg-gray-50 transition
}
.pagination .active{
  @apply bg-gray-50 rounded-lg text-gray-800
}
</style>
