<script setup lang="ts">
const blogList = [
  {
    title: 'UX review presentations',
    text: 'How do you create compelling presentations that wow your colleagues and impress your managers?',
    image: 'blog-one.png',
    writtenBy: 'Olivia Rhye',
    writtenAt: '20 Jan 2024',
    author: 'olivia.png',
    tags: ['Software', 'Design']
  },
  {
    title: 'Migrating to Linear 101',
    text: 'How do you create compelling presentations that wow your colleagues and impress your managers?',
    image: 'blog-two.png',
    writtenBy: 'David',
    writtenAt: '22 Jan 2024',
    author: 'olivia.png',
    tags: ['Research', 'Management', 'Software']
  },
  {
    title: 'Building your API stack',
    text: 'How do you create compelling presentations that wow your colleagues and impress your managers?',
    image: 'blog-three.png',
    writtenBy: 'Malik Robinson',
    writtenAt: '18 Jan 2024',
    author: 'olivia.png',
    tags: ['Software', 'Tools', 'SaaS']
  },
  {
    title: 'UX review presentations',
    text: 'How do you create compelling presentations that wow your colleagues and impress your managers?',
    image: 'blog-four.png',
    writtenBy: 'Olivia Rhye',
    writtenAt: '20 Jan 2024',
    author: 'olivia.png',
    tags: ['Software', 'SaaS']
  },
  {
    title: 'Bill Walsh leadership lessons',
    text: 'How do you create compelling presentations that wow your colleagues and impress your managers?',
    image: 'blog-three.png',
    writtenBy: 'Andi Lee',
    writtenAt: '20 Jan 2024',
    author: 'olivia.png',
    tags: ['Design', 'SaaS']
  },
  {
    title: 'UX review presentations',
    text: 'How do you create compelling presentations that wow your colleagues and impress your managers?',
    image: 'blog-one.png',
    writtenBy: 'Lana',
    writtenAt: '20 Jan 2024',
    author: 'olivia.png',
    tags: ['SaaS']
  },
]

const blogsStore = useBlogStore()

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
        <template v-for="blog in blogList.slice(0, 1)">
          <div class="flex flex-col justify-around">
            <div class="overflow-hidden rounded-2xl mb-5">
              <img :src="`/images/blogs/${blog.image}`" alt="blog-list-img" class="w-full h-full object-cover object-top">
            </div>
            <div class="flex flex-col gap-2 mb-6">
              <p class="text-brand-600 text-sm">{{ blog.writtenBy }} • {{ blog.writtenAt }}</p>
              <h3>
                <NuxtLink to="/blog/details" class="flex items-center justify-between gap-1 text-lg hover:text-brand-600">
                  {{ blog.title }}
                  <span class="shrink-0">
                      <SvgoArrowNarrowUpRight class="w-4 h-4" />
                    </span>
                </NuxtLink>
              </h3>
              <p class="text-black-light font-normal">{{ blog.text }}</p>
            </div>
            <div class="flex flex-wrap gap-2 font-medium text-sm">
              <template v-for="tag in blog.tags">
                <div class="text-[#6941C6] bg-[#F9F5FF] border border-[#E9D7FE] rounded-full px-2.5 py-0.5">{{ tag }}</div>
              </template>
            </div>
          </div>
        </template>
        <div class="grid grid-cols-1 gap-8">
          <template v-for="blog in blogList.slice(1, 3)">
            <div class="flex flex-col sm:flex-row gap-5">
              <div class="flex-none sm:w-60 2xl:w-80 overflow-hidden rounded-2xl">
                <img :src="`/images/blogs/${blog.image}`" alt="blog-list-img" class="w-full h-full object-cover object-top">
              </div>
              <div class="">
                <div class="flex flex-col gap-2 mb-6">
                  <p class="text-brand-600 text-sm">{{ blog.writtenBy }} • {{ blog.writtenAt }}</p>
                  <h3>
                    <NuxtLink to="/blog/details" class="flex justify-between gap-1 text-lg hover:text-brand-600">
                      {{ blog.title }}
                    </NuxtLink>
                  </h3>
                  <p class="text-black-light font-normal line-clamp-3">{{ blog.text }}</p>
                </div>
                <div class="flex flex-wrap gap-2 font-medium text-sm">
                  <template v-for="tag in blog.tags">
                    <div class="text-[#6941C6] bg-[#F9F5FF] border border-[#E9D7FE] rounded-full px-2.5 py-0.5">{{ tag }}</div>
                  </template>
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
          <template v-for="blog in blogList">
            <div class="flex flex-col justify-around">
              <div class="overflow-hidden rounded-2xl mb-5">
                <img :src="`/images/blogs/${blog.image}`" alt="blog-list-img4" class="w-full h-full object-cover object-top">
              </div>
              <div class="flex flex-col gap-2 mb-6">
                <p class="text-brand-600 text-sm">{{ blog.writtenBy }} • {{ blog.writtenAt }}</p>
                <h3>
                  <NuxtLink to="/blog/details" class="flex items-center justify-between gap-1 text-lg hover:text-brand-600">
                    {{ blog.title }}
                    <span class="shrink-0">
                      <SvgoArrowNarrowUpRight class="w-4 h-4" />
                    </span>
                  </NuxtLink>
                </h3>
                <p class="text-black-light font-normal">{{ blog.text }}</p>
              </div>
              <div class="flex flex-wrap gap-2 font-medium text-sm">
                <template v-for="tag in blog.tags">
                  <div class="text-[#6941C6] bg-[#F9F5FF] border border-[#E9D7FE] rounded-full px-2.5 py-0.5">{{ tag }}</div>
                </template>
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
                <a href="#"><img src="/images/others/app-store.png" alt="app-store"></a>
              </li>
              <li>
                <a href="#"><img src="/images/others/play-store.png" alt="play-store"></a>
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
