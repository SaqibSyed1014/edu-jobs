<script setup lang="ts">
let toggleSideBar = ref(false);

function togglingSidebarVisibility() {
  toggleSideBar.value = !toggleSideBar.value;
  if (toggleSideBar.value) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
  }
}

const jobOptions = ref({
  icon: "SvgoBriefCase",
  data: [
    { id: "1", label: "0 to 10", checked: false },
    { id: "2", label: "11 to 50", checked: true },
    { id: "3", label: "51 to 100", checked: false },
    { id: "4", label: "100+", checked: false },
  ],
});

const stuOptions = ref({
  icon: "SvgoGraduationHat",
  data: [
    { id: "1", label: "0 to 100", checked: false },
    { id: "2", label: "101 to 500", checked: false },
    { id: "3", label: "501 to 1000", checked: true },
    { id: "4", label: "1001 to 2000", checked: false },
    { id: "4", label: "2001 to 3000", checked: false },
    { id: "4", label: "3001 to 5000", checked: false },
    { id: "4", label: "5001 to 10,000", checked: false },
    { id: "4", label: "10,000+", checked: false },
  ],
});

const schOptions = ref({
  icon: "SvgoBuilding",
  data: [
    { id: "1", label: "0 to 10", checked: false },
    { id: "2", label: "11 to 25", checked: true },
    { id: "3", label: "26 to 50", checked: false },
    { id: "4", label: "51 to 100", checked: false },
  ],
});

const clearAll = () => {
  jobOptions?.value?.data?.forEach((option: any) => {
    option.checked = false;
  });

  stuOptions?.value?.data?.forEach((option: any) => {
    option.checked = false;
  });

  schOptions?.value?.data?.forEach((option: any) => {
    option.checked = false;
  });
};

const capitals = ref<string[]>([]); // Declare capitals as a ref of type string array
for (let i = 65; i <= 90; i++) {
  capitals.value.push(String.fromCharCode(i));
}

const isGridView = ref(true); // Reactive variable to store the current view mode
const selectedAlphabet = ref<number>(0); // Reactive variable to store the selected alphabet index

const schoolList = ref([
  {
    avatar: "/images/schoolDistrict/Avatar1.png",
    schoolName: "Palo Alto Unified School District",
  },
  {
    avatar: "/images/schoolDistrict/avatar2.png",
    schoolName: "San Dieguito Union High School District",
  },
  {
    avatar: "/images/schoolDistrict/avatar3.png",
    schoolName: "Arcadia Unified School District",
  },
  {
    avatar: "/images/schoolDistrict/avatar4.png",
    schoolName: "Saratoga Joint Union High School District",
  },
  {
    avatar: "/images/schoolDistrict/avatar5.png",
    schoolName: "Palo Alto Unified School Districts",
  },
  {
    avatar: "/images/schoolDistrict/avatar6.png",
    schoolName: "San Dieguito Union High School District",
  },
  {
    avatar: "/images/schoolDistrict/avatar7.png",
    schoolName: "Arcadia Unified School District",
  },
  {
    avatar: "/images/schoolDistrict/avatar8.png",
    schoolName: "Saratoga Joint Union High School District",
  },

  {
    avatar: "/images/schoolDistrict/avatar9.png",
    schoolName: "Palo Alto Unified School Districts",
  },
  {
    avatar: "/images/schoolDistrict/avatar10.png",
    schoolName: "San Dieguito Union High School District",
  },
  {
    avatar: "/images/schoolDistrict/avatar11.png",
    schoolName: "Arcadia Unified School District",
  },
  {
    avatar: "/images/schoolDistrict/avatar12.png",
    schoolName: "Saratoga Joint Union High School District",
  },
]);

// Function to switch to list view
const switchToListView = () => {
  isGridView.value = false;
};

// Function to switch to grid view
const switchToGridView = () => {
  isGridView.value = true;
};

const selectAlphabet = (index: number) => {
  selectedAlphabet.value = index;
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
                />

                <FilterSection
                  title="No. of schools"
                  :options="schOptions"
                  total-jobs="13"
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
              />

              <FilterSection
                title="No. of schools"
                :options="schOptions"
                total-jobs="13"
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
            <form class="w-full" action="#" method="GET">
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
          <div
            v-if="isGridView"
            class="grid sm:grid-cols-2 pt-8 lg:grid-cols-3 gap-6"
          >
            <div v-for="(item, index) in schoolList" :key="index">
              <DIstrictGridCard :data="item" :isSchool="true" />
            </div>
          </div>
          <!-- Lsit View -->
          <div v-if="!isGridView" class="grid gap-6 pt-8">
            <div v-for="(item, index) in schoolList" :key="index">
              <DistrictListCard :data="item" :isSchool="true" />
            </div>
          </div>
        </div>

        <Pagination />
      </div>
    </div>
  </div>
</template>
