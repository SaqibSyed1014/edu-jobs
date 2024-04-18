<script setup lang="ts">
import JobSkeleton from "~/components/pages/job-listings/JobSkeleton.vue";
import {useJobStore} from "~/segments/jobs/store";
import NoRecordFound from "~/components/core/NoRecordFound.vue";
import type {JobQueryParams, PaginationInfo, TypesenseQueryParam} from "~/segments/common.types";

const filters = [
  {
    type: 'checkbox',
    title: 'Type of employment',
    icon: 'SvgoClock',
    list: [
      {
        label: 'Full-time',
        checked: false,
        counts: 15
      },
      {
        label: 'Part-time',
        checked: false,
        counts: 6
      },
      {
        label: 'Internship',
        checked: false,
        counts: 23
      },
      {
        label: 'Volunteer',
        checked: false,
        counts: 5
      }
    ],

  },
  {
    type: 'checkbox',
    title: 'Job Category',
    icon: 'SvgoBarChart',
    list: [
      {
        label: 'Instructional',
        checked: false,
        counts: 54
      },
      {
        label: 'Non-instructional',
        checked: false,
        counts: 93
      }
    ]
  },
  {
    type: 'checkbox',
    title: 'Experience Level',
    icon: 'SvgoLineChartUp',
    list: [
      {
        label: 'Entry-level',
        checked: false,
        counts: 15
      },
      {
        label: 'Mid-level',
        checked: false,
        counts: 6
      },
      {
        label: 'Senior',
        checked: false,
        counts: 3
      },
      {
        label: 'Manager',
        checked: false,
        counts: 5
      },
      {
        label: 'Director',
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
]

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

const pageInfo = ref<PaginationInfo>({
  currentPage: 1,
  itemsPerPage: 12,
  totalPages: 0
})

const query = ref<TypesenseQueryParam>({
  q: "*",
  page: pageInfo.value.currentPage,
  per_page: pageInfo.value.itemsPerPage,
})


const route = useRoute();
const router = useRouter();
const jobStore = useJobStore();
const { jobListings, totalPages } = storeToRefs(jobStore);

const layoutOptionSelected = ref(1);
const searchedLocationText = ref('');

const queryParams = computed(() => {
  const urlParams :JobQueryParams = {
    q: query.value.q,
    location: searchedLocationText.value,
    page: query.value.page,
    mode: layoutOptionSelected.value === 0 ? 'list' : 'grid',
  }
  if (!searchedLocationText.value?.length) delete urlParams.location
  return urlParams
})

watch(() => layoutOptionSelected.value, (val) => {
  router.replace({
    path: "/jobs",
    query: queryParams.value,
  });
})


onMounted(async () => {
  if (Object.keys(route.query).length) {
    const { mode, location, ...otherParams } = route.query
    query.value = {
      ...query.value,
      ...otherParams as unknown as TypesenseQueryParam
    }
    layoutOptionSelected.value = mode === 'list' ? 0 : 1
    searchedLocationText.value = location as string // assign location in url for google map field
  }
  await doSearch(); // Initial fetch
});

const jobsLoading = ref(true);
async function doSearch(resetToDefaultPage = false) {
  jobsLoading.value = true;
  query.value.page = resetToDefaultPage ? 1 : pageInfo.value.currentPage;
  await router.replace({
    path: '/jobs',
    query: queryParams.value
  })
  if (query.value.q && query.value.q !== '*')query.value.query_by = 'job_title'
  await jobStore.fetchJobs(query.value);
  pageInfo.value.totalPages = totalPages.value
  jobsLoading.value = false;
}

const paginate = (page: number | "prev" | "next") => {
  if (page === "prev") {
    pageInfo.value.currentPage--;
  } else if (page === "next") {
    pageInfo.value.currentPage++;
  } else {
    pageInfo.value.currentPage = page;
  }
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  doSearch();
};

const isFilterSidebarVisible = ref(false);

const fetchOnSearching = (searchValues :{ keyword: string, coordinates: { lng: string, lat: string }, location: string }) => {
  query.value.q = searchValues.keyword.length ? searchValues.keyword : '*'
  if (searchValues.coordinates.lat && searchValues.coordinates.lng) { // check if both lat and lng are propagated by SearchBar
    query.value.filter_by = `geo_location:(${searchValues.coordinates.lat}, ${searchValues.coordinates.lng}, 5 mi)`;
    searchedLocationText.value = searchValues.location // saving location string for route query
  } else {
    query.value.filter_by = null
    searchedLocationText.value = ''
  }
  doSearch(true);
}
</script>

<template>
    <div class="job-listing-view">
      <ListingView>
        <template #filters>
          <ListingFilters class="hidden md:flex" :filtration-list="filters" />

          <SideBarWrapper :is-sidebar-visible="isFilterSidebarVisible">
            <ListingFilters
                @close-filter-sidebar="isFilterSidebarVisible = false"
                :filtration-list="filters"
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
            @updated-values="fetchOnSearching"
          />
        </template>

        <template #cards-list>
          <div class="flex gap-4 justify-between md:items-center">
            <div class="max-md:flex-1">
              <BaseButton color="gray" :outline="true" :full-sized-on-small="true" label="Most Relevant" class="justify-between">
                <template #prepend-icon>
                  <SvgoFilterFunnel class="w-5 h-5 text-gray-600"/>
                </template>
                <template #append-icon>
                  <SvgoChevronDown class="w-4 h-4 text-gray-600"/>
                </template>
              </BaseButton>
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
              :current-page="pageInfo.currentPage"
              :total-pages="pageInfo.totalPages"
              @paginate="paginate"
          />
        </template>
      </ListingView>

      <JobCTA />
    </div>
</template>

