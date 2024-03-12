<script setup lang="ts">
import BlogCard from "~/components/core/BlogCard.vue";

const blogList = [
  {
    category: 'Design',
    title: 'UX review presentations',
    text: 'How do you create compelling presentations that wow your colleagues and impress your managers?',
    image: 'blog-one.png',
    writtenBy: 'Olivia Rhye',
    writtenAt: '20 Jan 2024',
    author: 'olivia.png'
  },
  {
    category: 'Product',
    title: 'Migrating to Linear 101',
    text: 'Linear helps streamline software projects, sprints, tasks, and bug tracking. Here’s how to get started.',
    image: 'blog-two.png',
    writtenBy: 'Olivia Rhye',
    writtenAt: '20 Jan 2024',
    author: 'david.png'
  },
  {
    category: 'Software Engineering',
    title: 'Building your API stack',
    text: 'The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.',
    image: 'blog-three.png',
    writtenBy: 'Olivia Rhye',
    writtenAt: '20 Jan 2024',
    author: 'lana.png'
  },
  {
    category: 'Product',
    title: 'PM mental models',
    text: 'Mental models are simple expressions of complex processes or relationships.',
    image: 'blog-four.png',
    writtenBy: 'Olivia Rhye',
    writtenAt: '20 Jan 2024',
    author: 'demi.png'
  }
]

const blogsSlider = ref(null)
</script>

<template>
  <section class="bg-gray-25 py-24">
    <div class="container">
      <div class="content">
        <div class="heading-and-subheading flex max-md:flex-col gap-4 pb-16">
          <h2 class="section-heading">
            Latest writings
          </h2>
          <p class="supporting-text">
            The latest news, technologies, and resources from our team.
          </p>
        </div>

        <div class="hidden md:grid grid-cols-2 gap-x-8 gap-y-12 py-24">
          <template v-for="blog in blogList">
            <BlogCard :blog="blog" />
          </template>
        </div>

        <div class="md:hidden">
          <swiper-container
              ref="blogsSlider"
              :loop="true"
              :free-mode="true"
              :slides-per-view="1"
              :space-between="20"
              class="blogs-mobile-slider"
          >
            <swiper-slide v-for="blog in blogList">
              <BlogCard :blog="blog" />
            </swiper-slide>
          </swiper-container>
        </div>

        <div class="flex md:hidden justify-between gap-8 pt-8 pb-12">
          <div @click="blogsSlider?.swiper?.slidePrev()" class="slider-nav-arrows right">

          </div>
          <div @click="blogsSlider?.swiper?.slideNext()" class="slider-nav-arrows left">

          </div>
        </div>

        <div>
          <BaseButton label="See Our Blog" color="primary" />
        </div>
      </div>
    </div>

  </section>
</template>

<style scoped lang="postcss">

</style>
