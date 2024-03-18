<script setup lang="ts">
definePageMeta({
  layout: 'auth-form'
})
</script>

<template>
  <div class="flex flex-col justify-center gap-8 w-full">
    <div class="flex flex-col gap-3">
      <h1 class="font-semibold text-3xl">Sign up</h1>
      <p>Get started today and join EduJobs!</p>
    </div>
    <div class="w-full">
      <form action="" class="flex flex-col gap-5 pb-6">
        <div class="form-control">
          <label for="name">Name</label>
          <input type="text" id="name" placeholder="Enter your name" class="form-input"/>
        </div>
        <div class="form-control">
          <label for="email">Email</label>
          <input type="email" id="email" placeholder="Enter your email" class="form-input"/>
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" id="password" placeholder="Enter your password" class="form-input"/>
          <p class="text-sm">Must be at least 6 characters.</p>
        </div>
      </form>
      <div class="flex flex-col gap-4">
        <BaseButton label="Get Started" :full-sized="true"/>
      </div>
    </div>
    <p class="text-sm text-center">
      <span>Already have an account? </span>
      <NuxtLink to="/login" class="text-brand-600 font-semibold hover:text-brand-400 transition">
        Login
      </NuxtLink>
    </p>
  </div>
</template>
