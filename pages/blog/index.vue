<script setup lang="ts">
import {useBlogStore} from "~/segments/blogs/store";
import BaseSpinner from "~/components/core/BaseSpinner.vue";
import type {PaginationInfo} from "~/segments/common.types";

const blogsStore = useBlogStore();
const { blogs, categoriesDropdown, pagination } = storeToRefs(blogsStore);

const showPageLoader = ref<boolean>(true);
const showBlogsLoader = ref<boolean>(true);

const pageInfo = ref<PaginationInfo>({
  currentPage: 1,
  itemsPerPage: 9,
  totalPages: 0
});

onMounted(async () => {
  showPageLoader.value = true;
  await blogsStore.fetchBlogs(pageInfo.value);
  await blogsStore.fetchBlogsCategories();
  pageInfo.value.totalPages = pagination.value.pageCount;
  showPageLoader.value = false;
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

const searchedCategory = ref<string>('');
const selectedCategory = ref<string>('View All');

const filteredCategories = computed(() => {
  return categoriesDropdown.value.filter(category => category.label.toLowerCase().includes(searchedCategory.value.toLowerCase())) || [];
})

const firstBlog = ref<Blog>();
const splitBlogs = computed(() => {
  if (window.innerWidth >= 1024 )firstBlog.value = blogs.value.shift();
  return blogs.value
})

function selectCategory(label :string) {
  selectedCategory.value = label;
}

watch(() => selectedCategory.value, async (val :string) => {
  showBlogsLoader.value = true;
  pageInfo.value.currentPage = 1;
  if (val === 'View All') await blogsStore.fetchBlogs(pageInfo.value);
  else await blogsStore.fetchBlogsByCategory(pageInfo.value, val);
  pageInfo.value.totalPages = pagination.value.pageCount;
  showBlogsLoader.value = false;
})
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
          <div class="flex max-lg:flex-col items-start gap-16">
            <!--   Blog Categories Dropdown for Smaller Devices     -->
            <form class="w-full block lg:hidden">
              <label class="sr-only">Select Category</label>
              <select v-model="selectedCategory" id="categoriesDropdown" @change="getBlogsByCategory" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <template v-for="category in filteredCategories">
                  <option :value="category.label">{{ category.label }}</option>
                </template>
              </select>
            </form>

            <!--   Blog Posts List    -->
            <div class="w-full lg:grow">
              <template v-if="showBlogsLoader">
                <div class="flex justify-center items-center h-[40vh] w-full">
                  <BaseSpinner size="lg" :show-loader="showBlogsLoader" />
                </div>
              </template>
              <div v-else-if="splitBlogs.length" class="grid lg:grid-cols-2 gap-12 pb-16">
                  <template v-if="firstBlog">
                    <div class="flex justify-around max-xl:flex-col gap-8 md:col-span-2">
                      <div class="overflow-hidden md:h-[320px] md:grow shrink-0">
                        <img :src="firstBlog.post_photo?.url ?? '/images/others/blog-mockup.jpg'" alt="blog-list-img"
                             class="w-full h-full object-cover">
                      </div>
                      <div class="flex flex-col xl:w-[350px]">
                        <div class="flex flex-col gap-2 mb-6">
                          <div>
                          <span
                              class="bg-gray-50 rounded-full p-1 pr-2.5 border border-brand-200 text-xs text-brand-600 inline-flex items-center gap-2 mb-4">
                            <span
                                class="h-[22px] flex items-center justify-center bg-white rounded-full py-0.5 px-2 border border-brand-200 leading-[18px]">
                              {{ firstBlog?.category?.category_name || 'General' }}
                            </span>
                            {{ firstBlog.reading_time }}
                          </span>
                          </div>
                          <h3>
                            <NuxtLink :to="`/blog/${firstBlog.slug}`"
                                      class="flex items-center justify-between gap-3 text-3xl font-semibold hover:text-brand-600">
                              {{ firstBlog.title }}
                            </NuxtLink>
                          </h3>
                          <p class="text-black-light font-normal">{{ firstBlog.post_excerpt }}</p>
                        </div>

                        <div class="flex items-center gap-3">
                          <div class="h-10 w-10 rounded-full overflow-hidden">
                            <img :src="firstBlog.author.avatar || '/images/people/olivia.png'"
                                 :alt="firstBlog.author.name">
                          </div>
                          <div class="flex flex-col text-sm">
                            <h6 class="font-semibold">{{ firstBlog.author.name }}</h6>
                            <p>{{ firstBlog.post_date }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>

                  <template v-for="blog in splitBlogs">

                    <div v-if="blogs.length" class="flex flex-col justify-around">
                      <div class="overflow-hidden mb-5">
                        <div class="h-60">
                          <img :src="blog.post_photo?.url ?? '/images/others/blog-mockup.jpg'" alt="blog-list-img4"
                               class="w-full h-full object-cover">
                        </div>
                      </div>
                      <div class="flex flex-col gap-2 mb-6">
                        <div>
                          <span
                              class="bg-gray-50 rounded-full p-1 pr-2.5 border border-brand-200 text-xs text-brand-600 inline-flex items-center gap-2 mb-4">
                            <span
                                class="h-[22px] flex items-center justify-center bg-white rounded-full py-0.5 px-2 border border-brand-200 leading-[18px]">
                              {{ blog?.category?.category_name || 'General' }}
                            </span>
                            {{ blog.reading_time }}
                          </span>
                        </div>
                        <h3>
                          <NuxtLink :to="`/blog/${blog.slug}`"
                                    class="flex items-center justify-between gap-3 text-lg hover:text-brand-600">
                            <div class="line-clamp-2">{{ blog.title }}</div>
                            <span class="shrink-0">
                          <SvgoArrowNarrowUpRight class="w-4 h-4"/>
                        </span>
                          </NuxtLink>
                        </h3>
                        <p class="font-normal line-clamp-2">{{ blog.post_excerpt }}</p>
                      </div>
                      <div class="flex items-center gap-3">
                        <div class="h-10 w-10 rounded-full overflow-hidden">
                          <img :src="blog.author.avatar || '/images/people/olivia.png'" :alt="blog.author.name">
                        </div>
                        <div class="flex flex-col text-sm">
                          <h6 class="font-semibold">{{ blog.author.name }}</h6>
                          <p>{{ blog.post_date }}</p>
                        </div>
                      </div>
                    </div>
                  </template>
              </div>
              <div v-else class="text-center font-semibold text-lg lg:text-2xl mx-auto pb-10">
                <p>No Blogs are found</p>
              </div>
            </div>

            <!--   Blog Categories List   -->
            <div class="hidden lg:flex w-[280px] shrink-0 flex-col gap-8">
              <div class="relative">
                <SvgoSearchIcon
                    class="pointer-events-none absolute inset-y-0 left-2 h-full w-5 text-gray-500"
                    aria-hidden="true"
                />
                <input
                    v-model="searchedCategory"
                    id="search-category"
                    class="block h-full rounded-lg w-full shadow-xs border border-gray-300 bg-transparent py-[13px] pl-8 pr-0 text-black sm:text-sm"
                    placeholder="Search"
                    type="search"
                    name="search"
                />
              </div>

              <div class="flex flex-col grow gap-5">
                <h4 class="text-brand-700 font-semibold text-sm font-inter">Blog categories</h4>

                <ul class="flex flex-col gap-2">
                  <li
                      v-for="category in filteredCategories"
                      class="category-option"
                      :class="{ 'active': selectedCategory == category.label }"
                      @click="selectCategory(category.label)"
                  >
                    {{ category.label }}
                  </li>
                </ul>
              </div>
            </div>
          </div>


          <template v-if="pageInfo.totalPages !== 0">
            <hr class="mb-5">

            <CustomPagination
                :current-page="pageInfo.currentPage"
                :total-pages="pageInfo.totalPages"
                @paginate="paginateBlogs"
            />
          </template>
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
  @apply py-[.35rem] px-3 rounded-md text-gray-500 font-semibold cursor-pointer hover:text-gray-700 hover:bg-gray-50 transition
}
.category-option.active{
  @apply text-gray-700 bg-gray-50
}
</style>

