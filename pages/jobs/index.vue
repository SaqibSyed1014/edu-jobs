<script setup lang="ts">
import {initDropdowns} from "flowbite";
import JobSkeleton from "~/components/pages/job-listings/JobSkeleton.vue";
import {useJobStore} from "~/segments/jobs/store";
import NoRecordFound from "~/components/core/NoRecordFound.vue";
import type {JobQueryParams, JobSearchFilters, PaginationInfo, TypesenseQueryParam} from "~/segments/common.types";
import { encode, decode } from "js-base64";
import SignUpCard from "~/components/pages/job-listings/SignUpCard.vue";
import {
  jobFilters,
  itemsViewOptions,
  extractSpecificFilterValues, extractMinMaxCompensationValues
} from "~/components/core/constants/jobs.constants";

const filters = ref(jobFilters);  // job's filters

const route = useRoute();
const router = useRouter();
const jobStore = useJobStore();
const { jobListings, facetCounts, totalPages, coordinates } = storeToRefs(jobStore);

const layoutOptionSelected = ref(0);
const searchedLocationText = ref('');
const isFilterSidebarVisible = ref<boolean>(false);
const jobSidebarFilters = ref(null);

const sidebarFilters = ref<{ [key :string]: string | string[] }>({})

const pageInfo = ref<PaginationInfo>({
  currentPage: 1,
  itemsPerPage: 24,
  totalPages: 0
});

const initialQuery = {
  q: "*",
  page: pageInfo.value.currentPage,
  per_page: pageInfo.value.itemsPerPage,
  sort_by: 'date_posted:asc',
  facet_by: 'employment_type,job_role,experience_level',
  filter_by: ''
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
    sort_by: query.value.sort_by,
    filter_by: query.value.filter_by
  }
  return urlParams
})

watch(() => layoutOptionSelected.value, (val) => {
  localStorage.setItem('jobsLayout', val === 0 ? 'list' : 'grid');  // update saved layout on Grid/List btns clicking
  router.replace({  // update route with updated query when layout mode is changed
    path: "/jobs",
    query: {
      params: JSON.stringify(queryParams.value)
    },
  });
})


onMounted(async () => {
  initDropdowns();
  let savedLayout = '';
  if (process.client) {  // using process.client due to SSR
    savedLayout = localStorage.getItem('jobsLayout') ?? 'list';  // use layout if it's saved earlier else default layout
    layoutOptionSelected.value = savedLayout === 'grid' ? 1 : 0;
  }
  const paramsString = route.query.params as string;
  if (paramsString) {
    const parsedParams = JSON.parse(paramsString);
    assignQueryParamsOnInitialLoad(parsedParams as JobQueryParams);
    // assign the saved coordinates in store (searched on Home view) for query
    if (coordinates.value.lat && coordinates.value.lng) query.value.filter_by = `geo_location:(${coordinates.value.lat}, ${coordinates.value.lng}, 10 mi)`;
  }
  await doSearch(); // Initial fetch
});

onUnmounted(() => {
  jobStore.jobsList = [];
  coordinates.value = { lat: 0, lng: 0 };
  query.value = initialQuery;
  sidebarFilters.value = {}
})

const jobsLoading = ref(true);
let selectedCompensation = ref<number[]>([0, 0]);
let appliedCheckboxFilters = ref<string>('');
let appliedCompensationFilters = ref<string>('');

setInitialCompensationValues('salary');

function setInitialCompensationValues(wageType :string, applyFilter :boolean = false) {
  let values :number[] = [];
  if (wageType === 'salary') values = [20000, 200000];
  else if (wageType === 'hourly') values = [10, 200];
  selectedCompensation.value = values;

  let compensationFilter = `min_${wageType}:>=${values[0]}&&max_${wageType}:<=${values[1]}`;
  appliedCompensationFilters.value = compensationFilter;
  if (appliedCheckboxFilters.value.length) {
    query.value.filter_by = `${compensationFilter}&&${appliedCheckboxFilters.value}`;
  } else query.value.filter_by = compensationFilter+ '&&jobs_with_salary:=false';

  if (applyFilter) doSearch();
}

async function doSearch(resetToDefaultPage = false) {
  jobsLoading.value = true;
  if (resetToDefaultPage) pageInfo.value.currentPage = 1;  // set the current page to default (1)
  if (pageInfo.value.currentPage === 1) query.value.per_page = 23;  // 23 jobs will be fetched for first page due to signup card
  else query.value.per_page = 24;
  query.value.page = pageInfo.value.currentPage;

  await router.replace({
    path: '/jobs',
    query: {
      params: JSON.stringify(queryParams.value)
    }
  })
  if (query.value.q && query.value.q !== '*') query.value.query_by = 'job_title'  // search from job_title
  localStorage.setItem('jobsLayout', queryParams.value.mode);  // save layout before calling api
  await jobStore.fetchJobs(query.value);
  updateFiltersWithFacetCounts();
  pageInfo.value.totalPages = totalPages.value;
  jobsLoading.value = false;
}

