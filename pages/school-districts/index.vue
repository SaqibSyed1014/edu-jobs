<script setup lang="ts">
import { useDisrictsStore } from "~/segments/districts/store";
import type { TypesenseQueryParam } from "~/segments/common.types";

let toggleSideBar = ref<boolean>(false);
const route = useRoute();
const router = useRouter();
const isLoading = ref<boolean>(true);
const districtStore = useDisrictsStore();
const selectedAlphabet = ref<number>(0);
const { distictsList, total_page } = storeToRefs(districtStore);
const currentPage = ref<number>(Number(route?.query?.page) || 1);
const queryValue = route?.query?.q === "*" ? "" : route?.query?.q;
const searchedValue = ref<string>(
  Array.isArray(queryValue) ? queryValue.join(", ") : queryValue || ""
);

const totalPages = ref(total_page);
const itemsPerPage = ref<number>(12);
const isGridView = ref(
  route?.query?.view
    ? route?.query?.view === "grid"
      ? "grid"
      : "list"
    : "grid"
); // Reactive variable to store the current view mode
type SelectValue = { key1: string } | null;
type SelectStuValue = { key2: string } | null;
const selectschValue = ref<SelectValue>(null);
const selectstuValue = ref<SelectStuValue>(null);

const jobOptions = ref({
  icon: "SvgoBriefCaseLight",
  name: "jobOptions",
  data: [
    { id: "1", label: "0 to 10", value: "0 to 10", checked: true },
    { id: "2", label: "11 to 50", value: "11 to 50", checked: true },
    { id: "3", label: "51 to 100", value: "51 to 100", checked: false },
    { id: "4", label: "100+", value: "100", checked: false },
  ],
});

const stuOptions = ref({
  icon: "SvgoGraduationHat",
  name: "stuOptions",
  data: [
    { id: "1", label: "0 to 100", value: "0 to 100", checked: false },
    { id: "2", label: "101 to 500", value: "101 to 500", checked: false },
    { id: "3", label: "501 to 1000", value: "501 to 1000", checked: false },
    { id: "4", label: "1001 to 2000", value: "1001 to 2000", checked: false },
    { id: "4", label: "2001 to 3000", value: "2001 to 3000", checked: false },
    { id: "4", label: "3001 to 5000", value: "3001 to 5000", checked: false },
    {
      id: "4",
      label: "5001 to 10,000",
      value: "5001 to 10000",
      checked: false,
    },
    { id: "4", label: "10,000+", value: "10000", checked: false },
  ],
});

const schOptions = ref({
  icon: "SvgoBuildingLight",
  name: "schOptions",
  data: [
    { id: "1", label: "0 to 10", value: "0 to 10", checked: false },
    { id: "2", label: "11 to 25", value: "11 to 25", checked: false },
    { id: "3", label: "26 to 50", value: "26 to 50", checked: false },
    { id: "4", label: "51 to 100", value: "51 to 100", checked: false },
    { id: "4", label: "100+", value: "100", checked: false },
  ],
});

