<script setup lang="ts">
import {useBlogStore} from "~/segments/blogs/store";
import {convertDateFormat} from "~/segments/utils";
import BaseSpinner from "~/components/core/BaseSpinner.vue";
import type {PaginationInfo} from "~/segments/common.types";

const blogsStore = useBlogStore();
const { recentBlogs, blogs, categories, pagination } = storeToRefs(blogsStore);

const showPageLoader = ref<boolean>(false);
const showBlogsLoader = ref<boolean>(false);

const pageInfo = ref<PaginationInfo>({
  currentPage: 1,
  itemsPerPage: 9,
  totalPages: 0
});

onMounted(async () => {
  if (!blogs.value.length) {
    showPageLoader.value = true;
    await blogsStore.fetchRecentBlogs();
    await blogsStore.fetchBlogs(pageInfo.value);
    await blogsStore.fetchBlogsCategories();
    pageInfo.value.totalPages = pagination.value.pageCount;
    showPageLoader.value = false;
  }
})

async function fetchingBlogs() {
  showBlogsLoader.value = true;
  await blogsStore.fetchBlogs(pageInfo.value);
  pageInfo.value.totalPages = pagination.value.pageCount;
  showBlogsLoader.value = false;
}

function paginateBlogs(page: number | "prev" | "next") {
  if (page === "prev") pageInfo.value.currentPage--;
  else if (page === "next") pageInfo.value.currentPage++;
  else pageInfo.value.currentPage = page;
  fetchingBlogs();
}
</script>

