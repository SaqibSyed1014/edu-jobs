<script setup lang="ts">
import { initModals } from 'flowbite'
import QuickSignUpModal from "~/components/pages/job-listings/QuickSignUpModal.vue";
const center = ref({ lat: 0, lng: 0 })

const faqList = [
  {
    question: 'Is there a free trial available?',
    answer: 'Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.'
  },
  {
    question: 'Can I change my plan later?',
    answer: 'Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.'
  },
  {
    question: 'What is your cancellation policy?',
    answer: 'Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.'
  },
  {
    question: 'How does billing work?',
    answer: 'Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.'
  }
]

const jobStore = useJobStore();
const { jobListings } = storeToRefs(jobStore);

const route = useRoute();

const selectedJobDetail = computed(() => {
  return jobListings.value.filter((job :Job) => job.job_slug === route.params.id)[0] as Job
})

const mapOptions = computed(() => {
  const lat = selectedJobDetail?.value?.geo_location?.[0] ?? 0;
  const lng = selectedJobDetail?.value?.geo_location?.[1] ?? 0;
  center.value = { lat, lng }
  return [
      {
        position: { lat, lng },
      }
    ]
})

onMounted(() => {
  initModals();
})

const showSignupModal = ref<boolean>(false)

function applyBtnAction() {
  showSignupModal.value = true
}

function redirectToURL() {
  window.open(selectedJobDetail.value.apply_url, '_target')
}
</script>

<template>
  <div>
    <section class="pt-8 pb-16">
      <div class="container">
        <div class="grid md:grid-cols-12 gap-8">
          <div class="md:col-span-9">
            <div class="flex md:justify-between mb-5">
              <div class="hidden md:flex items-center gap-3">
                <NuxtLink to="/jobs">Jobs</NuxtLink>
                <SvgoChevronRight class="w-4 h-4 text-gray-300" />
                <span class="text-brand-700 font-medium">Polymath</span>
              </div>
              <NuxtLink to="/jobs" class="flex items-center gap-3 group text-brand-700 font-medium cursor-pointer">
                <SvgoArrowLeft class="w-4 h-4 group-hover:-translate-x-[8px] transition" />
                Back
              </NuxtLink>
            </div>

            <div class="mb-8 h-[140px] md:h-[240px] max-md:-mx-5">
              <img src="/images/others/job-main.jpg" alt="" class="w-full mx-auto h-full object-cover"/>
            </div>
            <div class="job-details md:px-8">
              <div class="job-logo-and-title -mt-20 md:-mt-14 mb-8">
                <div class="flex max-md:flex-col items-start md:justify-between md:items-end gap-4">
                  <div class="flex max-md:flex-col md:items-end gap-6">
                    <div class="w-24 h-24 shrink-0 bg-white rounded-[10px] shadow-lg p-1">
                      <div class="border border-gray-200 rounded-[10px] overflow-hidden">
                        <img src="/images/logos/logo-one.jpg" alt="">
                      </div>
                    </div>

                    <div>
                      <h2 class="text-3xl text-ellipsis line-clamp-1">
                        {{ selectedJobDetail.job_title }}
                        Lead Product Designer
                      </h2>
                      <p class="text-gray-600">
                        {{ selectedJobDetail.organization_type }}
                      </p>
                    </div>
                  </div>

                  <div class="flex gap-3 text-gray-700">
                    <div
                        class="flex items-center cursor-pointer gap-1 py-2.5 px-3 text-sm border border-[#D0D5DD] rounded-lg hover:bg-brand-600 hover:text-white hover:border-primary">
                      <span>
                        <SvgoDotsHorizontal class="w-6 h-6" />
                      </span>
                    </div>

                    <div
                        class="flex items-center cursor-pointer gap-1 py-2.5 px-3 text-sm border border-[#D0D5DD] rounded-lg hover:bg-brand-600 hover:text-white hover:border-primary">
                      <span>
                        <SvgoDownload class="w-6 h-6" />
                      </span>
                    </div>

                    <div
                        class="flex items-center cursor-pointer gap-1 py-2.5 px-3 text-sm border border-[#D0D5DD] rounded-lg hover:bg-brand-600 hover:text-white hover:border-primary">
                      <span>
                        <SvgoBookmark class="w-6 h-6" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <h3 class="section-heading">Insights</h3>
              <hr>
              <div class="details grid grid-cols-2 md:grid-cols-3 gap-6">
                <div>
                  <p class="font-medium text-sm">Location</p>
                  <div class="text-gray-600">
                    {{ selectedJobDetail.job_location }}
                  </div>
                </div>

                <div>
                  <p class="font-medium text-sm">Pay Range</p>
                  <div class="text-gray-600 flex items-center gap-2">
                    <SvgoCurrencyDollar class="w-4 h-4"/>
                    N/A
                  </div>
                </div>

                <div>
                  <p class="font-medium text-sm">Employment type</p>
                  <div class="text-gray-600 flex items-center gap-2">
                    <SvgoClock class="w-4 h-4"/>
                    {{ selectedJobDetail.employment_type }}
                  </div>
                </div>

                <div>
                  <p class="font-medium text-sm">Deadline</p>
                  <div class="text-gray-600 flex items-center gap-2">
                    <SvgoClock class="w-4 h-4"/>
                    {{ selectedJobDetail.date_posting_expires }}
                  </div>
                </div>

                <div>
                  <p class="font-medium text-sm">Job role</p>
                  <div class="text-gray-600 flex items-center gap-2">
                    <SvgoClock class="w-4 h-4"/>
                    {{ selectedJobDetail.job_role }}
                  </div>
                </div>

                <div>
                  <p class="font-medium text-sm">Length of Work Year</p>
                  <div class="text-gray-600 flex items-center gap-2">
                    <SvgoClock class="w-4 h-4"/>
                    N/A
                  </div>
                </div>
              </div>

              <hr/>
              <div class="job-content">
                <div v-html="selectedJobDetail.job_description"></div>


