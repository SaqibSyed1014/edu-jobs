<script setup lang="ts">
import {initDropdowns} from "flowbite";
import JobSkeleton from "~/components/pages/job-listings/JobSkeleton.vue";
import {useJobStore} from "~/segments/jobs/store";
import NoRecordFound from "~/components/core/NoRecordFound.vue";
import type {JobQueryParams, JobSearchFilters, PaginationInfo, TypesenseQueryParam} from "~/segments/common.types";
import { encode, decode } from "js-base64";

const filters = ref([
  {
    fieldName: 'employment_type',
    type: 'checkbox',
    title: 'Type of employment',
    icon: 'SvgoClock',
    list: [
      {
        label: 'Full-time',
        value: 'full_time',
        checked: false,
        counts: 15
      },
      {
        label: 'Part-time',
        value: 'part_time',
        checked: false,
        counts: 6
      },
      {
        label: 'Internship',
        value: 'internship',
        checked: false,
        counts: 23
      },
      {
        label: 'Volunteer',
        value: 'volunteer',
        checked: false,
        counts: 5
      }
    ],

  },
  {
    fieldName: 'job_role',
    type: 'checkbox',
    title: 'Job Category',
    icon: 'SvgoBarChart',
    list: [
      {
        label: 'Instructional',
        value: 'instructional',
        checked: false,
        counts: 54
      },
      {
        label: 'Non-instructional',
        value: 'non-instructional',
        checked: false,
        counts: 93
      }
    ]
  },
  {
    fieldName: 'experience_level',
    type: 'checkbox',
    title: 'Experience Level',
    icon: 'SvgoLineChartUp',
    list: [
      {
        label: 'Entry-level',
        value: 'entry_level',
        checked: false,
        counts: 15
      },
      {
        label: 'Mid-level',
        value: 'mid_level',
        checked: false,
        counts: 6
      },
      {
        label: 'Senior',
        value: 'senior',
        checked: false,
        counts: 3
      },
      {
        label: 'Manager',
        value: 'manager',
        checked: false,
        counts: 5
      },
      {
        label: 'Director',
        value: 'director',
        checked: false,
        counts: 5
      }
    ],
  },
  {
    type: 'range',
    title: 'Salary Range',
    icon: 'SvgoCurrencyDollar',
    min: 0,
    max: 250000
  }
])

const itemsViewOptions = [
  {
    label: 'List',
    icon: 'SvgoList'
  },
  {
    label: 'Grid',
    icon: 'SvgoGrid'
  }
]

const route = useRoute();
const router = useRouter();
const jobStore = useJobStore();
const { jobListings, totalPages, coordinates } = storeToRefs(jobStore);


const layoutOptionSelected = ref(1);
const searchedLocationText = ref('');
const isFilterSidebarVisible = ref<boolean>(false);

const sidebarFilters = ref<{ [key :string]: string | string[] }>({})

const pageInfo = ref<PaginationInfo>({
  currentPage: 1,
  itemsPerPage: 12,
  totalPages: 0
});

const initialQuery = {
  q: "*",
  page: pageInfo.value.currentPage,
  per_page: pageInfo.value.itemsPerPage,
};
const query = ref<TypesenseQueryParam>(initialQuery);

const queryParams = computed(() => {
  const urlParams :JobQueryParams = {
    keyword: query.value.q,
    ...(searchedLocationText.value?.length && { location: searchedLocationText.value }),  // skip location from url if no location is searched
    ...sidebarFilters.value,
    page: pageInfo.value.currentPage,
    mode: layoutOptionSelected.value === 0 ? 'list' : 'grid',
    coordinates: [coordinates.value.lat, coordinates.value.lng],
    sort_by: query.value.sort_by
  }
  return urlParams
})

watch(() => layoutOptionSelected.value, () => {
  router.replace({  // update route with updated query when layout mode is changed
    path: "/jobs",
    query: {
      params: encode(JSON.stringify(queryParams.value))
    },
  });
})


