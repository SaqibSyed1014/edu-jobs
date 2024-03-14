<script setup lang="ts">
import GoogleIcon from "assets/icons/google.svg";
</script>

<template>
  <div class="auth-signup-form pt-16 pb-24">
    <div class="container">
      <div class="grid grid-cols-12 gap-20">
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
                  <BaseButton label="Sign in" :full-sized="true"/>
                  <BaseButton label="Sign in with Google" color="gray" :outline="true" :full-sized="true">
                    <template #prepend-icon>
                      <GoogleIcon class="w-5 h-5"/>
                    </template>
                  </BaseButton>
                </div>
              </div>
              <p class="text-sm text-center">
                <span>Already have an account? </span>
                <NuxtLink to="/login" class="text-brand-600 font-semibold hover:text-brand-400 transition">
                  Login
                </NuxtLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
