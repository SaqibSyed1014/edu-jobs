<script setup lang="ts">

</script>

<template>
  <div class="listing-layout border-y border-gray-200 mb-12">
    <div class="container">
      <div class="grid grid-cols-12">
        <div class="col-span-3 border-r border-gray-200 px-4 py-8">
          <slot name="filters"/>
        </div>
        <div class="col-span-9">
          <div class="flex flex-col gap-8 w-full h-full">


            <div class="flex flex-col gap-8 p-8">
              <slot name="header"/>

              <slot name="search-filters"/>

              <slot name="cards-list"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">

</style>
