<script setup lang="ts">
import {SvgoBarChart, SvgoClock, SvgoGrid, SvgoLineChartUp, SvgoList} from "#components";
import LocationPinIcon from "assets/icons/location-pin.svg";
import SearchIcon from "assets/icons/search.svg";
import Pagination from "~/components/core/Pagination.vue";

const filters = [
  {
    title: 'Type of employment',
    icon: SvgoClock,
    list: [
      {
        label: 'Full-time',
        checked: true,
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
    title: 'Job Category',
    icon: SvgoBarChart,
    list: [
      {
        label: 'Instructional',
        checked: true,
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
    title: 'Experience Level',
    icon: SvgoLineChartUp,
    list: [
      {
        label: 'Entry-level',
        checked: true,
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
]

const jobList = [
  {
    logo: 'logo-one.jpg',
    postedAt: '1h ago',
    title: 'Marketing Associate',
    country: 'Polymath, Melbourne, AU',
    category: 'Design',
    description: 'We’re looking for a mid-level product designer to join our team.',
    duration: 'Full-time',
    wage: '80k - 100k'
  },
  {
    logo: 'logo-two.jpg',
    postedAt: '6h ago',
    title: 'Senior Graphic Designer',
    country: 'Polymath, Melbourne, AU',
    category: 'Design',
    description: 'We’re looking for a mid-level product designer to join our team.',
    duration: 'Full-time',
    wage: '80k - 100k'
  },
  {
    logo: 'logo-three.jpg',
    postedAt: '2h ago',
    title: 'Lead Product Designer',
    country: 'Polymath, Melbourne, AU',
    category: 'Design',
    description: 'We’re looking for a mid-level product designer to join our team.',
    duration: 'Full-time',
    wage: '80k - 100k'
  },
  {
    logo: 'logo-four.jpg',
    postedAt: '6h ago',
    title: 'Senior Graphic Designer',
    country: 'Polymath, Melbourne, AU',
    category: 'Design',
    description: 'We’re looking for a mid-level product designer to join our team.',
    duration: 'Full-time',
    wage: '80k - 100k'
  },
  {
    logo: 'logo-two.jpg',
    postedAt: '6h ago',
    title: 'Senior Graphic Designer',
    country: 'Polymath, Melbourne, AU',
    category: 'Design',
    description: 'We’re looking for a mid-level product designer to join our team.',
    duration: 'Full-time',
    wage: '80k - 100k'
  },
  {
    logo: 'logo-one.jpg',
    postedAt: '6h ago',
    title: 'Senior Graphic Designer',
    country: 'Polymath, Melbourne, AU',
    category: 'Design',
    description: 'We’re looking for a mid-level product designer to join our team.',
    duration: 'Full-time',
    wage: '80k - 100k'
  },
  {
    logo: 'logo-two.jpg',
    postedAt: '2h ago',
    title: 'Lead Product Designer',
    country: 'Polymath, Melbourne, AU',
    category: 'Design',
    description: 'We’re looking for a mid-level product designer to join our team.',
    duration: 'Full-time',
    wage: '80k - 100k'
  },
  {
    logo: 'logo-three.jpg',
    postedAt: '2h ago',
    title: 'Lead Product Designer',
    country: 'Polymath, Melbourne, AU',
    category: 'Design',
    description: 'We’re looking for a mid-level product designer to join our team.',
    duration: 'Full-time',
    wage: '80k - 100k'
  },
]

const itemsViewOptions = [
  {
    label: 'List',
    icon: SvgoList
  },
  {
    label: 'Grid',
    icon: SvgoGrid
  }
]
</script>

<template>
    <div class="job-listing-view">
      <ListingView>
        <template #filters>
          <div class="flex flex-col gap-3">
            <div class="flex justify-between items-center font-semibold border-b border-gray-200 py-2">
              <div class="flex justify-center items-center gap-3 text-gray-700">
                <SvgoFilter class="w-4 h-4" />
                <p>Filters</p>
              </div>
              <span class="text-brand-700 text-sm cursor-pointer">
                Clear All
              </span>
            </div>

            <template v-for="filter in filters">
              <div>
                <div class="flex items-center gap-3 font-semibold">
                  <component :is="filter.icon" class="w-5 h-5 text-gray-500" />
                  <span class="">{{ filter.title }}</span>
                </div>
                <div class="filter-list pl-8 border-b border-gray-200">
                  <template v-for="item in filter.list">
                    <div class="flex items-center gap-3 first:pt-2 pb-4">
                      <input type="checkbox" >
                      <label for="">
                        {{ item.label }}
                        <span class="text-gray-400 font-normal">({{ item.counts }})</span>
                      </label>
                    </div>
                  </template>
                </div>
              </div>
            </template>
          </div>
        </template>

        <template #header>
          <ListingViewTitle
              title="Jobs"
              sub-title="Find your desired job from the comfort of your home."
          />
        </template>

        <template #search-filters>
          <div class="home-search-filters">
            <div class="filter-wrapper w-full">
              <div class="flex items-center flex-1">
                <SearchIcon class="w-4 h-4 text-gray-400" />
                <input
                    type="text"
                    placeholder="Keyword, Job title..."
                    class="w-full"
                >
              </div>
              <hr class="hidden md:block h-3 w-px bg-gray-200 mx-2">
              <hr class="block md:hidden h-px w-[92%] mx-auto bg-gray-200">
              <div class="flex items-center flex-1">
                <LocationPinIcon class="w-4 h-4 text-gray-400" />
                <client-only>
                  <GMapAutocomplete placeholder="Anywhere" class="w-full" />
                </client-only>
              </div>
            </div>
            <div>
              <BaseButton label="Search" color="primary" :full-sized-on-small="true"/>
            </div>
          </div>
        </template>

        <template #cards-list>
          <div class="flex justify-between items-center">
            <BaseButton color="gray" :outline="true" label="Most Relevant">
              <template #prepend-icon>
                <SvgoFilterFunnel class="w-5 h-5 text-gray-600"/>
              </template>
              <template #append-icon>
                <SvgoChevronDown class="w-4 h-4 text-gray-600"/>
              </template>
            </BaseButton>

            <div class="inline-flex rounded-md shadow-sm" role="group">
              <BaseButtonsGroup color="gray" :outline="true" :btns-group="itemsViewOptions" />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <template v-for="job in jobList">
              <JobCard :job="job" />
            </template>
          </div>

          <Pagination />
        </template>
      </ListingView>
    </div>
</template>

