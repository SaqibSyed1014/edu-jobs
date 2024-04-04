<script setup lang="ts">
defineProps<{ blog: Blog }>()
</script>

<template>
  <div class="blog-post-card grid md:grid-cols-2 gap-5">
    <div class="blog-image rounded-2xl overflow-hidden">
      <img :src="blog.post_photo.url" alt="Blog Image" class="w-full h-full object-cover">
    </div>
    <div class="flex flex-col gap-6">
      <div class="blog-details">
        <p class="text-sm text-brand-700 font-semibold">
          {{ blog.category.category_name }}
        </p>
        <NuxtLink :to="`/blog/${blog.slug}`" class="hover:text-brand-600">
          <h5 class="text-lg">
            {{ blog.title }}
          </h5>
        </NuxtLink>
        <p class="text-gray-600 line-clamp-2">
          {{ blog.post_excerpt }}
        </p>
      </div>
      <div class="author-details flex gap-3">
        <div class="w-10 h-10 rounded-full overflow-hidden">
          <img v-if="blog.author.avatar" :src="`/images/people/${blog.author.avatar}`" alt="Author Image" class="w-full h-full object-cover">
        </div>
        <div class="text-sm">
          <p class="font-semibold">
            {{ blog.author.name }}
          </p>
          <p class="text-gray-600">
            {{ blog.post_date }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">

</style>
