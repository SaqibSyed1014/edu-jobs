<script setup lang="ts">
import type {TypesenseQueryParam} from "~/segments/common.types";
import {useSchoolsStore} from "~/segments/schools/store";

let toggleSideBar = ref<boolean>(false);
const route = useRoute();
const router = useRouter();
const isLoading = ref<boolean>(true);
const schoolsStore = useSchoolsStore();
const selectedAlphabet = ref<number>(0);
const { schoolsList, total_page, schoolsFound } = storeToRefs(schoolsStore);
const currentPage = ref<number>(Number(route?.query?.page) || 1);
const queryValue = route?.query?.q === "*" ? "" : route?.query?.q;
const searchedValue = ref<string>(
  Array.isArray(queryValue) ? queryValue.join(", ") : queryValue || ""
);

const totalPages = ref(total_page);
const itemsPerPage = ref<number>(24);
const isGridView = ref(
  route?.query?.view
    ? route?.query?.view === "grid"
      ? "grid"
      : "list"
    : "list"
); // Reactive variable to store the current view mode
type SelectValue = { key1: string } | null;
type SelectStuValue = { key2: string } | null;
// type SelectJoValue = { key3: string } | null;
const selectschValue = ref<SelectValue>(null);
const selectstuValue = ref<SelectStuValue>(null);
// const selectjobValue = ref<SelectJoValue>(null);

const jobOptions = ref({
  icon: "SvgoBriefCaseLight",
  name: "jobOptions",
  data: [
    { id: "1", label: "0 to 10", value: "0 to 10", checked: false },
    { id: "2", label: "11 to 50", value: "11 to 50", checked: false },
    { id: "3", label: "51 to 100", value: "51 to 100", checked: false },
    { id: "4", label: "100+", value: "100", checked: false },
  ],
});

const stuOptions = ref({
  icon: "SvgoGraduationHat",
  name: "stuOptions",
  data: [
    { id: "5", label: "0 to 100", value: "0 to 100", checked: false },
    { id: "6", label: "101 to 500", value: "101 to 500", checked: false },
    { id: "7", label: "501 to 1000", value: "501 to 1000", checked: false },
    { id: "8", label: "1001 to 2000", value: "1001 to 2000", checked: false },
    { id: "9", label: "2001 to 3000", value: "2001 to 3000", checked: false },
    { id: "10", label: "3001 to 5000", value: "3001 to 5000", checked: false },
    {
      id: "11",
      label: "5001 to 10,000",
      value: "5001 to 10000",
      checked: false,
    },
    { id: "12", label: "10,000+", value: "10000", checked: false },
  ],
});

const schOptions = ref({
  icon: "SvgoBuildingLight",
  name: "schOptions",
  data: [
    { id: "13", label: "0 to 10", value: "0 to 10", checked: false },
    { id: "14", label: "11 to 25", value: "11 to 25", checked: false },
    { id: "15", label: "26 to 50", value: "26 to 50", checked: false },
    { id: "16", label: "51 to 100", value: "51 to 100", checked: false },
    { id: "17", label: "100+", value: "100", checked: false },
  ],
});

// Function to switch to list view
const switchView = (view: any) => {
  isGridView.value = view;
  localStorage.setItem('schoolsLayout', view);
  router.replace({
    path: "/charter-schools",
    query: {
      view: view,
      ...queryParams?.value,
    },
  });
};

const switchToListView = () => {
  switchView("list");
};

const switchToGridView = () => {
  switchView("grid");
};

onMounted(async () => {
  let savedLayout :string | null = '';
  if (process.client) {   // using process.client due to SSR
    if (localStorage.getItem('schoolsLayout')) savedLayout = localStorage.getItem('schoolsLayout');
    else if (route?.query?.view) savedLayout = route?.query?.view as string
    else savedLayout = 'list'
    isGridView.value = savedLayout as string;
  }
  if (route?.query?.q?.length) await search();  // if search param is there, call search() function
  else await fetchSchools(); // Initial fetch
});

