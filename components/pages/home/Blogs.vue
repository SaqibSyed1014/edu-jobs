<script setup lang="ts">
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
            <div class="blog-post-card grid grid-cols-2 gap-5">
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
