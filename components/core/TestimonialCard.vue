<script setup lang="ts">
defineProps<{ testimonial: any }>()
</script>

<template>
  <div class="testimonial-card bg-gray-25 rounded-xl border border-gray-200 flex flex-col gap-3 p-5">
    <div>
      <div class="testimonial-card-header flex gap-3">
        <div class="w-10 h-10 rounded-full overflow-hidden">
          <img :src="`/images/people/${testimonial.reviewerImage}`" alt="Author Image"
               class="w-full h-full object-cover">
        </div>
        <div class="text-sm">
          <p class="font-semibold">
            {{ testimonial.reviewerName }}
          </p>
          <p class="text-gray-600">
            {{ testimonial.reviewerEmail }}
          </p>
        </div>
      </div>
    </div>
    <div class="testimonial-card-body">
      <p v-for="text in testimonial.review" class="text-gray-600 pb-3 last:pb-0">
        {{ text }}
      </p>
    </div>
    <div class="testimonial-card-footer flex items-center gap-3 text-gray-600 font-medium">
                <span>
                  {{ testimonial.reviewDate }}
                </span>
      <div class="w-2 h-2 bg-brand-500 rounded-full"></div>
      <span>
                  {{ testimonial.reviewTime }}
                </span>
    </div>
  </div>
</template>

<style scoped lang="postcss">

</style>
