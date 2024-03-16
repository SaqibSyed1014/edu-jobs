<script setup lang="ts">

</script>

<template>
  <div class="auth-form-layout pt-16 pb-24">
    <div class="container">
      <div class="grid md:grid-cols-12 md:gap-20">
        <div class="col-span-7 xl:col-span-8 flex items-center">
          <div class="flex flex-col items-center gap-8 py-8 justify-center max-lg:hidden">
            <h2 class="text-center text-2xl xl:text-3xl w-3/4 mx-auto">
              We’ve been using Untitled to kick start every new project and can’t imagine working without it.
            </h2>
            <div class="flex flex-col justify-center items-center gap-y-4">
              <img src="/images/people/lana.png" alt="Avatar" class="rounded-full h-20 w-20"/>
              <div class="text-center">
                <p class="font-semibold text-custom-primary-900">Lana Wilkinson</p>
                <p class="text-custom-tertiary-600">Junior, San Diego State University</p>
              </div>
            </div>
          </div>
        </div>

        <div class="col-span-5 xl:col-span-4">
          <div class="flex justify-center items-center">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
