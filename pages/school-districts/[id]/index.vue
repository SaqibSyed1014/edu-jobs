<script setup>
const activeTab = ref(0); // Default to first tab

// Array of tab names and icons
const tabs = ref([
  { name: "About School District" },
  { name: "List of Schools" },
  { name: "Photos" },
  { name: "Videos" },
]);

const listData = ref([
  {
    title: "Academic Excellence:",
    desc: "The district is recognized for its commitment to academic excellence, and many of its schools have received high rankings. Students often excel in various academic and extracurricular activities.",
  },
  {
    title: "Innovation and Technology:",
    desc: "Given its location in the heart of Silicon Valley, PAUSD emphasizes innovation and technology in education. There are efforts to incorporate technology into the learning environment, preparing students for the challenges of the digital age.",
  },
  {
    title: "Diversity:",
    desc: "The district is known for its diverse student body, reflecting the cultural and socioeconomic diversity of the community. Efforts are made to promote inclusivity and provide a well-rounded education for all students.",
  },
  {
    title: "Community Engagement:",
    desc: "Palo Alto residents are actively involved in the education system, participating in school activities, parent-teacher organizations, and community initiatives that support the schools.",
  },
  {
    title: "Challenges:",
    desc: "Like many high-performing school districts, PAUSD faces challenges related to academic pressure, student well-being, and maintaining a balance between achievement and the overall well-rounded development of students.",
  },
]);
</script>

<style>
/* Adjust styles as needed */
</style>

<template>
  <div class="border-t border-b border-gray-200 mb-24">
    <div class="container flex">
      <!-- Sidebar -->
      <aside class="w-64 flex flex-col border-r border-gray-200 pt-8">
        <!-- Tabs -->
        <div class="flex flex-col flex-grow">
          <!-- Loop through tabs -->
          <button
            v-for="(tab, index) in tabs"
            :key="index"
            :class="
              activeTab === index
                ? 'text-brand-800 text-sm font-semibold py-2 px-3 flex items-center justify-between border-l-2 border-brand-600'
                : 'py-2 px-3 flex items-center justify-between text-sm text-gray-500 '
            "
            @click="activeTab = index"
          >
            <span>{{ tab.name }}</span>
          </button>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-grow pt-8 pb-10">
        <!-- Content for each tab -->
        <div v-show="activeTab === 0">
          <div class="w-full h-5 justify-between items-start inline-flex">
            <div class="pl-3 justify-start items-center gap-3 flex">
              <div class="justify-center items-center flex">
                <div class="text-slate-600 text-sm font-medium leading-tight">
                  School districts
                </div>
              </div>
              <SvgoChevronRight class="size-4" />
              <div class="justify-center items-center flex">
                <div class="text-blue-800 text-sm font-semibold leading-tight">
                  Palo alto unified school districts
                </div>
              </div>
            </div>
            <div class="justify-center items-center gap-1.5 flex">
              <SvgoArrowLeftBlue class="size-5" />
              <div class="text-blue-800 text-sm font-semibold leading-tight">
                Back
              </div>
            </div>
          </div>

          <div class="pt-5">
            <img
              src="/images/schoolDistrict/cover.webp"
              class="h-60 w-full object-cover"
            />
          </div>

          <div class="-mt-5 px-6 max-w-[936px]">
            <div class="h-24 justify-start items-center gap-6 inline-flex">
              <div
                class="w-24 h-24 rounded-[10px] justify-center items-center flex"
              >
                <img
                  src="/images/schoolDistrict/logo-avatar.png"
                  class="object-cover scale-110"
                />
              </div>
              <div class="flex-col justify-start items-start gap-5 inline-flex">
                <p class="text-gray-900 text-3xl font-semibold leading-[38px]">
                  Palo Alto Unified School District
                </p>
              </div>
            </div>

            <div class="flex flex-wrap gap-9 pb-6">
              <div class="flex flex-col gap-2">
                <span class="text-gray-900 text-sm font-medium leading-tight"
                  >Location
                </span>
                <div class="inline-flex gap-2">
                  <SvgoUsFlag class="size-5" />
                  <span
                    class="text-slate-600 text-base font-medium leading-normal"
                    >Palo Alto, CA</span
                  >
                </div>
              </div>

              <div class="flex flex-col gap-2">
                <span class="text-gray-900 text-sm font-medium leading-tight"
                  >Number of Schools
                </span>
                <div class="inline-flex gap-2">
                  <SvgoBuilding class="size-5" />
                  <span
                    class="text-slate-600 text-base font-medium leading-normal"
                    >19</span
                  >
                </div>
              </div>

              <div class="flex flex-col gap-2">
                <span class="text-gray-900 text-sm font-medium leading-tight"
                  >Number of Students
                </span>
                <div class="inline-flex gap-2">
                  <SvgoGraduationHat class="size-5" />
                  <span
                    class="text-slate-600 text-base font-medium leading-normal"
                    >12,380</span
                  >
                </div>
              </div>

              <div class="flex flex-col gap-2">
                <span class="text-gray-900 text-sm font-medium leading-tight"
                  >Number of Jobs
                </span>
                <div class="inline-flex gap-2">
                  <SvgoBriefCase class="size-5" />
                  <span
                    class="text-slate-600 text-base font-medium leading-normal"
                    >19</span
                  >
                </div>
              </div>

              <div class="flex flex-col gap-2">
                <span class="text-gray-900 text-sm font-medium leading-tight"
                  >Website
                </span>
                <div class="inline-flex gap-2">
                  <SvgoGlobe class="size-5" />
                  <a
                    href="#"
                    class="text-brand-800 text-base font-medium underline leading-normal"
                  >
                    www.paloalto.com
                  </a>
                </div>
              </div>
            </div>

            <div
              class="flex-col justify-start items-start gap-5 inline-flex w-full pt-8 border-t pb-5 border-gray-200"
            >
              <div class="justify-start items-start gap-4 inline-flex">
                <div
                  class="flex-col justify-start items-start gap-1 inline-flex"
                >
                  <p
                    class="text-gray-900 text-3xl font-semibold leading-[38px]"
                  >
                    About School District
                  </p>
                  <p
                    class="text-slate-600 text-base font-normal leading-normal"
                  >
                    Read out the information about patlo alto unified school.
                  </p>
                </div>
              </div>
            </div>

            <div class="pt-5">
              <p class="text-base font-normal leading-normal text-gray-600">
                Palo Alto Unified School District (PAUSD) is located in Palo
                Alto, California, and serves the educational needs of students
                in the city. Palo Alto is known for its proximity to major
                technology hubs, including Silicon Valley, and the district
                reflects a community with high academic expectations.
              </p>

              <br />

              <p class="text-base font-normal leading-normal text-gray-600">
                Key points about the Palo Alto Unified School District include:
              </p>

              <ol class="list-decimal pl-5">
                <li
                  v-for="(item, index) in listData"
                  :key="index"
                  class="pt-2.5"
                >
                  <span
                    class="text-base font-medium leading-normal text-gray-600"
                    >{{ item.title }}</span
                  >
                  <span
                    class="text-base font-normal leading-normal text-gray-600"
                  >
                    {{ item.desc }}
                  </span>
                </li>
              </ol>

              <div
                class="pt-5 justify-end items-center w-full gap-1.5 inline-flex"
              >
                <div class="text-blue-800 text-sm font-semibold leading-tight">
                  Read Less
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