onMounted(async () => {
  initDropdowns();
  const paramsString = route.query.params as string;
  if (paramsString) {
    const parsedParams = JSON.parse(decode(paramsString));
    assignQueryParamsOnInitialLoad(parsedParams as JobQueryParams);
  }

  // assign the saved coordinates in store (searched on Home view) for query
  if (coordinates.value.lat && coordinates.value.lng) query.value.filter_by = `geo_location:(${coordinates.value.lat}, ${coordinates.value.lng}, 5 mi)`;

  await doSearch(); // Initial fetch
});

onUnmounted(() => {
  coordinates.value = { lat: 0, lng: 0 };
  query.value = initialQuery;
})

const jobsLoading = ref(true);
async function doSearch(resetToDefaultPage = false) {
  jobsLoading.value = true;
  if (resetToDefaultPage) pageInfo.value.currentPage = 1;  // set the current page to default (1)
  query.value.page = pageInfo.value.currentPage;

  await router.replace({
    path: '/jobs',
    query: {
      params: encode(JSON.stringify(queryParams.value))
    }
  })
  if (query.value.q && query.value.q !== '*') query.value.query_by = 'job_title'  // search from job_title
  await jobStore.fetchJobs(query.value);
  pageInfo.value.totalPages = totalPages.value
  jobsLoading.value = false;
}

const paginate = (page: number | "prev" | "next") => {
  if (page === "prev") pageInfo.value.currentPage--;
  else if (page === "next") pageInfo.value.currentPage++;
  else pageInfo.value.currentPage = page;

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  doSearch();
};

const fetchOnSearching = (searchValues :JobSearchFilters) => {
  query.value.q = searchValues.keyword.length ? searchValues.keyword : '*'

  if (searchValues.coordinates.lat && searchValues.coordinates.lng)    // when user searches location on 'Search' click (searchValues are null when redirected from Home view)
    coordinates.value = searchValues.coordinates
  if (coordinates.value.lat && coordinates.value.lng) {    // check if both lat and lng are propagated by SearchBar
    query.value.filter_by = `geo_location:(${coordinates.value.lat}, ${coordinates.value.lng}, 5 mi)`;
    searchedLocationText.value = searchValues.location // saving location string for route query
  } else {
    query.value.filter_by = null    // safety check if no coordinates are there
    searchedLocationText.value = ''
  }

  doSearch(true);
}

function updateSideBarFilters(selectedFilters :{ field: string, values: string[] }[], toggleFlag = false) {
  if (Object.keys(selectedFilters)?.length) {
    sidebarFilters.value = {};   // reset sidebarFilters everytime for avoiding caching data
    selectedFilters.forEach(filter => {
      sidebarFilters.value[filter.field] = filter.values.join(',')
    });
  }
  else sidebarFilters.value = {};

  if (toggleFlag) isFilterSidebarVisible.value = false;

  doSearch();
}

function assignQueryParamsOnInitialLoad(queryParams :JobQueryParams) {
  const { keyword, mode, location, employment_type, job_role, experience_level, coordinates, ...otherParams }
      = queryParams
  query.value = {
    ...query.value,
    ...otherParams as unknown as TypesenseQueryParam,
    q: keyword as string,
  }
  pageInfo.value.currentPage = otherParams.page
  layoutOptionSelected.value = mode === 'list' ? 0 : 1;
  if (location) searchedLocationText.value = location as string; // assign location in url for google map field

  if (employment_type) sidebarFilters.value.employment_type = employment_type
  if (job_role) sidebarFilters.value.job_role = job_role
  if (experience_level) sidebarFilters.value.experience_level = experience_level
  filters.value.forEach(filter => {
      if (filter.type === 'checkbox' && filter.list?.length) {
        filter.list.forEach(item => {
          const filterValues = sidebarFilters.value[filter.fieldName] || [];
          item.checked = !!filterValues.includes(item.value);
        });
      }
    });
  if (coordinates && !coordinates?.includes(0)) {
    jobStore.coordinates.lat = coordinates[0];
    jobStore.coordinates.lng = coordinates[1];
  }
}