<template>
  <template v-if="showPageLoader">
    <div class="container">
      <div class="flex justify-center items-center h-[calc(100vh-80px)] w-full">
        <BaseSpinner size="lg" :show-loader="showPageLoader" />
      </div>
    </div>
  </template>
  <template v-else>
    <div class="blog-listing-page">
      <section class="py-16 md:pt-24">
        <div class="container">
          <div class="text-left md:mb-16">
            <h3 class="text-brand-600 text-sm md:text-base mb-3">Our blog</h3>
            <h2 class="text-4xl md:text-5xl mb-6">Resources and insights</h2>
            <p class="md:text-xl font-normal mb-12">
              The latest industry news, interviews, technologies, and resources.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div class="container">
          <div class="flex items-start gap-16">
            <div class="w-[280px] shrink-0 flex flex-col gap-8">
              <div class="relative">
                <SvgoSearchIcon
                    class="pointer-events-none absolute inset-y-0 left-2 h-full w-5 text-gray-500"
                    aria-hidden="true"
                />
                <input
                    id="search-field"
                    class="block h-full rounded-lg w-full shadow-xs border border-gray-300 bg-transparent py-[13px] pl-8 pr-0 text-black sm:text-sm"
                    placeholder="Search"
                    type="search"
                    name="search"
                />
              </div>

              <div class="flex flex-col grow gap-5">
                <h4 class="text-brand-700 font-semibold text-sm font-inter">Blog categories</h4>

                <ul class="flex flex-col gap-2">
                  <li class="category-option">View All</li>
                  <li v-for="category in categories" class="category-option">
                    {{ category.category_name }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>


      </section>

<!--      <section>-->
<!--        <div class="container md:px-8">-->
<!--          <h2 class="text-xl md:text-2xl mb-8">Recent blog posts</h2>-->
<!--          <div class="grid lg:grid-cols-2 gap-8">-->
<!--            <template v-for="blog in recentBlogs.slice(0, 1)">-->
<!--              <div class="flex flex-col justify-around">-->
<!--                <div class="overflow-hidden rounded-2xl mb-5">-->
<!--                  <img :src="blog.post_photo?.url ?? '/images/others/blog-mockup.jpg'" alt="blog-list-img"-->
<!--                       class="w-full h-full object-cover">-->
<!--                </div>-->
<!--                <div class="flex flex-col gap-2 mb-6">-->
<!--                  <p class="text-brand-600 text-sm">{{ blog.author.name }} • {{ convertDateFormat(blog.post_date) }}</p>-->
<!--                  <h3>-->
<!--                    <NuxtLink :to="`/blog/${blog.slug}`"-->
<!--                              class="flex items-center justify-between gap-3 text-lg hover:text-brand-600">-->
<!--                      {{ blog.title }}-->
<!--                      <span class="shrink-0">-->
<!--                    <SvgoArrowNarrowUpRight class="w-4 h-4"/>-->
<!--                  </span>-->
<!--                    </NuxtLink>-->
<!--                  </h3>-->
<!--                  <p class="text-black-light font-normal">{{ blog.post_excerpt }}</p>-->
<!--                </div>-->
<!--                <div class="flex flex-wrap gap-2 font-medium text-sm">-->
<!--                  <div class="text-[#6941C6] bg-[#F9F5FF] border border-[#E9D7FE] rounded-full px-2.5 py-0.5">-->
<!--                    {{ blog?.category?.category_name || 'General' }}-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </template>-->
<!--            <div class="grid grid-cols-1 gap-8">-->
<!--              <template v-for="blog in recentBlogs.slice(1, 3)">-->
<!--                <div class="flex flex-col sm:flex-row gap-5">-->
<!--                  <div class="flex-none sm:w-60 2xl:w-80 overflow-hidden rounded-2xl">-->
<!--                    <img :src="blog.post_photo?.url ?? '/images/others/blog-mockup.jpg'" alt="blog-list-img"-->
<!--                         class="w-full h-full object-cover">-->
<!--                  </div>-->
<!--                  <div class="">-->
<!--                    <div class="flex flex-col gap-2 mb-6">-->
<!--                      <p class="text-brand-600 text-sm">{{ blog.author.name }} • {{-->
<!--                          convertDateFormat(blog.post_date)-->
<!--                        }}</p>-->
<!--                      <h3>-->
<!--                        <NuxtLink :to="`/blog/${blog.slug}`"-->
<!--                                  class="flex justify-between gap-3 text-lg hover:text-brand-600">-->
<!--                          {{ blog.title }}-->
<!--                        </NuxtLink>-->
<!--                      </h3>-->
<!--                      <p class="text-black-light font-normal line-clamp-3">{{ blog.post_excerpt }}</p>-->
<!--                    </div>-->
<!--                    <div class="flex flex-wrap gap-2 font-medium text-sm">-->
<!--                      <div class="text-[#6941C6] bg-[#F9F5FF] border border-[#E9D7FE] rounded-full px-2.5 py-0.5">-->
<!--                        {{ blog?.category?.category_name || 'General' }}-->
<!--                      </div>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </template>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </section>-->
<!--      <section class="py-16 md:py-24">-->
<!--        <div class="container md:px-8">-->
<!--          <h2 class="text-2xl mb-8">All blog posts</h2>-->
<!--          <template v-if="showBlogsLoader">-->
<!--            <div class="flex justify-center items-center h-[40vh] w-full">-->
<!--              <BaseSpinner size="lg" :show-loader="showBlogsLoader" />-->
<!--            </div>-->
<!--          </template>-->
<!--          <template v-else>-->
<!--            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-16">-->
<!--              <template v-for="blog in blogs">-->
<!--                <div class="flex flex-col justify-around">-->
<!--                  <div class="overflow-hidden rounded-2xl mb-5">-->
<!--                    <div class="h-60 sm:h-52">-->
<!--                      <img :src="blog.post_photo?.url ?? '/images/others/blog-mockup.jpg'" alt="blog-list-img4"-->
<!--                           class="w-full h-full object-cover">-->
<!--                    </div>-->
<!--                  </div>-->
<!--                  <div class="flex flex-col gap-2 mb-6">-->
<!--                    <p class="text-brand-600 text-sm">{{ blog.author.name }} • {{-->
<!--                        convertDateFormat(blog.post_date)-->
<!--                      }}</p>-->
<!--                    <h3>-->
<!--                      <NuxtLink :to="`/blog/${blog.slug}`"-->
<!--                                class="flex items-center justify-between gap-3 text-lg hover:text-brand-600">-->
<!--                        <div class="line-clamp-2">{{ blog.title }}</div>-->
<!--                        <span class="shrink-0">-->
<!--                      <SvgoArrowNarrowUpRight class="w-4 h-4"/>-->
<!--                    </span>-->
<!--                      </NuxtLink>-->
<!--                    </h3>-->
<!--                    <p class="font-normal line-clamp-2">{{ blog.post_excerpt }}</p>-->
<!--                  </div>-->
<!--                  <div class="flex flex-wrap gap-2 font-medium text-sm">-->
<!--                    <div class="text-[#6941C6] bg-[#F9F5FF] border border-[#E9D7FE] rounded-full px-2.5 py-0.5">-->
<!--                      {{ blog?.category?.category_name || 'General' }}-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </template>-->
<!--            </div>-->
<!--          </template>-->

<!--          <hr class="mb-5">-->

<!--          <CustomPagination-->
<!--              v-if="pageInfo.totalPages !== 0"-->
<!--              :current-page="pageInfo.currentPage"-->
<!--              :total-pages="pageInfo.totalPages"-->
<!--              @paginate="paginateBlogs"-->
<!--          />-->
<!--        </div>-->
<!--      </section>-->
<!--      <section class="pb-16 md:pb-24">-->
<!--        <div class="container md:px-8">-->
<!--          <div class="grid md:grid-cols-2 items-center gap-16 md:gap-0">-->
<!--            <div class="">-->
<!--              <h2 class="text-3xl md:text-5xl mb-6">Growth performance tracking made easy</h2>-->
<!--              <p class="text-black-light text-lg md:text-xl font-normal mb-8 md:mb-12">Start your 30-day free trial-->
<!--                today.</p>-->
<!--              <ul class="flex gap-3">-->
<!--                <li>-->
<!--                  <img src="/images/others/app-store.png" alt="app-store">-->
<!--                </li>-->
<!--                <li>-->
<!--                  <img src="/images/others/play-store.png" alt="play-store">-->
<!--                </li>-->
<!--              </ul>-->
<!--            </div>-->
<!--            <div class="">-->
<!--              <img src="/images/others/blog-content.png" alt="blog-content" class="w-full h-full object-cover">-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </section>-->
    </div>
  </template>
</template>

<style scoped>
.category-option{
  @apply py-2 px-3 rounded-md text-gray-500 font-semibold cursor-pointer hover:text-gray-700 hover:bg-gray-50 transition
}
</style>

