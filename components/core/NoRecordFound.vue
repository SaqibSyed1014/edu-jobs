<script setup lang="ts">
defineProps<{
  name: string
  searchValue?: string
}>()
</script>

<template>
  <div class="w-2/3 lg:w-1/2 mx-auto py-16">
    <div class="flex flex-col items-center gap-5">
      <svg class="w-[175px]" viewBox="0 0 480 350" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="240" cy="175" r="174.545" fill="#EAECF0" />
        <circle cx="56.7273" cy="44.0909" r="17.4545" fill="#F2F4F7" />
        <circle cx="432" cy="275.364" r="13.0909" fill="#F2F4F7" />
        <circle cx="54.5455" cy="301.546" r="21.8182" fill="#F2F4F7" />
        <circle cx="458.182" cy="100.818" r="21.8182" fill="#F2F4F7" />
        <circle cx="416.727" cy="24.4546" r="15.2727" fill="#F2F4F7" />
        <g filter="url(#filter0_dd_57_1189)">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M247.605 35.3636C211.09 35.3636 178.789 53.4075 159.132 81.0654C152.713 79.5517 146.019 78.7507 139.138 78.7507C91.2137 78.7507 52.3636 117.601 52.3636 165.525C52.3636 213.449 91.2137 252.299 139.138 252.299L139.211 252.299H356.073C398.006 252.299 432 218.305 432 176.371C432 134.438 398.006 100.444 356.073 100.444C353.094 100.444 350.156 100.616 347.266 100.949C330.645 62.371 292.279 35.3636 247.605 35.3636Z" fill="#F9FAFB" />
          <circle cx="139.138" cy="165.525" r="86.774" fill="url(#paint0_linear_57_1189)" />
          <circle cx="247.605" cy="143.831" r="108.468" fill="url(#paint1_linear_57_1189)" />
          <circle cx="356.073" cy="176.371" r="75.9273" fill="url(#paint2_linear_57_1189)" />
        </g>
        <g filter="url(#filter1_b_57_1189)">
          <path d="M178.909 244.818C178.909 211.079 206.26 183.727 240 183.727C273.74 183.727 301.091 211.079 301.091 244.818C301.091 278.558 273.74 305.909 240 305.909C206.26 305.909 178.909 278.558 178.909 244.818Z" fill="#344054" fill-opacity="0.4" />
          <path d="M262.909 267.727L254 258.818M260.364 243.546C260.364 255.495 250.677 265.182 238.727 265.182C226.778 265.182 217.091 255.495 217.091 243.546C217.091 231.596 226.778 221.909 238.727 221.909C250.677 221.909 260.364 231.596 260.364 243.546Z" stroke="white" stroke-width="4.36364" stroke-linecap="round" stroke-linejoin="round" />
        </g>
        <defs>
          <filter id="filter0_dd_57_1189" x="32.3636" y="35.3636" width="419.636" height="256.935" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feMorphology radius="4" operator="erode" in="SourceAlpha" result="effect1_dropShadow_57_1189" />
            <feOffset dy="8" />
            <feGaussianBlur stdDeviation="4" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.03 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_57_1189" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feMorphology radius="4" operator="erode" in="SourceAlpha" result="effect2_dropShadow_57_1189" />
            <feOffset dy="20" />
            <feGaussianBlur stdDeviation="12" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.08 0" />
            <feBlend mode="normal" in2="effect1_dropShadow_57_1189" result="effect2_dropShadow_57_1189" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_57_1189" result="shape" />
          </filter>
          <filter id="filter1_b_57_1189" x="170.909" y="175.727" width="138.182" height="138.182" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feGaussianBlur in="BackgroundImageFix" stdDeviation="4" />
            <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_57_1189" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_57_1189" result="shape" />
          </filter>
          <linearGradient id="paint0_linear_57_1189" x1="72.5076" y1="108.192" x2="225.912" y2="252.299" gradientUnits="userSpaceOnUse">
            <stop stop-color="#D0D5DD" />
            <stop offset="0.350715" stop-color="white" stop-opacity="0" />
          </linearGradient>
          <linearGradient id="paint1_linear_57_1189" x1="164.318" y1="72.1651" x2="356.073" y2="252.299" gradientUnits="userSpaceOnUse">
            <stop stop-color="#D0D5DD" />
            <stop offset="0.350715" stop-color="white" stop-opacity="0" />
          </linearGradient>
          <linearGradient id="paint2_linear_57_1189" x1="297.771" y1="126.205" x2="432" y2="252.299" gradientUnits="userSpaceOnUse">
            <stop stop-color="#D0D5DD" />
            <stop offset="0.350715" stop-color="white" stop-opacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <div class="text-center">
        <h3 class="text-lg font-semibold pb-2">No {{ name }} found</h3>
        <p v-if="searchValue?.length">
          Your search {{ searchValue !== '*' ? `"${searchValue}"`: '' }} did not match any {{ name }}. Please try again.
        </p>
      </div>
    </div>
  </div>
</template>