<!--                <h3 class="section-heading">Job Description</h3>-->
<!--                <hr>-->

<!--                <h4 class="pb-2">Overview</h4>-->
<!--                <p class="pb-3">With a presence in more than 60 countries, we’re a growing global organization that-->
<!--                  helps-->
<!--                  amazing companies engage with customers through mobile messaging, email, voice and video.</p>-->
<!--                <p>We are looking for a Senior Product Designer to who can lead a team, posses management and creativity-->
<!--                  skills.</p>-->

<!--                <h4 class="pt-5 pb-2">Requirements</h4>-->
<!--                <ul class="list-disc ml-6">-->
<!--                  <li>Be heavily involved in turning user stories into testable, maintainable and high-quality code.-->
<!--                    This-->
<!--                    is a hands-on code design and coding role!-->
<!--                  </li>-->
<!--                  <li>Be a valued member of an autonomous, cross-functional team delivering our messaging experience to-->
<!--                    businesses around the world-->
<!--                  </li>-->
<!--                  <li>Promote and share knowledge for improvement of methodologies and best practices</li>-->
<!--                </ul>-->

<!--                <h4 class="pt-5 pb-2">Skills and Expertise</h4>-->
<!--                <ul class="list-disc ml-6">-->
<!--                  <li>You have at least 3 years of experience working as a Product Designer.</li>-->
<!--                  <li>You have experience using Sketch and InVision or Framer X</li>-->
<!--                </ul>-->
              </div>

              <hr>

              <h3 class="section-heading">FAQs</h3>

              <hr>

              <div class="flex flex-col gap-4">
                <template v-for="faq in faqList">
                  <AccordionCollapse :item="faq" />
                </template>
              </div>
              <hr>

              <div class="hidden md:flex justify-between">
                <BaseButton color="gray" :outline="true" label="Previous Job" />
                <BaseButton label="Next Job" />
              </div>

              <div>

              </div>
            </div>
          </div>
          <div class="md:col-span-3">
            <div class="flex flex-col gap-4">
              <div class="w-full bg-white border border-[#EAECF0] rounded-2xl p-4">
                <div
                    class="flex items-center justify-center border border-[#EAECF0] bg-gray-100 rounded-full w-12 h-12 mb-5">
                  <SvgoAnnouncement class="w-6 h-6 text-gray-600"/>
                </div>
                <h2 class="mb-2">Interested in this job?</h2>
                <p class="text-gray-600 text-sm mb-3">Don’t miss the chance. Apply now here.</p>
                <p class="text-gray-600 text-sm mb-5">Job code: EXMPL123</p>
                <BaseButton @click="applyBtnAction" label="Apply Now" :full-sized="true" />
              </div>

              <div class="w-full bg-white border border-[#EAECF0] rounded-2xl p-4">
                <h2 class="mb-2">Benefits</h2>
                <p class="text-gray-600 text-sm mb-3">
                  Following benefits are offered along wih basic salary package
                </p>

                <ul class="flex flex-col gap-4 text-sm text-gray-600">
                  <li class="flex gap-2">
                    <svg class="shrink-0" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 28 28" fill="none">
                      <rect width="28" height="28" rx="14" fill="#C2D4FD"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M19.9476 8.62193L11.5943 16.6836L9.37763 14.3153C8.9693 13.9303 8.32763 13.9069 7.86096 14.2336C7.40596 14.5719 7.27763 15.1669 7.55763 15.6453L10.1826 19.9153C10.4393 20.3119 10.8826 20.5569 11.3843 20.5569C11.8626 20.5569 12.3176 20.3119 12.5743 19.9153C12.9943 19.3669 21.0093 9.81193 21.0093 9.81193C22.0593 8.7386 20.7876 7.7936 19.9476 8.61027V8.62193Z" fill="#3669E4"/>
                    </svg>

                    <div>
                      <span class="font-medium text-base text-gray-700">Health benefits</span>
                      <p class="text-sm">Following benefits are offered along wih basic salary package</p>
                    </div>
                  </li>

                  <li class="flex gap-2">
                    <svg class="shrink-0" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 28 28" fill="none">
                      <rect width="28" height="28" rx="14" fill="#C2D4FD"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M19.9476 8.62193L11.5943 16.6836L9.37763 14.3153C8.9693 13.9303 8.32763 13.9069 7.86096 14.2336C7.40596 14.5719 7.27763 15.1669 7.55763 15.6453L10.1826 19.9153C10.4393 20.3119 10.8826 20.5569 11.3843 20.5569C11.8626 20.5569 12.3176 20.3119 12.5743 19.9153C12.9943 19.3669 21.0093 9.81193 21.0093 9.81193C22.0593 8.7386 20.7876 7.7936 19.9476 8.61027V8.62193Z" fill="#3669E4"/>
                    </svg>

                    <div>
                      <span class="font-medium text-base text-gray-700">Dental Benefit</span>
                      <p class="text-sm">Following benefits are offered along wih basic salary package</p>
                    </div>
                  </li>

                  <li class="flex gap-2">
                    <svg class="shrink-0" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 28 28" fill="none">
                      <rect width="28" height="28" rx="14" fill="#C2D4FD"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M19.9476 8.62193L11.5943 16.6836L9.37763 14.3153C8.9693 13.9303 8.32763 13.9069 7.86096 14.2336C7.40596 14.5719 7.27763 15.1669 7.55763 15.6453L10.1826 19.9153C10.4393 20.3119 10.8826 20.5569 11.3843 20.5569C11.8626 20.5569 12.3176 20.3119 12.5743 19.9153C12.9943 19.3669 21.0093 9.81193 21.0093 9.81193C22.0593 8.7386 20.7876 7.7936 19.9476 8.61027V8.62193Z" fill="#3669E4"/>
                    </svg>

                    <div>
                      <span class="font-medium text-base text-gray-700">Gym membership</span>
                      <p class="text-sm">Following benefits are offered along wih basic salary package</p>
                    </div>
                  </li>
                </ul>

              </div>

              <div class="w-full bg-white border border-[#EAECF0] rounded-2xl p-4">
                <h2 class="mb-2">Pin location</h2>
                <p class="text-gray-600 text-sm mb-5">Find on map where this job is located</p>

                <div>
                  <client-only>
                    <GMapMap
                        :center="center"
                        :zoom="12"
                        style="height: 500px;"
                    >
                      <GMapMarker
                          v-for="(m, index) in mapOptions"
                          :position="m.position"
                          :key="index"
                          :clickable="true"
                          :draggable="true"
                      />
                    </GMapMap>
                  </client-only>
                </div>
              </div>

              <div class="w-full bg-white border border-[#EAECF0] rounded-2xl p-4">
                <h2 class="mb-2">Published on</h2>
                <p class="text-gray-600 text-sm mb-5">{{ selectedJobDetail.date_posted }}</p>

                <h2 class="mb-5">Share this job</h2>
                <div class="flex gap-6">
                  <SvgoTwitterX class="w-6 h-6" />
                  <SvgoInstagram class="w-6 h-6" />
                  <SvgoFacebook class="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr class="md:hidden">
        <div class="flex md:hidden justify-between">
          <BaseButton color="gray" :outline="true" label="Previous Job" />
          <BaseButton label="Next Job" />
        </div>
        <hr>
      </div>
    </section>

    <JobCTA />

    <QuickSignUpModal v-model="showSignupModal" @proceed="redirectToURL" />
  </div>
</template>

<style scoped lang="postcss">
hr{
  @apply border-t border-gray-200 my-5
}

.section-heading{
  @apply text-lg
}
.job-content :deep(ul) {
  @apply list-disc ml-6 mb-4
}
.job-content :deep(p) {
  @apply mb-2
}
</style>
