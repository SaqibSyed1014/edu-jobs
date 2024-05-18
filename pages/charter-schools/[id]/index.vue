<script setup lang="ts">
import {useSchoolsStore} from "~/segments/schools/store";
import BaseSpinner from "~/components/core/BaseSpinner.vue";
import OrgMapLocation from "~/components/pages/schoolDistrict/OrgMapLocation.vue";

const schoolStore = useSchoolsStore();
const router = useRouter();
const route = useRoute();

const { charterSchoolDetails } = storeToRefs(schoolStore);

const activeTab = ref(0);
const tabs = ref([
  { name: "About Charter School" },
  { name: "Open Jobs" },
  { name: "Photos" },
  { name: "Videos" },
  { name: "Location" },
]);

const listData = ref([
  {
    title: "Academic Excellence:",
    desc: "The School is recognized for its commitment to academic excellence, and many of its schools have received high rankings. Students often excel in various academic and extracurricular activities.",
  },
  {
    title: "Innovation and Technology:",
    desc: "Given its location in the heart of Silicon Valley, PAUSD emphasizes innovation and technology in education. There are efforts to incorporate technology into the learning environment, preparing students for the challenges of the digital age.",
  },
  {
    title: "Diversity:",
    desc: "The School is known for its diverse student body, reflecting the cultural and socioeconomic diversity of the community. Efforts are made to promote inclusivity and provide a well-rounded education for all students.",
  },
  {
    title: "Community Engagement:",
    desc: "Palo Alto residents are actively involved in the education system, participating in school activities, parent-teacher organizations, and community initiatives that support the schools.",
  },
  {
    title: "Challenges:",
    desc: "Like many high-performing schools, PAUSD faces challenges related to academic pressure, student well-being, and maintaining a balance between achievement and the overall well-rounded development of students.",
  },
]);

const photoList = ref([
  {
    image: "/images/schoolDistrict/photo1.jpg",
    title: "Practical education",
    date: "20 Jan 2024",
  },
  {
    image: "/images/schoolDistrict/photo2.jpg",
    title: "Practical education",
    date: "20 Jan 2024",
  },
  {
    image: "/images/schoolDistrict/photo3.jpg",
    title: "Practical education",
    date: "20 Jan 2024",
  },
  {
    image: "/images/schoolDistrict/photo4.jpg",
    title: "Practical education",
    date: "20 Jan 2024",
  },
  {
    image: "/images/schoolDistrict/photo5.jpg",
    title: "Practical education",
    date: "20 Jan 2024",
  },
  {
    image: "/images/schoolDistrict/photo6.jpg",
    title: "Practical education",
    date: "20 Jan 2024",
  },
]);

const videoList = ref([
  {
    image: "/images/schoolDistrict/video1.jpg",
    title: "Practical education",
    date: "20 Jan 2024",
  },
  {
    image: "/images/schoolDistrict/video2.jpg",
    title: "Practical education",
    date: "20 Jan 2024",
  },
  {
    image: "/images/schoolDistrict/video3.jpg",
    title: "Practical education",
    date: "20 Jan 2024",
  },
  {
    image: "/images/schoolDistrict/video4.jpg",
    title: "Practical education",
    date: "20 Jan 2024",
  },
  {
    image: "/images/schoolDistrict/video5.jpg",
    title: "Practical education",
    date: "20 Jan 2024",
  },
  {
    image: "/images/schoolDistrict/video6.jpg",
    title: "Practical education",
    date: "20 Jan 2024",
  },
]);

const jobList = [
  {
    logo: "logo-one.jpg",
    postedAt: "1h ago",
    title: "Marketing Associate",
    country: "Polymath, Melbourne, AU",
    category: "Design",
    description:
      "We’re looking for a mid-level product designer to join our team.",
    duration: "Full-time",
    wage: "80k - 100k",
  },
  {
    logo: "logo-two.jpg",
    postedAt: "6h ago",
    title: "Senior Graphic Designer",
    country: "Polymath, Melbourne, AU",
    category: "Design",
    description:
      "We’re looking for a mid-level product designer to join our team.",
    duration: "Full-time",
    wage: "80k - 100k",
  },
  {
    logo: "logo-three.jpg",
    postedAt: "2h ago",
    title: "Lead Product Designer",
    country: "Polymath, Melbourne, AU",
    category: "Design",
    description:
      "We’re looking for a mid-level product designer to join our team.",
    duration: "Full-time",
    wage: "80k - 100k",
  },
  {
    logo: "logo-four.jpg",
    postedAt: "6h ago",
    title: "Senior Graphic Designer",
    country: "Polymath, Melbourne, AU",
    category: "Design",
    description:
      "We’re looking for a mid-level product designer to join our team.",
    duration: "Full-time",
    wage: "80k - 100k",
  },
  {
    logo: "logo-two.jpg",
    postedAt: "6h ago",
    title: "Senior Graphic Designer",
    country: "Polymath, Melbourne, AU",
    category: "Design",
    description:
      "We’re looking for a mid-level product designer to join our team.",
    duration: "Full-time",
    wage: "80k - 100k",
  },
  {
    logo: "logo-one.jpg",
    postedAt: "6h ago",
    title: "Senior Graphic Designer",
    country: "Polymath, Melbourne, AU",
    category: "Design",
    description:
      "We’re looking for a mid-level product designer to join our team.",
    duration: "Full-time",
    wage: "80k - 100k",
  },
  {
    logo: "logo-two.jpg",
    postedAt: "2h ago",
    title: "Lead Product Designer",
    country: "Polymath, Melbourne, AU",
    category: "Design",
    description:
      "We’re looking for a mid-level product designer to join our team.",
    duration: "Full-time",
    wage: "80k - 100k",
  },
  {
    logo: "logo-three.jpg",
    postedAt: "2h ago",
    title: "Lead Product Designer",
    country: "Polymath, Melbourne, AU",
    category: "Design",
    description:
      "We’re looking for a mid-level product designer to join our team.",
    duration: "Full-time",
    wage: "80k - 100k",
  },
];

