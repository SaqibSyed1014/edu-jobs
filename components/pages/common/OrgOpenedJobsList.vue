<script setup lang="ts">
import type {PaginationInfo} from "~/segments/common.types";
import BaseSpinner from "~/components/core/BaseSpinner.vue";
import {useDisrictsStore} from "~/segments/districts/store";

const props = defineProps<{
  openedJobs: any
  searchedKeyword: string
}>()

const route = useRoute();
const districtStore = useDisrictsStore();

const { totalPagesInOpenedJobs } = storeToRefs(districtStore);

const orgJobsFetching = ref<boolean>(false);

const pageInfo = ref<PaginationInfo>({
  currentPage: 1,
  itemsPerPage: 12,
  totalPages: 0,
});

const queryParams = computed(() => {
  return {
    q: props.searchedKeyword.length ? props.searchedKeyword : '*',
    page: pageInfo.value.currentPage,
    per_page: pageInfo.value.itemsPerPage,
    filter_by: `organization_slug:${route.params?.id}`,
    query_by: 'job_title'
  };
})

watch(() => props.searchedKeyword, () => {
  pageInfo.value.currentPage = 1;
  pageInfo.value
  getOrgJobs();
})

onMounted(async () => {
  orgJobsFetching.value = true;
  await getOrgJobs();
  orgJobsFetching.value = false;
})

async function getOrgJobs() {
  orgJobsFetching.value = true;
  await districtStore.fetchSchoolDistrictJobs(queryParams.value);
  pageInfo.value.totalPages = totalPagesInOpenedJobs.value;
  orgJobsFetching.value = false;
}

const paginate = (page: number | "prev" | "next") => {
  if (page === "prev") pageInfo.value.currentPage--;
  else if (page === "next") pageInfo.value.currentPage++;
  else pageInfo.value.currentPage = page;

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  getOrgJobs();
};
</script>

<template>
  <div v-if="orgJobsFetching" class="container">
    <div class="flex justify-center items-center h-[calc(100vh-60px)] w-full">
      <BaseSpinner size="lg" :show-loader="orgJobsFetching" />
    </div>
  </div>

  <div v-else>
    <template v-if="pageInfo.totalPages">
      <div class="grid gap-6 grid-cols-1">
        <template v-for="job in openedJobs">
          <JobCard
              :job="job"
              :show-job-description="false"
              :card-form="false"
          />
        </template>
      </div>

      <CustomPagination
          :current-page="pageInfo.currentPage"
          :total-pages="pageInfo.totalPages"
          @paginate="paginate"
      />
    </template>

    <NoRecordFound v-else name="jobs" />
  </div>

</template>
