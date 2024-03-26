<script setup lang="ts">
definePageMeta({
  layout: 'auth-form'
})

const passwordVisibility = ref(false)

const passwordFieldIcon = computed(() => {
  return passwordVisibility.value ? 'SvgoEyeOff' : 'SvgoEye'
})
</script>

<template>
  <div class="flex flex-col justify-center gap-8 w-full h-full">
    <div class="flex flex-col gap-3">
      <h1 class="font-semibold text-3xl">Welcome back</h1>
      <p>Welcome back! Please enter your details.</p>
    </div>
    <div class="w-full">
      <form action="" class="flex flex-col gap-5">
        <div class="form-control">
          <label for="email" class="text-custom-secondary-700">Email</label>
          <input type="email" id="email" placeholder="Enter your email" class="form-input"/>
        </div>
        <div class="form-control">
          <label for="password" class="text-custom-secondary-700">Password</label>
          <div class="relative">
            <div class="absolute inset-y-0 top-0 flex items-center right-3">
              <component
                  :is="passwordFieldIcon"
                  class="w-5 h-5 text-gray-600 cursor-pointer"
                  @click="passwordVisibility = !passwordVisibility"
              />
            </div>
            <input  :type="passwordVisibility ? 'text' : 'password'" id="password" placeholder="Enter your password" class="form-input"/>
          </div>
        </div>
      </form>
      <div class="flex w-full my-6 justify-between font-semibold items-center">
        <div class="flex gap-2 items-center text-sm">
          <input type="checkbox" class="form-checkbox"/>
          <span class="font-medium">Remember for 30 days</span>
        </div>
        <NuxtLink to="/forgot-password" class="font-semibold text-sm text-blue-500 hover:underline">
          Forgot password
        </NuxtLink>
      </div>
      <div class="flex flex-col gap-4">
        <BaseButton label="Sign in" :full-sized="true"/>
      </div>
    </div>
    <p class="text-sm text-center">
      <span>Don’t have an account? </span>
      <NuxtLink to="/signup" class="text-brand-600 font-semibold hover:text-brand-400 transition">
        Sign up
      </NuxtLink>
    </p>
  </div>
</template>
