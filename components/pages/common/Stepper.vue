<script setup lang="ts">
defineProps<{ steps: any[] }>();
</script>

<template>
  <div class="hidden lg:flex flex-row justify-between gap-8">
    <nav aria-label="Progress" class="">
      <ol role="list" class="overflow-hidden pl-1 pt-1">
        <li
          v-for="(step, stepIdx) in steps"
          :key="step.name"
          :class="[stepIdx !== steps.length - 1 ? 'pb-8' : '', 'relative']"
        >
          <template v-if="step.status === 'complete'">
            <div
              v-if="stepIdx !== steps.length - 1"
              class="absolute left-[9%] top-3.5 -ml-px mt-7 h-[30%] w-0.5 bg-brand-600"
              aria-hidden="true"
            />
            <NuxtLink
              :to="step.href"
              class="group relative flex items-center"
              :aria-disabled="step.status !== 'complete'"
            >
              <SvgoStepComp class="h-9 w-9" />
              <span class="ml-4 flex min-w-0 flex-col">
                <span class="text-xs lg:text-base font-semibold">{{
                  step.name
                }}</span>
              </span>
            </NuxtLink>
          </template>
          <template v-else-if="step.status === 'current'">
            <div
              v-if="stepIdx !== steps.length - 1"
              class="absolute left-[9%] top-3.5 -ml-px mt-7 h-[30%] w-0.5 bg-gray-200"
              aria-hidden="true"
            />
            <NuxtLink
              :to="step.href"
              class="group relative flex items-center"
              aria-current="step"
            >
              <span
                class="bg-brand-100 rounded-full h-11 w-11 -left-1 absolute"
              ></span>
              <span
                class="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 border-brand-600 bg-brand-600"
              >
                <span class="h-2.5 w-2.5 rounded-full bg-white" />
              </span>
              <span class="ml-4 flex min-w-0 flex-col">
                <span
                  class="text-xs lg:text-base font-semibold text-brand-700"
                  >{{ step.name }}</span
                >
              </span>
            </NuxtLink>
          </template>
          <template v-else>
            <div
              v-if="stepIdx !== steps.length - 1"
              class="absolute left-[9%] top-3.5 mt-7 h-[30%] w-0.5 bg-gray-200"
              aria-hidden="true"
            />
            <button disabled="true" class="group relative flex items-center">
              <!-- <NuxtLink
                :to="step.href"
                class="group relative flex items-center"
              > -->
              <span class="flex h-9 items-center" aria-hidden="true">
                <span
                  class="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 border-gray-200 bg-white group-hover:border-gray-400"
                >
                  <span class="h-2.5 w-2.5 rounded-full bg-gray-200" />
                </span>
              </span>
              <span class="ml-4 flex min-w-0 flex-col">
                <span class="text-base font-semibold text-gray-700">{{
                  step.name
                }}</span>
              </span>
              <!-- </NuxtLink> -->
            </button>
          </template>
        </li>
      </ol>
    </nav>
    <slot />
  </div>
</template>