const setCheckedValues = (filterBy: any) => {
  // Check if filterBy exists
  if (filterBy) {
    // Split filterBy into parts for school_count and student_count
    const [schoolFilter, studentFilter] = filterBy.split(" && ");

    // Parse and set checked values for school_count
    const schoolRanges = schoolFilter.match(/\d+\s*to\s*\d+|\d+|>\d+/g);
    schoolRanges.forEach((range: any) => {
      schOptions.value.data.forEach((item) => {
        const [itemStart, itemEnd] = item.label.split(" to ").map(Number);
        if (range.startsWith(">")) {
          let lastValue = parseInt(range.slice(1));
          const foundItem = schOptions.value.data.find(
            (item) => item.value === lastValue.toString()
          );
          if (foundItem) {
            foundItem.checked = true;
          }
        }

        if (
          String(range) === String(itemStart) ||
          String(range) === String(itemEnd)
        ) {
          item.checked = true;
        }
      });
    });

    // Parse and set checked values for student_count
    const studentRanges = studentFilter.match(/\d+\s*to\s*\d+|\d+|>\d+/g);
    studentRanges.forEach((range: any) => {
      stuOptions.value.data.forEach((item) => {
        const [itemStart, itemEnd] = item.label.split(" to ").map(Number);
        if (range.startsWith(">")) {
          let lastValue = parseInt(range.slice(1));
          const foundItem = stuOptions.value.data.find(
            (item) => item.value === lastValue.toString()
          );
          if (foundItem) {
            foundItem.checked = true;
          }
        }

        if (
          String(range) === String(itemStart) ||
          String(range) === String(itemEnd)
        ) {
          item.checked = true;
        }
      });
    });
  }
};

const query = ref<TypesenseQueryParam>({
  q: route?.query?.q ? route?.query?.q.toString() : "*",
  per_page: itemsPerPage.value,
  page: currentPage.value,
});

const queryParams = computed(() => {
  return {
    q: query.value.q,
    page: query.value.page,
  };
});

async function fetchSchools() {
  localStorage.setItem('schoolsLayout', isGridView.value)
  isLoading.value = true;
  await schoolsStore.fetchCharterSchools(query?.value);
  isLoading.value = false;
  totalPages.value = total_page?.value;
}
// Function to handle pagination
const paginate = (page: number | "prev" | "next") => {
  if (page === "prev") currentPage.value--;
  else if (page === "next") currentPage.value++;
  else currentPage.value = page;
  query.value.page = currentPage?.value;

  router.replace({
    path: "/charter-schools",
    query: {
      view: isGridView.value,
      ...queryParams.value,
    },
  });

  // Scroll to the top
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  fetchSchools();
};

function togglingSidebarVisibility() {
  toggleSideBar.value = !toggleSideBar.value;
  if (toggleSideBar.value) document.body.classList.add("overflow-hidden");
  else document.body.classList.remove("overflow-hidden");
}

