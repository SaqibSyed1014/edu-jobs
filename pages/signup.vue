<script setup lang="ts">
definePageMeta({
  layout: 'auth-form'
})

const passwordVisibility = ref(false)

const passwordFieldIcon = computed(() => {
  return passwordVisibility.value ? 'SvgoEyeOff' : 'SvgoEye'
})

const selectedUserType = ref('organization')
</script>

<template>
  <div class="flex flex-col justify-center gap-8 w-full py-12">
    <div class="flex flex-col gap-3">
      <h1 class="font-semibold text-3xl">Sign up</h1>
      <p>Get started today and join EduJobs!</p>
    </div>
    <div class="w-full">
      <form action="" class="flex flex-col gap-5 pb-6">
        <div class="flex gap-12">
          <div class="flex items-center">
            <input v-model="selectedUserType" id="org-cb" type="radio" value="organization" name="user-type" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2">
            <label for="org-cb" class="ms-2">Organization</label>
          </div>
          <div class="flex items-center">
            <input v-model="selectedUserType" id="job-seeker-cb" type="radio" name="user-type" value="jobSeeker" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
            <label for="job-seeker-cb" class="ms-2">Job Seeker</label>
          </div>
        </div>
        <div v-if="selectedUserType === 'organization'" class="form-control">
          <label for="org-name">Organization Name</label>
          <input type="text" id="org-name" placeholder="Enter your organization name" class="form-input" />
        </div>
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
          <div class="relative">
            <div class="absolute inset-y-0 top-0 flex items-center right-3">
              <component
                  :is="passwordFieldIcon"
                  class="w-5 h-5 text-gray-600 cursor-pointer"
                  @click="passwordVisibility = !passwordVisibility"
              />
            </div>
            <input :type="passwordVisibility ? 'text' : 'password'" id="password" placeholder="Enter your password" class="form-input"/></div>
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
