<script setup lang="ts">
import {useBlogStore} from "~/segments/blogs/store";

const blogsStore = useBlogStore()

const { blogs } = storeToRefs(blogsStore)

onMounted(async () => {
  await blogsStore.fetchBlogs()
})
</script>

<template>
  <div class="">
    <section class="py-16 md:py-25">
      <div class="container md:px-8">
        <div class="text-center mx-auto w-full max-w-3xl md:mb-16">
          <h3 class="text-brand-600 text-sm md:text-base mb-3">Our blog</h3>
          <h2 class="text-3xl md:text-4xl mb-6">Stories and interviews</h2>
          <p class="text-black-light md:text-xl font-normal mb-12">Subscribe to learn about new product features, the latest in technology, solutions, and updates.</p>
          <form class="w-full mx-auto max-w-md text-left">
            <div class="flex flex-col md:flex-row items-start gap-4">
              <div class="w-full">
                <input type="email" name="email" id="email" class="form-input w-full" placeholder="Enter your email">
                <p class="font-normal text-sm mt-1.5">We care about your data in our <a href="" class="underline hover:no-underline">privacy policy</a>.</p>
              </div>
              <BaseButton label="Get Start" :full-sized-on-small="true" />
            </div>
          </form>
        </div>
      </div>
    </section>
    <section>
      <div class="container md:px-8">
        <h2 class="text-xl md:text-2xl mb-8">Recent blog posts</h2>
      <div class="grid lg:grid-cols-2 gap-8">
        <template v-for="blog in blogs.slice(0, 1)">
          <div class="flex flex-col justify-around">
            <div class="overflow-hidden rounded-2xl mb-5">
              <img :src="blog.post_photo?.url ?? '/images/others/blog-mockup.jpg'" alt="blog-list-img" class="w-full h-full object-cover">
            </div>
            <div class="flex flex-col gap-2 mb-6">
              <p class="text-brand-600 text-sm">{{ blog.author.name }} • {{ blog.post_date }}</p>
              <h3>
                <NuxtLink :to="`/blog/${blog.slug}`" class="flex items-center justify-between gap-3 text-lg hover:text-brand-600">
                  {{ blog.title }}
                  <span class="shrink-0">
                    <SvgoArrowNarrowUpRight class="w-4 h-4" />
                  </span>
                </NuxtLink>
              </h3>
              <p class="text-black-light font-normal">{{ blog.post_excerpt }}</p>
            </div>
            <div class="flex flex-wrap gap-2 font-medium text-sm">
              <div class="text-[#6941C6] bg-[#F9F5FF] border border-[#E9D7FE] rounded-full px-2.5 py-0.5">
                {{ blog.category.category_name }}
              </div>
            </div>
          </div>
        </template>
        <div class="grid grid-cols-1 gap-8">
          <template v-for="blog in blogs.slice(1, 3)">
            <div class="flex flex-col sm:flex-row gap-5">
              <div class="flex-none sm:w-60 2xl:w-80 overflow-hidden rounded-2xl">
                <img :src="blog.post_photo?.url ?? '/images/others/blog-mockup.jpg'" alt="blog-list-img" class="w-full h-full object-cover">
              </div>
              <div class="">
                <div class="flex flex-col gap-2 mb-6">
                  <p class="text-brand-600 text-sm">{{ blog.author.name }} • {{ blog.post_date }}</p>
                  <h3>
                    <NuxtLink :to="`/blog/${blog.slug}`" class="flex justify-between gap-3 text-lg hover:text-brand-600">
                      {{ blog.title }}
                    </NuxtLink>
                  </h3>
                  <p class="text-black-light font-normal line-clamp-3">{{ blog.post_excerpt }}</p>
                </div>
                <div class="flex flex-wrap gap-2 font-medium text-sm">
                    <div class="text-[#6941C6] bg-[#F9F5FF] border border-[#E9D7FE] rounded-full px-2.5 py-0.5">
                      {{ blog.category.category_name }}
                    </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
      </div>
    </section>
    <section class="py-16 md:py-24">
      <div class="container md:px-8">
        <h2 class="text-2xl mb-8"> All blog posts</h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-16">
          <template v-for="blog in blogs">
            <div class="flex flex-col justify-around">
              <div class="overflow-hidden rounded-2xl mb-5">
                <div class="h-60 sm:h-52">
                  <img :src="blog.post_photo?.url ?? '/images/others/blog-mockup.jpg'" alt="blog-list-img4"
                        class="w-full h-full object-cover">
                </div>
              </div>
              <div class="flex flex-col gap-2 mb-6">
                <p class="text-brand-600 text-sm">{{ blog.author.name }} • {{ blog.post_date }}</p>
                <h3>
                  <NuxtLink :to="`/blog/${blog.slug}`" class="flex items-center justify-between gap-3 text-lg hover:text-brand-600">
                    <div class="line-clamp-2">{{ blog.title }}</div>
                    <span class="shrink-0">
                      <SvgoArrowNarrowUpRight class="w-4 h-4" />
                    </span>
                  </NuxtLink>
                </h3>
                <p class="font-normal line-clamp-2">{{ blog.post_excerpt }}</p>
              </div>
              <div class="flex flex-wrap gap-2 font-medium text-sm">
                  <div class="text-[#6941C6] bg-[#F9F5FF] border border-[#E9D7FE] rounded-full px-2.5 py-0.5">
                    {{ blog.category.category_name }}
                  </div>
              </div>
            </div>
          </template>
        </div>
        <div class="border-t border-[#EAECF0] flex justify-between text-sm pt-5">
          <button type="button" class="flex items-center font-semibold gap-3 hover:text-brand-600">
            <SvgoArrowLeft class="w-4 h-4 text-gray-600" />
            Previous
          </button>
          <p class="text-sm text-[#344054] block md:hidden font-medium">Page 1 of 10</p>
          <ul class="hidden md:flex gap-8 pagination font-medium">
            <li><a href="#" class="active">1</a></li>
            <li><a href="#">2</a></li>
            <li><a href="#">3</a></li>
            <li>...</li>
            <li><a href="#">8</a></li>
            <li><a href="#">9</a></li>
            <li><a href="#">10</a></li>
          </ul>
          <button type="button" class="flex items-center font-semibold gap-3 hover:text-brand-600">
            Next
            <SvgoArrowRight class="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
    </section>
    <section class="pb-16 md:pb-24">
      <div class="container md:px-8">
        <div class="grid md:grid-cols-2 items-center gap-16 md:gap-0">
          <div class="">
            <h2 class="text-3xl md:text-5xl mb-6">Growth performance tracking made easy</h2>
            <p class="text-black-light text-lg md:text-xl font-normal mb-8 md:mb-12">Start your 30-day free trial today.</p>
            <ul class="flex gap-3">
              <li>
                <img src="/images/others/app-store.png" alt="app-store">
              </li>
              <li>
               <img src="/images/others/play-store.png" alt="play-store">
              </li>
            </ul>
          </div>
          <div class="">
            <img src="/images/others/blog-content.png" alt="blog-content" class="w-full h-full object-cover">
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="postcss">

</style>