const toggleSchoolOption = (optionName: any, index: number) => {
  const options = eval(optionName);
  options.value.data[index].checked = !options.value.data[index].checked;

  // Initialize an array to store selected ranges
  const selectedRanges: any = [];
  const lastOption = options.value.data[options.value.data.length - 1];
  let lastValue: string | null = null;

  // Iterate through the options to gather selected ranges
  options.value.data.forEach((option: any) => {
    if (option.checked) {
      const labelParts = option.value.split(" to ");
      if (labelParts.length === 2) {
        const startRange = parseInt(labelParts[0].replace(/[^0-9]/g, ""));
        const endRange = parseInt(labelParts[1].replace(/[^0-9]/g, ""));
        if (!isNaN(startRange) && !isNaN(endRange)) {
          // Add the range if it's checked
          selectedRanges.push(`${startRange}..${endRange}`);
        }
      }

      // Apply filters when value is greater than 100+ or 10000+
      if (option.label.endsWith("+")) {
        if (options.value.name === "schOptions") {
          selectschValue.value = { key1: `school_count:>${lastOption?.value}` };
          if (route?.query?.filter_by) {
            const splitData = route?.query?.filter_by.split(" && ");
            splitData.forEach((item: any) => {
              if (item.includes("student_count")) {
                selectstuValue.value = { key2: item };
              }
            });
          }
        }

        if (options.value.name === "stuOptions") {
          selectstuValue.value = {
            key2: `student_count:>${lastOption?.value}`,
          };
          if (route?.query?.filter_by) {
            const splitData = route?.query?.filter_by.split(" && ");
            splitData.forEach((item: any) => {
              if (item.includes("school_count")) {
                selectschValue.value = { key1: item };
              }
            });
          }
        }
      }
    }
  });

  // Construct the combined range string
  let range: string | null = null;
  if (selectedRanges.length > 0) {
    // Check if the last range is the "100+" range and it's checked
    if (lastOption.checked && lastOption.label.endsWith("+")) {
      lastValue = lastOption?.value;
    }

    // Construct the range string
    range = selectedRanges.map((range: any) => `${range}`).join(",");

    // Add `>${lastValue}` only if lastValue is not null
    if (lastValue !== null) {
      range += `,>${lastValue}`;
    }

    if (options.value.name === "schOptions") {
      if (route?.query?.filter_by) {
        const splitData = route?.query?.filter_by.split(" && ");
        splitData.forEach((item: any) => {
          if (item.includes("student_count")) {
            selectstuValue.value = { key2: item };
          }
        });
      }
      selectschValue.value = { key1: `school_count:=[${range}]` };
    }

    if (options.value.name === "stuOptions") {
      if (route?.query?.filter_by) {
        const splitData = route?.query?.filter_by.split(" && ");
        splitData.forEach((item: any) => {
          if (item.includes("school_count")) {
            selectschValue.value = { key1: item };
          }
        });
      }
      selectstuValue.value = { key2: `student_count:=[${range}]` };
    }
    // if (options.value.name === "jobOptions") {
    //  if (route?.query?.filter_by) {
    //   const splitData = route?.query?.filter_by.split(" && ");
    //   splitData.forEach((item: any) => {
    //     if (item.includes("school_count")) {
    //       selectschValue.value = { key1: item };
    //     }
    //   });
    // }
    //   selectjobValue.value = { key3: `job_count:=[${range}]` };
    // }
  } else if (
    selectedRanges.length > 0 &&
    lastOption.checked &&
    lastOption.label.endsWith("+")
  ) {
    if (options.value.name === "schOptions") {
      selectschValue.value = null;
    }

    if (options.value.name === "stuOptions") {
      selectstuValue.value = null;
    }
    let mergedFilterBy = "";
    if (selectschValue.value && selectschValue.value.key1) {
      mergedFilterBy += selectschValue.value.key1;
    }
    if (selectschValue.value && selectstuValue.value) {
      mergedFilterBy += " && ";
    }
    if (selectstuValue.value && selectstuValue.value.key2) {
      mergedFilterBy += selectstuValue.value.key2;
    }
    // if (selectjobValue.value?.key3) {
    //   if (mergedFilterBy) {
    //     mergedFilterBy += " && ";
    //   }
    //   mergedFilterBy += selectjobValue.value.key3;
    // }
  } else if (lastOption.checked === false && lastOption.label.endsWith("+")) {
    if (options.value.name === "schOptions") {
      selectschValue.value = null;
    }

    if (options.value.name === "stuOptions") {
      selectstuValue.value = null;
    }
    let mergedFilterBy = "";
    if (selectschValue.value && selectschValue.value.key1) {
      mergedFilterBy += selectschValue.value.key1;
    }
    if (selectschValue.value && selectstuValue.value) {
      mergedFilterBy += " && ";
    }
    if (selectstuValue.value && selectstuValue.value.key2) {
      mergedFilterBy += selectstuValue.value.key2;
    }
    // if (selectjobValue.value?.key3) {
    //   if (mergedFilterBy) {
    //     mergedFilterBy += " && ";
    //   }
    //   mergedFilterBy += selectjobValue.value.key3;
    // }
  }

  // Merge key1 and key2 with '&&' between them
  const mergedFilterBy =
    (selectschValue.value && selectschValue.value.key1
      ? selectschValue.value.key1
      : "") +
    (selectschValue.value && selectstuValue.value ? " && " : "") +
    (selectstuValue.value && selectstuValue?.value?.key2
      ? selectstuValue?.value?.key2
      : "");
  // +
  // (selectstuValue.value && selectjobValue.value ? " && " : "") +
  // (selectjobValue.value && selectjobValue?.value?.key3
  //   ? selectjobValue?.value?.key3
  //   : "");

  // Assign mergedFilterBy to query.value.filter_by if it's not empty
  if (mergedFilterBy !== "") {
    query.value.filter_by = mergedFilterBy;
  } else {
    // Remove filter_by key if mergedFilterBy is empty
    delete query.value.filter_by;
  }

  router.replace({
    path: "/charter-schools",
    query: {
      view: isGridView.value,
      ...(mergedFilterBy !== "" && { filter_by: mergedFilterBy }),
      ...queryParams.value,
    },
  });

  fetchSchools();
};