function updateFiltersWithFacetCounts() {
  filters.value.map((filter) => {
    if (filter.type === 'checkbox') {
      facetCounts.value.forEach((facet) => {
        if (facet.field_name === filter.fieldName) {
          filter.list.forEach((filterItem) => {
            const count = facet.counts.find(count => count.value === filterItem.value);
            if (count) filterItem.counts = count.count;
          });
        }
      });
    }

    return filter;
  });
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
    const geoFilter = `geo_location:(${coordinates.value.lat}, ${coordinates.value.lng}, 10 mi)`
    if (query.value.filter_by?.length && !query.value.filter_by.includes('geo_location'))
      query.value.filter_by = `${query.value.filter_by}&&${geoFilter}`
    else query.value.filter_by = geoFilter;
    searchedLocationText.value = searchValues.location // saving location string for route query
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

  const sidebBarFiltersPayload = selectedFilters.map((obj :{ field: string, values: string[] }) => {
    return `${obj.field}:=[${obj.values.join(',')}]`;
  }).join('&&');

  if (query.value.filter_by?.length && query.value.filter_by.includes('geo_location'))
    query.value.filter_by = `${sidebBarFiltersPayload}&&${query.value.filter_by}`;
  else {
    if (sidebBarFiltersPayload.length) {   // if the checkbox filters are selected
      appliedCheckboxFilters.value = sidebBarFiltersPayload;
      query.value.filter_by = `${appliedCompensationFilters.value}&&${sidebBarFiltersPayload}`
    }
    else {
      appliedCheckboxFilters.value = '';
      query.value.filter_by = appliedCompensationFilters.value; // don't use checkbox filters}
    }
  }
  if (toggleFlag) isFilterSidebarVisible.value = false;

  doSearch();
}

function applyCompensationFilters(filterString :string) { // replacing old compensation filters with new filter values
  appliedCompensationFilters.value = filterString;
  if (appliedCheckboxFilters.value.length) {  // if checkboxes filters are already applied
    let updatedFilters: string = extractSpecificFilterValues(query.value.filter_by, 'compensation');
    query.value.filter_by = `${filterString}&&${updatedFilters}`;
  } else query.value.filter_by = filterString;
  doSearch();
}

async function assignQueryParamsOnInitialLoad(queryParams :JobQueryParams) {
  const { keyword, mode, location, employment_type, job_role, experience_level, coordinates, filter_by, ...otherParams }
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
  if (jobSidebarFilters.value) {
    jobSidebarFilters.value.emitSelectedValues();
  }
  if (filter_by) {
    const { min, max } = extractMinMaxCompensationValues(filter_by);  // get min/max compensation values from params
    selectedCompensation.value[0] = min;
    selectedCompensation.value[1] = max;
  }

  if (coordinates && !coordinates?.includes(0)) {
    jobStore.coordinates.lat = coordinates[0];
    jobStore.coordinates.lng = coordinates[1];
  }
}

function sortJobs(sortBy :string) {
  if (sortBy === 'most_relevant') query.value.sort_by = 'date_posted:asc';
  if (sortBy === 'date_posted') query.value.sort_by = 'date_posted:desc';
  const sortDropdown = document.getElementById('dropdownToggler');
  if (sortDropdown) sortDropdown.click();
  doSearch();
}

const SortDropdownLabel = computed(() => {
  if (query.value.sort_by?.includes('desc')) return 'Date Posted';
  return 'Most Relevant';
})

const signUpCardIndex = Math.floor(Math.random() * 25);  // randomly generate index number for signup card
</script>

<template>
    <div class="job-listing-view">
      <ListingView>
        <template #filters>
          <ListingFilters
              ref="jobSidebarFilters"
              class="hidden lg:flex"
              :inside-sidebar="false"
              :filtration-list="filters"
              :selected-compensation="selectedCompensation"
              @compensation-filter-type-change="setInitialCompensationValues"
              :items-loading="jobsLoading"
              @on-filters-change="updateSideBarFilters"
              @compensation-filter-change="applyCompensationFilters"
          />

          <SideBarWrapper :is-sidebar-visible="isFilterSidebarVisible">
            <ListingFilters
                :inside-sidebar="true"
                :filtration-list="filters"
                :items-loading="jobsLoading"
                :selected-compensation="selectedCompensation"
                @compensation-filter-type-change="setInitialCompensationValues"
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
          <div class="flex gap-4 justify-between lg:items-center">
            <div class="relative max-md:flex-1">
              <BaseButton id="dropdownToggler" data-dropdown-toggle="sort-jobs-by-dropdown" color="gray" :outline="true" :full-sized-on-small="true" :label="SortDropdownLabel" class="justify-between text-sm">
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
                      @click="sortJobs('most_relevant')"
                      class="cursor-pointer px-4 py-2 hover:bg-gray-100"
                      :class="{'bg-gray-100 hover:bg-gray-200': query.sort_by?.includes('asc')}"
                  >
                    Most Relevant
                  </li>
                  <li
                      @click="sortJobs('date_posted')"
                      class="cursor-pointer px-4 py-2 hover:bg-gray-100"
                      :class="{'bg-gray-100 hover:bg-gray-200': query.sort_by?.includes('desc')}"
                  >
                    Date Posted
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
            <template v-if="jobsLoading" v-for="i in pageInfo.itemsPerPage">
              <client-only>
                <JobSkeleton :card-form="layoutOptionSelected === 1" />
              </client-only>
            </template>

            <template v-else v-for="(job, index) in jobListings">
              <SignUpCard v-if="signUpCardIndex === index && pageInfo.currentPage === 1" />

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