function sortJobs(sortBy :string) {
  const sortDropdown = document.getElementById('dropdownToggler')
  if (sortBy === 'date_posted') {
    const { sort_by } = query.value
    if (sort_by?.includes('desc')) {
      query.value.sort_by = 'date_posted:asc'
    } else query.value.sort_by = 'date_posted:desc'

    if (sortDropdown) sortDropdown.click();
    doSearch();
  }

}
</script>

<template>
    <div class="job-listing-view">
      <ListingView>
        <template #filters>
          <ListingFilters
              class="hidden md:flex"
              :filtration-list="filters"
              @on-filters-change="updateSideBarFilters"
          />

          <SideBarWrapper :is-sidebar-visible="isFilterSidebarVisible">
            <ListingFilters
                :filtration-list="filters"
                @apply-filters-on-click="(val) => updateSideBarFilters(val,true)"
                @close-filter-sidebar="isFilterSidebarVisible = false"
            />
          </SideBarWrapper>
        </template>

        <template #header>
          <ListingViewTitle
              title="Jobs"
              sub-title="Find your desired job from the comfort of your home."
          />
        </template>

        <template #search-filters>
          <SearchBar
            :query-value="query"
            :location="searchedLocationText as string"
            :coordinates="coordinates"
            @updated-values="fetchOnSearching"
          />
        </template>

        <template #cards-list>
          <div class="flex gap-4 justify-between md:items-center">
            <div class="relative max-md:flex-1">
              <BaseButton id="dropdownToggler" data-dropdown-toggle="sort-jobs-by-dropdown" color="gray" :outline="true" :full-sized-on-small="true" label="Most Relevant" class="justify-between">
                <template #prepend-icon>
                  <SvgoFilterFunnel class="w-5 h-5 text-gray-600"/>
                </template>
                <template #append-icon>
                  <SvgoChevronDown class="w-4 h-4 text-gray-600"/>
                </template>
              </BaseButton>

              <!-- Dropdown menu -->
              <div id="sort-jobs-by-dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-full dark:bg-gray-700">
                <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownToggler">
                  <li
                      @click="sortJobs('date_posted')"
                      class="cursor-pointer px-4 py-2 hover:bg-gray-100"
                      :class="{'bg-gray-100 hover:bg-gray-200': query.sort_by?.includes('desc')}"
                  >
                    By Date Posted
                  </li>
                </ul>
              </div>
            </div>

            <div class="hidden md:inline-flex rounded-md shadow-sm" role="group">
              <BaseButtonsGroup
                  v-model="layoutOptionSelected"
                  color="gray"
                  :outline="true"
                  :btns-group="itemsViewOptions"
              />
            </div>

            <BaseButton @click="isFilterSidebarVisible = true" color="gray" :outline="true" label="" class="md:hidden">
              <template #prepend-icon>
                <SvgoFilter class="w-5 h-5 text-gray-600"/>
              </template>
            </BaseButton>
          </div>

          <div v-if="jobsLoading || jobListings.length" class="grid gap-6" :class="[layoutOptionSelected ? 'md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1']">
            <template v-if="jobsLoading" v-for="i in 12">
              <JobSkeleton :card-form="layoutOptionSelected === 1"/>
            </template>

            <template v-else v-for="job in jobListings">
              <JobCard :job="job" :card-form="layoutOptionSelected === 1" :show-job-description="false"
                       :is-job-loading="jobsLoading"/>
            </template>
          </div>

          <template v-else>
            <NoRecordFound name="job" :search-value="query.q" />
          </template>

          <CustomPagination
              v-if="jobListings.length"
              :current-page="pageInfo.currentPage"
              :total-pages="pageInfo.totalPages"
              @paginate="paginate"
          />
        </template>
      </ListingView>

      <JobCTA />
    </div>
</template>