const clearAll = () => {
  [jobOptions, stuOptions, schOptions].forEach((option) => {
    option.value.data.forEach((opt: any) => {
      opt.checked = false;
    });
  });
  delete query.value.filter_by; // Remove the filter_by property
  router.replace({
    path: "/charter-schools",
    query: {
      view: isGridView.value,
      ...queryParams.value,
    },
  });
  fetchSchools();
};

const capitals = ref<string[]>([]); // Declare capitals as a ref of type string array
for (let i = 65; i <= 90; i++) {
  capitals.value.push(String.fromCharCode(i));
}

const selectAlphabet = (index: number) => {
  selectedAlphabet.value = index;
};

const handleInput = _debounce(() => {
  search(true);
}, 500);

const search = (resetToDefaultPage = false) => {
  query.value.q = searchedValue.value.toString() ?? "*";
  query.value.query_by = "name";
  if (resetToDefaultPage) query.value.page = 1;
  else query.value.page = route?.query?.page ? route.query.page : 1;  // search with page number if there's page number in the query params
  currentPage.value = 1;
  if (route?.query?.filter_by) {  // If it exists, assign its value to the filter_by property
    const jobCountsValues = route?.query?.filter_by
    const jobCountsParams = `job_count:[${jobCountsValues}]`
    query.value.filter_by = jobCountsParams.toString();
    // setCheckedValues(jobCountsValues);
  } else delete query?.value?.filter_by;  // If it doesn't exist, delete the filter_by key
  console.log('search ', query.value)
  router.replace({
    path: "/charter-schools",
    query: {
      view: isGridView.value,
      ...queryParams.value,
    },
  });
  fetchSchools();
};

let selectedValues = ref<string[]>([])
function filtersChanged(filterName :string, i :number, label :string, isChecked :boolean) {

  const value = jobOptions.value.data[i].value.replace(' to ', '..'); // Format value

  if (isChecked) selectedValues.value.push(value);
  else selectedValues.value = selectedValues.value.filter(v => v !== value);

  if (selectedValues.value.length) {
    query.value.filter_by = `job_count:[${[selectedValues.value]}]`
  }

  console.log('Selected values:', selectedValues.value);
  router.replace({
    path: "/charter-schools",
    query: {
      view: isGridView.value,
      ...(selectedValues.value.length ? { filter_by: selectedValues.value } : ''),
      ...queryParams.value,
    },
  });

  fetchSchools();
}
</script>