const isSchoolFetching = ref<boolean>(true);

onMounted(async () => {
  isSchoolFetching.value = true;
  await schoolStore.fetchCharterSchoolDetails(route.params?.id as string);
  isSchoolFetching.value = false;
})
</script>

<template>
  <div v-if="isSchoolFetching" class="container">
    <div class="flex justify-center items-center h-[calc(100vh-80px)] w-full">
      <BaseSpinner size="lg" :show-loader="isSchoolFetching" />
    </div>
  </div>

  <div v-else class="border-t md:border-b border-gray-200 mb-24">
    <div class="md:container flex">
      <!-- Sidebar -->
      <div class="flex flex-col border-r border-gray-200">
        <div class="sticky right-0 top-0 w-full">
          <aside
            class="sticky top-0 z-[1] w-[260px] hidden lg:flex flex-col pt-8"
          >
            <!-- Tabs -->
            <div class="flex flex-col">
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
        </div>
      </div>

      <!-- Main Content -->
      <main class="pt-8 md:pb-10 w-full">
        <!-- Content for each tab -->
        <div>
          <div
            class="w-full h-5 justify-between items-start inline-flex pl-6 sm:pl-0"
          >
            <div class="pl-3 justify-start items-center gap-3 hidden lg:flex">
              <div class="justify-center items-center flex">
                <NuxtLink
                  to="/charter-schools"
                  class="text-slate-600 text-sm font-medium leading-tight"
                >
                  Charter Schools
                </NuxtLink>
              </div>
              <SvgoChevronRight class="size-4" />
              <div class="justify-center items-center flex">
                <div class="text-blue-800 text-sm font-semibold leading-tight">
                  {{ charterSchoolDetails.name }}
                </div>
              </div>
            </div>
            <button
              @click="router.back()"
              type="button"
              class="justify-center items-center gap-1.5 flex group"
            >
              <SvgoArrowLeftBlue
                class="size-5 group-hover:-translate-x-[8px] transition"
              />
              <div class="text-blue-800 text-sm font-semibold leading-tight">
                Back
              </div>
            </button>
          </div>

          <div class="pt-5">
            <img
              src="/images/schoolDistrict/cover.webp"
              class="h-[140px] md:h-60 w-full object-cover"
            />
          </div>
          <div class="-mt-5 px-4 lg:px-8">
            <div
              class="justify-start lg:items-center lg:gap-6 flex flex-col lg:flex-row"
            >
              <div class="w-24 h-24 shrink-0 bg-white rounded-[10px] shadow-lg flex justify-center items-center mb-2">
                <template v-if="charterSchoolDetails?.logo_path">
                  <img :src="charterSchoolDetails.logo_path" :alt="charterSchoolDetails.name" class="w-full h-full object-cover">
                </template>

                <SvgoBuilding v-else class="size-14 shrink-0" />
              </div>
              <div class="flex-col justify-start items-start gap-5 inline-flex">
                <BaseTooltip :tooltip-content="charterSchoolDetails.name" id="title">
                  <h2 class="text-2xl lg:text-3xl md:text-ellipsis md:line-clamp-1">
                    {{ charterSchoolDetails.name }}
                  </h2>
                </BaseTooltip>
              </div>
            </div>

            <div
              class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 lg:gap-9 pb-6 pt-6 lg:pt-0 border-b border-gray-200"
            >
              <div class="flex flex-col gap-2">
                <span class="text-gray-900 text-sm font-medium leading-tight">
                  Location
                </span>
                <div class="inline-flex gap-2">
                  <SvgoUsFlag class="size-5" />
                  <span class="text-slate-600 text-base font-medium leading-normal">
                    {{ `${charterSchoolDetails.city}, ${charterSchoolDetails.county_name}` }}
                  </span>
                </div>
              </div>

              <div class="flex flex-col gap-2">
                <span class="text-gray-900 text-sm font-medium leading-tight">
                  Number of Schools
                </span>
                <div class="inline-flex gap-2">
                  <SvgoBuilding class="size-5 text-gray-500" />
                  <span class="text-slate-600 text-base font-medium leading-normal">0</span>
                </div>
              </div>

              <div class="flex flex-col gap-2">
                <span class="text-gray-900 text-sm font-medium leading-tight">
                  Number of Students
                </span>
                <div class="inline-flex gap-2">
                  <SvgoGraduationHat class="size-5" />
                  <span class="text-slate-600 text-base font-medium leading-normal">0</span>
                </div>
              </div>

              <div class="flex flex-col gap-2">
                <span class="text-gray-900 text-sm font-medium leading-tight">
                  Number of Jobs
                </span>
                <div class="inline-flex gap-2">
                  <SvgoBriefCase class="size-5" />
                  <span class="text-slate-600 text-base font-medium leading-normal">0</span>
                </div>
              </div>

              <div class="flex flex-col gap-2 col-span-2 sm:col-span-1">
                <span class="text-gray-900 text-sm font-medium leading-tight">
                  Website
                </span>
                <div class="inline-flex gap-2">
                  <SvgoGlobe class="size-5 shrink-0" />
                  <a
                    v-if="charterSchoolDetails.website_url && charterSchoolDetails.website_url !== 'No Data'"
                    :href="charterSchoolDetails.website_url"
                    target="_blank"
                    class="text-brand-800 text-base font-medium underline leading-normal break-all block"
                  >
                    {{ charterSchoolDetails.website_url }}
                  </a>
                  <span v-else>N/A</span>
                </div>
              </div>
            </div>

            <form class="w-full mx-auto block lg:hidden pt-8">
              <select
                v-model="activeTab"
                id="countries"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option disabled value="">Choose an option</option>
                <option
                  v-for="(option, index) in tabs"
                  :key="index"
                  :value="index"
                  @click="activeTab = index"
                >
                  {{ option.name }}
                </option>
              </select>
            </form>

            <div
              :class="
                activeTab === 1
                  ? 'flex-col sm:flex-row w-full justify-end items-end gap-5 flex pt-8  pb-5'
                  : 'flex-col sm:flex-row w-full justify-start items-start gap-5 flex pt-8  pb-5'
              "
            >
              <div class="justify-start items-start gap-4 inline-flex w-full">
                <div
                  class="flex-col justify-start items-start gap-1 inline-flex"
                >
                  <p
                    class="text-gray-900 text-2xl md:text-3xl font-semibold leading-[38px]"
                  >
                    {{
                      activeTab === 0
                        ? "About Charter School"
                        : activeTab === 1
                        ? "List of Jobs"
                        : activeTab === 2
                        ? "List of Schools"
                        : activeTab === 3
                        ? "Photos"
                        : activeTab === 4
                        ? "Videos"
                        : ""
                    }}
                  </p>
                  <p
                    class="text-slate-600 text-base font-normal leading-normal"
                  >
                    {{
                      activeTab === 0
                        ? "Read out the information about patlo alto unified school."
                        : activeTab === 1
                        ? "Have a look to the list of Jobs."
                        : activeTab === 2
                        ? "Have a look to the list of schools."
                        : activeTab === 3
                        ? "Have a glimpse of some cherished moments from Palo Alto Unified School"
                        : activeTab === 4
                        ? "Here are some videos to help you learn more"
                        : ""
                    }}
                  </p>
                </div>
              </div>

              <form
                v-if="activeTab === 1"
                class="w-full sm:w-1/2 sm:flex sm:items-end sm:justify-end"
                action="#"
                method="GET"
              >
                <label for="search-field" class="sr-only">Search</label>
                <div class="relative">
                  <SvgoSearchIcon
                    class="pointer-events-none absolute inset-y-0 left-2 h-full w-5 text-gray-500"
                    aria-hidden="true"
                  />
                  <input
                    id="search-field"
                    class="block h-full rounded-lg w-full md:w-[320px] shadow border border-gray-300 bg-transparent py-[13px] pl-8 pr-0 text-black sm:text-sm"
                    placeholder="Search..."
                    type="search"
                    name="search"
                  />
                </div>
              </form>
            </div>

            <AboutSD :data="listData" v-if="activeTab === 0" />

            <div v-if="activeTab === 1">
              <div v-if="false" class="grid gap-6 grid-cols-1">
                <template v-for="job in jobList">
                  <JobCard
                    :job="job"
                    :show-job-description="false"
                    :card-form="false"
                  />
                </template>
              </div>

              <NoRecordFound v-else name="jobs" />
              <Pagination v-if="false" />
            </div>

            <PhotoCard :data="photoList" v-if="activeTab === 2" />

            <VideoCard v-if="activeTab === 3" :data="videoList" />

            <OrgMapLocation v-if="activeTab === 4" :coordinates="[charterSchoolDetails.geo_lat, charterSchoolDetails.geo_lng]" />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
