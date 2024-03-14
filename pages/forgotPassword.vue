<script setup lang="ts">
import KeyIcon from 'assets/icons/key.svg'
import ArrowLeftIcon from 'assets/icons/arrow-left.svg'
</script>

<template>
  <div class="forgot-password-form overflow-hidden">
    <div class="flex min-h-screen flex-col bg-white text-base font-inter font-semibold antialiased text-black relative">
      <div class="flex flex-col items-center mx-auto px-0 pt-20 pb-24">
        <img src="/images/others/bg-lines.png" alt="Background Thin Lines"
             class="absolute top-0 md:-top-1/2 inset-x-0 mx-auto w-full max-w-3xl"/>

        <div class="flex flex-col gap-8 z-10 max-w-[360px] lg:w-full">
          <div class="flex flex-col gap-6 items-center">
            <div
                class="w justify-center items-center">
              <div class="w-14 h-14 bg-white relative flex flex-col justify-center items-center rounded-xl shadow border border-gray-200">
                <KeyIcon class="w-7 h-7" />
              </div>
            </div>
            <div class="flex flex-col gap-3 items-center">
              <h2 class="text-3xl md:text-4xl mb-3">Forgot password?</h2>
              <p>No worries, we'll send you reset instructions.</p>
            </div>
          </div>
          <div>
            <form class="flex flex-col gap-6">
              <div class="form-control">
                <label class="font-medium mb-1.5 text-sm" for="school-email">School Email</label>
                <input class="form-input" id="school-email" type="email" placeholder="Enter your school email"/>
              </div>
              <BaseButton label="Reset password" :full-sized="true" />
            </form>
          </div>
          <div class="text-center">
            <NuxtLink to="/login" class="text-sm flex gap-2.5 items-center justify-center group">
              <ArrowLeftIcon class="w-4 h-4 text-gray-600 group-hover:-translate-x-[8px] transition" />
              Back to log in
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">

</style>