<template>
  <div class="border-t border-b border-gray-200 mb-20">
    <div class="container flex w-full">
      <!-- For Mobile -->
      <div class="block xl:hidden">
        <DistrickSideBarWrapper
          class="transform transition-all"
          :class="[toggleSideBar ? 'translate-x-0' : '-translate-x-full ']"
        >
          <div class="relative">
            <SvgoXClose
              v-if="toggleSideBar"
              class="block xl:hidden w-4 h-4 absolute right-0 -top-3"
              @click="togglingSidebarVisibility"
            />
            <div
              class="py-2 flex-col justify-start items-start gap-2.5 inline-flex w-full"
            >
              <div
                class="justify-between items-center inline-flex w-full border-b border-gray-200 pb-2"
              >
                <div class="justify-start items-center gap-3 flex">
                  <SvgoFilterLines class="size-6" />
                  <div
                    class="text-gray-700 text-base font-semibold leading-normal"
                  >
                    Filters
                  </div>
                </div>
                <div class="justify-center items-center gap-1.5 flex">
                  <button
                    @click="clearAll"
                    class="text-brand-800 text-sm font-semibold leading-tight"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              <div class="divide-y divide-gray-200">
                <FilterSection
                  title="No. of jobs"
                  :options="jobOptions"
                  :total-jobs="schoolsFound"
                  :inside-sidebar="true"
                  @toggleSchoolOption="filtersChanged"
                />

<!--                <FilterSection-->
<!--                  title="No. of students"-->
<!--                  :options="stuOptions"-->
<!--                  total-jobs="12,000"-->
<!--                  @toggleSchoolOption="toggleSchoolOption"-->
<!--                  :inside-sidebar="true"-->
<!--                />-->

<!--                <FilterSection-->
<!--                  title="No. of schools"-->
<!--                  :options="schOptions"-->
<!--                  total-jobs="13"-->
<!--                  @toggleSchoolOption="toggleSchoolOption"-->
<!--                  :inside-sidebar="true"-->
<!--                />-->
              </div>
              <!-- <div class="pt-[18px] w-full">
                <BaseButton label="Apply" color="primary" :fullSized="true" />
              </div> -->
            </div>
          </div>
        </DistrickSideBarWrapper>
      </div>

      <!-- for desktop -->
      <div class="hidden xl:inset-y-0 xl:z-30 xl:flex xl:w-1/5 xl:flex-col">
        <div
          class="flex grow flex-col gap-y-5 pt-8 overflow-y-auto border-r pr-4 border-gray-200 bg-transparent ring-1 ring-white/5"
        >
          <div
            class="py-2 flex-col justify-start items-start gap-2.5 inline-flex"
          >
            <div
              class="justify-between items-center inline-flex w-full border-b border-gray-200 pb-2"
            >
              <div class="justify-start items-center gap-3 flex">
                <SvgoFilterLines class="size-6" />
                <div
                  class="text-gray-700 text-base font-semibold leading-normal"
                >
                  Filters
                </div>
              </div>
              <div class="justify-center items-center gap-1.5 flex">
                <button
                  @click="clearAll"
                  class="text-brand-800 text-sm font-semibold leading-tight"
                >
                  Clear All
                </button>
              </div>
            </div>

            <div class="divide-y divide-gray-200">
              <FilterSection
                title="No. of jobs"
                :options="jobOptions"
                :total-jobs="schoolsFound"
                @toggleSchoolOption="filtersChanged"
              />

<!--              <FilterSection-->
<!--                title="No. of students"-->
<!--                :options="stuOptions"-->
<!--                total-jobs="12,000"-->
<!--                @toggleSchoolOption="toggleSchoolOption"-->
<!--              />-->

