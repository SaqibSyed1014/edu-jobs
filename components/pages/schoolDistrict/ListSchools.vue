<script lang="ts" setup>
defineProps<{ data: any[] }>();
</script>

<template>
  <div class="pt-5 border-t border-gray-200">
    <div class="grid gap-6">
      <div v-for="(item, index) in data" :key="index">
        <DistrictListCard :data="item" />
      </div>
    </div>

    <div class="mt-6 pt-5 border-t border-gray-200">
      <Pagination />
    </div>
  </div>
</template>
