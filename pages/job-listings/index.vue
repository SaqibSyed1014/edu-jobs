<script setup lang="ts">
import {SvgoBarChart, SvgoClock, SvgoCurrencyDollar, SvgoGrid, SvgoLineChartUp, SvgoList} from "#components";
import LocationPinIcon from "assets/icons/location-pin.svg";
import SearchIcon from "assets/icons/search.svg";
import Pagination from "~/components/core/Pagination.vue";
import ListingFilters from "~/components/core/ListingFilters.vue";
import JobCTA from "~/components/pages/job-listings/JobCTA.vue";

const filters = [
  {
    type: 'checkbox',
    title: 'Type of employment',
    icon: 'SvgoClock',
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
    type: 'checkbox',
    title: 'Job Category',
    icon: 'SvgoBarChart',
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
    type: 'checkbox',
    title: 'Experience Level',
    icon: 'SvgoLineChartUp',
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
  {
    type: 'range',
    title: 'Salary Range',
    icon: 'SvgoCurrencyDollar',
    min: 0,
    max: 250000
  }
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

const isGridOptionSelected = ref(true)

const isFilterSidebarVisible = ref(false)
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
          <SearchBar />
        </template>

        <template #cards-list>
          <div class="flex gap-4 justify-between items-stretch md:items-center">
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
                  color="gray"
                  :outline="true"
                  :btns-group="itemsViewOptions"
                  @option-selected="(val :number) => isGridOptionSelected = val === 0"
              />
            </div>

            <BaseButton @click="isFilterSidebarVisible = true" color="gray" :outline="true" label="" class="md:hidden">
              <template #prepend-icon>
                <SvgoFilter class="w-5 h-5 text-gray-600"/>
              </template>
            </BaseButton>
          </div>

          <div class="grid gap-6" :class="[isGridOptionSelected ? 'md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1']">
            <template v-for="job in jobList">
              <NuxtLink to="/job-listings/details">
                <JobCard :job="job" :card-form="isGridOptionSelected"/>
              </NuxtLink>
            </template>
          </div>

          <Pagination />
        </template>
      </ListingView>

      <JobCTA />
    </div>
</template>