<!--              <FilterSection-->
<!--                title="No. of schools"-->
<!--                :options="schOptions"-->
<!--                total-jobs="13"-->
<!--                @toggleSchoolOption="toggleSchoolOption"-->
<!--              />-->
            </div>
          </div>
        </div>
      </div>

      <div class="w-full xl:w-4/5 xl:px-8 pt-8 pb-8">
        <div class="flex-col justify-start items-start gap-1 inline-flex">
          <div class="text-gray-900 text-3xl font-semibold leading-[38px]">
            Charter Schools
          </div>
          <div class="text-gray-600 text-base font-normal leading-normal">
            Find job openings at any charter school.
          </div>
        </div>

        <div class="pt-8 flex sm:flex-row flex-col gap-4 justify-between">
          <div class="flex justify-between gap-4">
            <form
              @submit.prevent="search"
              class="w-full"
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
                  v-model="searchedValue"
                  id="search-field"
                  class="block h-full rounded-lg w-full md:w-[320px] shadow border border-gray-300 bg-transparent py-[13px] pl-8 pr-0 text-black sm:text-sm"
                  placeholder="Search..."
                  type="search"
                  name="search"
                  @input="handleInput"
                />
              </div>
            </form>
            <div class="flex shrink-0 items-center shadow-sm md:pr-3">
              <button
                type="button"
                class="size-11 flex items-center text-black xl:hidden rounded-lg shadow border border-gray-300 justify-center"
                @click="togglingSidebarVisibility"
              >
                <span class="sr-only">Open sidebar</span>
                <SvgoFilterLines class="size-6" />
              </button>
            </div>
          </div>

          <div class="hidden md:inline-flex justify-end">
            <div
              class="rounded-lg shadow justify-start items-start inline-flex"
            >
              <button
                type="button"
                @click="switchToListView"
                :class="{
                  'pl-3.5 pr-4 py-[11px] rounded-s-lg justify-center bg-white border border-gray-300 h-full items-center gap-2 flex':
                    isGridView === 'grid',
                  'pl-3.5 pr-4 py-[11px] rounded-s-lg justify-center bg-gray-50 border border-gray-300 h-full items-center gap-2 flex':
                    isGridView === 'list',
                }"
              >
                <SvgoList class="size-5" />
                <div class="text-slate-700 text-sm font-semibold leading-tight">
                  List
                </div>
              </button>
              <button
                type="button"
                @click="switchToGridView"
                :class="{
                  'pl-3.5 pr-4 py-[11px] rounded-e-lg justify-center bg-gray-50 border border-gray-300 h-full items-center gap-2 flex':
                    isGridView === 'grid',
                  'pl-3.5 pr-4 py-[11px] rounded-e-lg justify-center bg-white border border-gray-300 h-full items-center gap-2 flex':
                    isGridView === 'list',
                }"
              >
                <SvgoGrid class="size-5" />
                <div class="text-gray-800 text-sm font-semibold leading-tight">
                  Grid
                </div>
              </button>
            </div>
          </div>
        </div>

<!--        <div-->
<!--          class="pt-6 w-full gap-2 flex flex-col xl:flex-row border-b border-gray-200"-->
<!--        >-->
<!--          <div>-->
<!--            <p class="text-gray-500 text-sm font-semibold !w-[139px]">-->
<!--              Search by alphabet-->
<!--            </p>-->
<!--          </div>-->

<!--          <div-->
<!--            class="flex flex-wrap gap-2.5 sm:gap-x-0 items-center w-full justify-between"-->
<!--          >-->
<!--            <div-->
<!--              v-for="(capital, index) in capitals"-->
<!--              :key="index"-->
<!--              class="pr-1.5 borer-b border-gray-200"-->
<!--            >-->
<!--              <button-->
<!--                :class="[-->
<!--                  index === selectedAlphabet-->
<!--                    ? 'text-blue-800 border-b-2 px-[5px] border-blue-800'-->
<!--                    : 'md:px-[5px]',-->
<!--                ]"-->
<!--                @click="selectAlphabet(index)"-->
<!--              >-->
<!--                <span class="text-xs md:text-sm">{{ capital }}</span>-->
<!--              </button>-->
<!--            </div>-->
<!--            <div class="text-brand-800 text-sm font-semibold leading-tight">-->
<!--              Clear-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->

        <div class="mt-1.5 mb-8">
          <div v-if="isLoading || schoolsList?.length" class="grid gap-6 pt-8" :class="[isGridView === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1']">
            <template v-if="isLoading" v-for="i in 24">
              <client-only>
                <SchoolSkeleton :card-form="isGridView === 'grid'" />
              </client-only>
            </template>

            <template v-else v-for="(item) in schoolsList">
              <SchoolCard :school="item" :card-form="isGridView === 'grid'" />
            </template>
          </div>
          <template v-else>
            <NoRecordFound name="schools" :search-value="searchedValue" />
          </template>
        </div>
        <div v-if="schoolsList?.length > 0">
          <CustomPagination
            :current-page="currentPage"
            :total-pages="totalPages"
            @paginate="paginate"
          />
        </div>
      </div>
    </div>
  </div>
</template>
