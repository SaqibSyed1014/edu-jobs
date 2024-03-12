<script setup lang="ts">
defineProps<{ blog: any }>()
</script>

<template>
  <div class="blog-post-card grid md:grid-cols-2 gap-5">
    <div class="blog-image rounded-2xl overflow-hidden">
      <img :src="`/images/blogs/${blog.image}`" alt="Blog Image" class="w-full h-full object-cover">
    </div>
    <div class="flex flex-col gap-6">
      <div class="blog-details">
        <p class="text-sm text-brand-700 font-semibold">
          {{ blog.category }}
        </p>
        <h5 class="text-lg">
          {{ blog.title }}
        </h5>
        <p class="text-gray-600 line-clamp-2">
          {{ blog.text }}
        </p>
      </div>
      <div class="author-details flex gap-3">
        <div class="w-10 h-10 rounded-full overflow-hidden">
          <img :src="`/images/people/${blog.author}`" alt="Author Image" class="w-full h-full object-cover">
        </div>
        <div class="text-sm">
          <p class="font-semibold">
            {{ blog.writtenBy }}
          </p>
          <p class="text-gray-600">
            {{ blog.writtenAt }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">

</style>