// Function to switch to list view
const switchView = (view: any) => {
  isGridView.value = view;
  router.replace({
    path: "/school-districts",
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

const matchOptions = (
  localStorageKey: string,
  options: Ref<{
    data: {
      label: any;
      checked: boolean;
      value: string;
    }[];
  }>,
  filterType: string
) => {
  const storedValue = localStorage.getItem(localStorageKey);
  const lastValue = localStorage.getItem(`${filterType}LastValue`);

  if (lastValue) {
    const foundItem = options.value.data.find(
      (item) => item.value === lastValue
    );
    if (foundItem) {
      foundItem.checked = true;
    }
  }
  if (storedValue !== null) {
    const getvalue: string[] = JSON.parse(storedValue);
    // Loop through each range in getvalue
    getvalue.forEach((range: any) => {
      // Find the corresponding label in options.data and set its checked property to true
      const foundLabel = options.value.data.find((item) => {
        const [start, end] = range.map(Number);
        const [min, max] = item.label.split(" to ").map(Number);
        return start === min || end === max;
      });
      if (foundLabel) {
        foundLabel.checked = true;
      }
    });
  }
};

onMounted(async () => {
  await fetchDistricts(); // Initial fetch
  if (route?.query?.filter_by) {
    query.value.filter_by = route?.query?.filter_by.toString();
  } else {
    localStorage.removeItem("schLastValue");
    localStorage.removeItem("stuLastValue");
    localStorage.removeItem("stuOptions");
    localStorage.removeItem("schoption");
  }

  matchOptions("schoption", schOptions, "sch");
  matchOptions("stuOptions", stuOptions, "stu");
});

const query = ref<TypesenseQueryParam>({
  q: route?.query?.q ? route?.query?.q.toString() : "*",
  per_page: itemsPerPage.value,
  page: currentPage.value,
});

if (route?.query?.filter_by) {
  // If it exists, assign its value to the filter_by property
  query.value.filter_by = route?.query?.filter_by.toString();
} else {
  // If it doesn't exist, delete the filter_by key
  delete query?.value?.filter_by;
}

const queryParams = computed(() => {
  const urlParams = {
    q: query.value.q,
    page: query.value.page,
  };
  return urlParams;
});

async function fetchDistricts() {
  isLoading.value = true;
  await districtStore.fetchDistricts(query?.value);
  isLoading.value = false;
  totalPages.value = total_page?.value;
}
// Function to handle pagination
const paginate = (page: number | "prev" | "next") => {
  if (page === "prev") {
    currentPage.value--;
  } else if (page === "next") {
    currentPage.value++;
  } else {
    currentPage.value = page;
  }
  query.value.page = currentPage?.value;

  router.replace({
    path: "/school-districts",
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
  fetchDistricts();
};

function togglingSidebarVisibility() {
  toggleSideBar.value = !toggleSideBar.value;
  if (toggleSideBar.value) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
  }
}

const toggleSchoolOption = (optionName: any, index: number) => {
  const options = eval(optionName);
  options.value.data[index].checked = !options.value.data[index].checked;

  // Initialize an array to store selected ranges
  const selectedRanges: Array<[number, number]> = [];
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
          selectedRanges.push([startRange, endRange]);
        }
      }

      // Apply filters when value is greater than 100+ or 10000+
      if (option.label.endsWith("+")) {
        if (options.value.name === "schOptions") {
          selectschValue.value = { key1: `school_count:>${lastOption?.value}` };
          localStorage.setItem("schLastValue", lastOption?.value);
        }

        if (options.value.name === "stuOptions") {
          selectstuValue.value = {
            key2: `student_count:>${lastOption?.value}`,
          };
          localStorage.setItem("stuLastValue", lastOption?.value);
        }
      }
    }
  });

  // Construct the combined range string
  let range: string | null = null;
  if (selectedRanges.length > 0) {
    // Sort and merge overlapping ranges

    const mergedRanges: Array<[number, number]> = [selectedRanges[0]];
    for (let i = 1; i < selectedRanges.length; i++) {
      const lastRange = mergedRanges[mergedRanges.length - 1];
      const currentRange = selectedRanges[i];
      if (lastRange[1] >= currentRange[0] - 1) {
        lastRange[1] = Math.max(lastRange[1], currentRange[1]);
      } else {
        mergedRanges.push(currentRange);
      }
    }

    // Check if the last range is the "100+" range and it's checked
    if (lastOption.checked && lastOption.label.endsWith("+")) {
      lastValue = lastOption?.value;
    }

    // Construct the range string
    range = mergedRanges.map((range) => `${range[0]}..${range[1]}`).join(",");

    // Add `>${lastValue}` only if lastValue is not null
    if (lastValue !== null) {
      range += `,>${lastValue}`;
    }

    if (options.value.name === "schOptions") {
      selectschValue.value = { key1: `school_count:=[${range}]` };
      localStorage.setItem("schoption", JSON.stringify(selectedRanges));
      if (lastValue !== null) {
        localStorage.setItem("schLastValue", lastValue);
      } else {
        localStorage.removeItem("schLastValue");
      }
    }

    if (options.value.name === "stuOptions") {
      selectstuValue.value = { key2: `student_count:=[${range}]` };
      localStorage.setItem("stuOptions", JSON.stringify(selectedRanges));
      if (lastValue !== null) {
        localStorage.setItem("stuLastValue", lastValue);
      } else {
        localStorage.removeItem("stuLastValue");
      }
    }
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
  } else if (lastOption.checked === false && lastOption.label.endsWith("+")) {
    if (options.value.name === "schOptions") {
      selectschValue.value = null;
      localStorage.removeItem("schoption");
    }

    if (options.value.name === "stuOptions") {
      selectstuValue.value = null;
      localStorage.removeItem("stuOptions");
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

  // Assign mergedFilterBy to query.value.filter_by if it's not empty
  if (mergedFilterBy !== "") {
    query.value.filter_by = mergedFilterBy;
  } else {
    // Remove filter_by key if mergedFilterBy is empty
    delete query.value.filter_by;
  }

  router.replace({
    path: "/school-districts",
    query: {
      view: isGridView.value,
      ...(mergedFilterBy !== "" && { filter_by: mergedFilterBy }),
      ...queryParams.value,
    },
  });

  fetchDistricts();
};

const clearAll = () => {
  [jobOptions, stuOptions, schOptions].forEach((option) => {
    option.value.data.forEach((opt: any) => {
      opt.checked = false;
    });
  });
  delete query.value.filter_by; // Remove the filter_by property
  router.replace({
    path: "/school-districts",
    query: {
      view: isGridView.value,
      ...queryParams.value,
    },
  });
  fetchDistricts();
};

const capitals = ref<string[]>([]); // Declare capitals as a ref of type string array
for (let i = 65; i <= 90; i++) {
  capitals.value.push(String.fromCharCode(i));
}

const selectAlphabet = (index: number) => {
  selectedAlphabet.value = index;
};

const handleInput = _debounce(() => {
  search();
}, 500); // Adjust the debounce delay as needed (in milliseconds)

const search = () => {
  query.value.q = searchedValue.value.toString() ?? "*";
  query.value.query_by = "district_name";
  query.value.page = 1;
  currentPage.value = 1;
  router.replace({
    path: "/school-districts",
    query: {
      view: isGridView.value,
      ...queryParams.value,
    },
  });
  fetchDistricts();
};
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
                  total-jobs="125"
                />

                <FilterSection
                  title="No. of students"
                  :options="stuOptions"
                  total-jobs="12,000"
                  @toggleSchoolOption="toggleSchoolOption"
                />

                <FilterSection
                  title="No. of schools"
                  :options="schOptions"
                  total-jobs="13"
                  @toggleSchoolOption="toggleSchoolOption"
                />
              </div>
              <div class="pt-[18px] w-full">
                <BaseButton label="Apply" color="primary" :fullSized="true" />
              </div>
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
                total-jobs="125"
              />

              <FilterSection
                title="No. of students"
                :options="stuOptions"
                total-jobs="12,000"
                @toggleSchoolOption="toggleSchoolOption"
              />

              <FilterSection
                title="No. of schools"
                :options="schOptions"
                total-jobs="13"
                @toggleSchoolOption="toggleSchoolOption"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="w-full xl:w-4/5 xl:px-8 pt-8 pb-8">
        <div class="flex-col justify-start items-start gap-1 inline-flex">
          <div class="text-gray-900 text-3xl font-semibold leading-[38px]">
            School Districts
          </div>
          <div class="text-gray-600 text-base font-normal leading-normal">
            Find job openings at any school in any district.
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

          <div class="inline-flex justify-end">
            <div
              class="rounded-lg shadow justify-start items-start inline-flex"
            >
              <button
                type="button"
                @click="switchToListView"
                :class="{
                  'pl-3.5 pr-4 py-[11px] rounded-s-lg justify-center bg-white border border-gray-300 h-full items-center gap-2 flex':
                    isGridView,
                  'pl-3.5 pr-4 py-[11px] rounded-s-lg justify-center bg-gray-50 border border-gray-300 h-full items-center gap-2 flex':
                    !isGridView,
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
                    isGridView,
                  'pl-3.5 pr-4 py-[11px] rounded-e-lg justify-center bg-white border border-gray-300 h-full items-center gap-2 flex':
                    !isGridView,
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

        <div
          class="pt-6 w-full gap-2 flex flex-col xl:flex-row border-b border-gray-200"
        >
          <div>
            <p class="text-gray-500 text-sm font-semibold !w-[139px]">
              Search by alphabet
            </p>
          </div>

          <div
            class="flex flex-wrap gap-2.5 sm:gap-x-0 items-center w-full justify-between"
          >
            <div
              v-for="(capital, index) in capitals"
              :key="index"
              class="pr-1.5 borer-b border-gray-200"
            >
              <button
                :class="[
                  index === selectedAlphabet
                    ? 'text-blue-800 border-b-2 px-[5px] border-blue-800'
                    : 'md:px-[5px]',
                ]"
                @click="selectAlphabet(index)"
              >
                <span class="text-xs md:text-sm">{{ capital }}</span>
              </button>
            </div>
            <div class="text-brand-800 text-sm font-semibold leading-tight">
              Clear
            </div>
          </div>
        </div>

        <div class="mt-1.5 mb-8">
          <!-- Grid View -->

          <template v-if="isLoading || distictsList.length">
            <div
              v-if="isGridView === 'grid'"
              class="grid sm:grid-cols-2 pt-8 lg:grid-cols-3 gap-6"
            >
              <div v-if="isLoading" v-for="i in 12">
                <SDGridSkelton />
              </div>
              <div v-else v-for="(item, index) in distictsList" :key="index">
                <DIstrictsGridCard :data="item" />
              </div>
            </div>
            <!-- Lsit View -->
            <div v-if="isGridView === 'list'" class="grid gap-6 pt-8">
              <div v-if="isLoading" v-for="i in 12">
                <SDListSkelton />
              </div>
              <div v-else v-for="(item, index) in distictsList" :key="index">
                <DistrictsListCard :data="item" />
              </div>
            </div>
          </template>
          <template v-else>
            <NoRecordFound name="schools" :search-value="searchedValue" />
          </template>
        </div>
        <div v-if="distictsList?.length > 0">
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
