<script setup>
const nuxtApp = useNuxtApp()

nuxtApp.hook("page:finish", () => {
  window.scrollTo(0, 0); // emphasize scroll to top on route change
})
</script>

<template>
  <Html lang="en-US">
    <Body
        class="bg-gray-25 text-gray-900 antialiased transition-colors duration-300"
    >
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>

