<script setup lang="ts">
import CheckMarkIcon from 'assets/icons/check-mark.svg'
import ChatsIcon from 'assets/icons/chats.svg'
import FlashIcon from 'assets/icons/flash.svg'
import ReportIcon from 'assets/icons/report.svg'
import HappyFaceIcon from 'assets/icons/happy-face.svg'
import ToolIcon from 'assets/icons/tool.svg'
import PositiveFeedbackIcon from 'assets/icons/positive-feedback.svg'

const billingType = ref(0)

const pricingOffers = [
  {
    monthlyBilling: 10,
    yearlyBilling: 110,
    type: 'basic',
    benefits: [
        'Access to all basic features',
        'Basic reporting and analytics',
        'Up to 10 individual users',
        '20GB individual data each user',
        'Basic chat and email support'
    ]
  },
  {
    monthlyBilling: 20,
    yearlyBilling: 220,
    type: 'business',
    benefits: [
      '200+ integrations',
      'Advanced reporting and analytics',
      'Up to 20 individual users',
      '40GB individual data each user',
      'Priority chat and email support'
    ]
  },
  {
    monthlyBilling: 40,
    yearlyBilling: 450,
    type: 'enterprise',
    benefits: [
      'Advanced custom fields',
      'Audit log and data history',
      'Unlimited individual users',
      'Unlimited individual data',
      'Personalised chat and email support'
    ]
  }
]

const features = [
  {
    icon: ChatsIcon,
    title: 'Share team inboxes',
    description: 'Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.'
  },
  {
    icon: FlashIcon,
    title: 'Deliver instant answers',
    description: 'An all-in-one customer service platform that helps you balance everything your customers need to be happy.'
  },
  {
    icon: ReportIcon,
    title: 'Manage your team with reports',
    description: 'Measure what matters with Untitled’s easy-to-use reports. You can filter, export, and drilldown on the data in a couple clicks.'
  },
  {
    icon: HappyFaceIcon,
    title: 'Connect with customers',
    description: 'Solve a problem or close a sale in real-time with chat. If no one is available, customers are seamlessly routed to email without confusion.'
  },
  {
    icon: ToolIcon,
    title: 'Connect the tools you already use',
    description: 'Explore 100+ integrations that make your day-to-day workflow more efficient and familiar. Plus, our extensive developer tools.'
  },
  {
    icon: PositiveFeedbackIcon,
    title: 'Our people make the difference',
    description: 'We’re an extension of your customer service team, and all of our resources are free. Chat to our friendly team 24/7 when you need help.'
  }
]

const faqs = [
  {
    question: 'Is there a free trial available?',
    answer: 'Yes, you can try us for free for 30 days. If you want, we\'ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.'
  },
  {
    question: 'Can I change my plan later?',
    answer: 'Of course. Our pricing scales with your company. Chat to our friendly team to find a solution that works for you.'
  },
  {
    question: 'What is your cancellation policy?',
    answer: 'We understand that things change. You can cancel your plan at any time and we\'ll refund you the difference already paid.'
  },
  {
    question: 'Can other info be added to an invoice?',
    answer: 'Yes, you can try us for free for 30 days. If you want, we\'ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.'
  },
  {
    question: 'How does billing work?',
    answer: 'Plans are per workspace, not per account. You can upgrade one workspace, and still have any number of free workspaces.'
  },
  {
    question: 'How do I change my account email?',
    answer: 'You can change the email address associated with your account by going to untitled.com/account from a laptop or desktop.'
  },
]
</script>

<template>
  <div>
    <section class="py-16 md:py-24">
      <div class="container md:px-8">
        <h3 class="text-brand-600 text-sm md:text-base mb-3">Pricing</h3>
        <h2 class="text-4xl md:text-5xl mb-6">Simple, transparent pricing</h2>
        <p class="md:text-xl font-normal">Cost-effective plans designed to meet the needs of school districts, colleges, and other educational organizations.</p>
      </div>
    </section>
    <section class="pb-16 md:pb-24">
      <div class="container md:px-8">
        <div class="text-center mb-10">
          <ul class="filters inline-flex items-center gap-2 bg-white-dark border border-white-light rounded-md p-1.5">
            <li class="filter active">
              <button
                  type="button"
                  class="text-gray-900 px-3 py-2.5 rounded-md font-semibold"
                  :class="{ 'bg-white shadow-ring-offset shadow-ring shadow': billingType === 0 }"
                  @click="billingType = 0"
              >Monthly billing</button>
            </li>
            <li class="filter">
              <button
                  type="button"
                  class="text-gray-900 px-3 py-2.5 rounded-md font-semibold"
                  :class="{ 'bg-white shadow-ring-offset shadow-ring shadow': billingType === 1 }"
                  @click="billingType = 1"
              >Annual billing</button>
            </li>
          </ul>
        </div>
        <div class="projects-blocks projects">
          <div class="project" data-filter="monthly">
            <div class="grid lg:grid-cols-3 gap-4 lg:gap-8">
              <template v-for="(offer, index) in pricingOffers">
                <div class="bg-white rounded-2xl p-6 lg:p-8 shadow-[0_12px_16px_rgba(16,24,40,0.08)] border border-white-light relative">
                  <div v-if="index === 0" class="text-brand-600 text-sm inline-flex absolute -top-6 right-0 lg:-right-16">
                    <svg width="60" height="46" viewBox="0 0 60 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                          d="M9.22056 42.4487C9.06321 43.262 9.595 44.0489 10.4084 44.2063C11.2217 44.3636 12.0086 43.8318 12.166 43.0185L9.22056 42.4487ZM50.5841 3.79132C51.405 3.68035 51.9806 2.92487 51.8696 2.10391C51.7586 1.28295 51.0032 0.707389 50.1822 0.818364L50.5841 3.79132ZM4.78725 32.3309C4.36038 31.6209 3.43878 31.3914 2.7288 31.8183C2.01882 32.2452 1.78931 33.1668 2.21618 33.8768L4.78725 32.3309ZM8.9767 42.21L7.69117 42.9829L7.69189 42.9841L8.9767 42.21ZM12.5932 43.2607L11.9803 41.8917L11.979 41.8922L12.5932 43.2607ZM23.5123 40.0157C24.2684 39.6772 24.6069 38.7898 24.2684 38.0337C23.9299 37.2776 23.0425 36.939 22.2864 37.2776L23.5123 40.0157ZM10.6933 42.7336C12.166 43.0185 12.1659 43.0188 12.1658 43.0191C12.1658 43.0191 12.1658 43.0193 12.1658 43.0193C12.1658 43.0193 12.1658 43.019 12.166 43.0185C12.1662 43.0174 12.1666 43.0153 12.1672 43.0122C12.1684 43.0059 12.1705 42.9954 12.1735 42.9809C12.1794 42.9518 12.1887 42.9065 12.2016 42.8457C12.2274 42.7241 12.2676 42.5405 12.3233 42.3009C12.4349 41.8218 12.6088 41.1194 12.8551 40.2422C13.3481 38.4864 14.1291 36.0372 15.2773 33.2783C17.5833 27.7376 21.3236 21.0616 27.0838 16.2003L25.1489 13.9077C18.8763 19.2014 14.905 26.3652 12.5076 32.1256C11.3042 35.0172 10.4856 37.5838 9.96684 39.4312C9.7073 40.3556 9.52235 41.1017 9.40152 41.6205C9.34109 41.88 9.29667 42.0828 9.26695 42.2229C9.25209 42.2929 9.24091 42.3472 9.23323 42.3851C9.22939 42.404 9.22643 42.4189 9.22432 42.4295C9.22327 42.4348 9.22243 42.4391 9.22181 42.4423C9.22149 42.4439 9.22123 42.4452 9.22103 42.4463C9.22092 42.4468 9.22081 42.4474 9.22075 42.4477C9.22065 42.4482 9.22056 42.4487 10.6933 42.7336ZM27.0838 16.2003C38.8964 6.23119 48.2848 4.10213 50.5841 3.79132L50.1822 0.818364C47.3237 1.20477 37.402 3.56674 25.1489 13.9077L27.0838 16.2003ZM2.21618 33.8768L7.69117 42.9829L10.2622 41.437L4.78725 32.3309L2.21618 33.8768ZM7.69189 42.9841C8.83415 44.8799 11.2204 45.521 13.2074 44.6292L11.979 41.8922C11.2779 42.2069 10.5661 41.9414 10.2615 41.4358L7.69189 42.9841ZM13.2061 44.6298L23.5123 40.0157L22.2864 37.2776L11.9803 41.8917L13.2061 44.6298Z"
                          fill="currentColor"
                      />
                    </svg>
                    <span class="relative -top-2">Most popular!</span>
                  </div>
                  <div class="text-center">
                    <h3 class="text-4xl md:text-5xl mb-4">${{ billingType === 0 ? offer.monthlyBilling : offer.yearlyBilling }}/mth</h3>
                    <h4 class="capitalize text-xl mb-1">{{ offer.type }} plan</h4>
                    <p class="font-normal">Billed {{ billingType === 0 ? 'monthly' : 'annually' }}.</p>
                  </div>
                  <ul class="font-normal flex flex-col gap-4 mt-8 mb-10">
                    <template v-for="benefit in offer.benefits">
                      <li class="flex items-center gap-3 text-sm">
                        <span class="shrink-0">
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z" fill="#DCFAE6" />
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M17.0964 7.39016L9.93638 14.3002L8.03638 12.2702C7.68638 11.9402 7.13638 11.9202 6.73638 12.2002C6.34638 12.4902 6.23638 13.0002 6.47638 13.4102L8.72638 17.0702C8.94638 17.4102 9.32638 17.6202 9.75638 17.6202C10.1664 17.6202 10.5564 17.4102 10.7764 17.0702C11.1364 16.6002 18.0064 8.41016 18.0064 8.41016C18.9064 7.49016 17.8164 6.68016 17.0964 7.38016V7.39016Z"
                                fill="#079455"
                            />
                        </svg>
                        </span>
                        {{ benefit }}
                      </li>
                    </template>
                  </ul>
                  <ul class="flex flex-col gap-3">
                    <BaseButton label="Get started" :full-sized="true" />
                    <BaseButton label="Contact to sales" color="gray" :outline="true" :full-sized="true" />
                  </ul>
                </div>
              </template>
            </div>
          </div>
          <div class="project hidden" data-filter="annual">
            <div class="grid lg:grid-cols-3 gap-4 lg:gap-8">
              <div class="bg-white rounded-2xl p-6 lg:p-8 shadow-[0_12px_16px_rgba(16,24,40,0.08)] border border-white-light relative">
                <div class="text-primary text-sm inline-flex absolute -top-6 right-0 lg:-right-16">
                  <svg width="60" height="46" viewBox="0 0 60 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M9.22056 42.4487C9.06321 43.262 9.595 44.0489 10.4084 44.2063C11.2217 44.3636 12.0086 43.8318 12.166 43.0185L9.22056 42.4487ZM50.5841 3.79132C51.405 3.68035 51.9806 2.92487 51.8696 2.10391C51.7586 1.28295 51.0032 0.707389 50.1822 0.818364L50.5841 3.79132ZM4.78725 32.3309C4.36038 31.6209 3.43878 31.3914 2.7288 31.8183C2.01882 32.2452 1.78931 33.1668 2.21618 33.8768L4.78725 32.3309ZM8.9767 42.21L7.69117 42.9829L7.69189 42.9841L8.9767 42.21ZM12.5932 43.2607L11.9803 41.8917L11.979 41.8922L12.5932 43.2607ZM23.5123 40.0157C24.2684 39.6772 24.6069 38.7898 24.2684 38.0337C23.9299 37.2776 23.0425 36.939 22.2864 37.2776L23.5123 40.0157ZM10.6933 42.7336C12.166 43.0185 12.1659 43.0188 12.1658 43.0191C12.1658 43.0191 12.1658 43.0193 12.1658 43.0193C12.1658 43.0193 12.1658 43.019 12.166 43.0185C12.1662 43.0174 12.1666 43.0153 12.1672 43.0122C12.1684 43.0059 12.1705 42.9954 12.1735 42.9809C12.1794 42.9518 12.1887 42.9065 12.2016 42.8457C12.2274 42.7241 12.2676 42.5405 12.3233 42.3009C12.4349 41.8218 12.6088 41.1194 12.8551 40.2422C13.3481 38.4864 14.1291 36.0372 15.2773 33.2783C17.5833 27.7376 21.3236 21.0616 27.0838 16.2003L25.1489 13.9077C18.8763 19.2014 14.905 26.3652 12.5076 32.1256C11.3042 35.0172 10.4856 37.5838 9.96684 39.4312C9.7073 40.3556 9.52235 41.1017 9.40152 41.6205C9.34109 41.88 9.29667 42.0828 9.26695 42.2229C9.25209 42.2929 9.24091 42.3472 9.23323 42.3851C9.22939 42.404 9.22643 42.4189 9.22432 42.4295C9.22327 42.4348 9.22243 42.4391 9.22181 42.4423C9.22149 42.4439 9.22123 42.4452 9.22103 42.4463C9.22092 42.4468 9.22081 42.4474 9.22075 42.4477C9.22065 42.4482 9.22056 42.4487 10.6933 42.7336ZM27.0838 16.2003C38.8964 6.23119 48.2848 4.10213 50.5841 3.79132L50.1822 0.818364C47.3237 1.20477 37.402 3.56674 25.1489 13.9077L27.0838 16.2003ZM2.21618 33.8768L7.69117 42.9829L10.2622 41.437L4.78725 32.3309L2.21618 33.8768ZM7.69189 42.9841C8.83415 44.8799 11.2204 45.521 13.2074 44.6292L11.979 41.8922C11.2779 42.2069 10.5661 41.9414 10.2615 41.4358L7.69189 42.9841ZM13.2061 44.6298L23.5123 40.0157L22.2864 37.2776L11.9803 41.8917L13.2061 44.6298Z"
                        fill="#A6192E"
                    />
                  </svg>
                  <span class="relative -top-2">Most popular!</span>
                </div>
                <div class="text-center">
                  <h3 class="text-4xl md:text-5xl mb-4">$110/year</h3>
                  <h4 class="text-xl mb-1">Basic plan</h4>
                  <p class="font-normal">Billed annually.</p>
                </div>
                <ul class="font-normal flex flex-col gap-4 mt-8 mb-10">
                  <li class="flex gap-3">
                                          <span class="shrink-0">
                                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z" fill="#DCFAE6" />
                                                  <path
                                                      fill-rule="evenodd"
                                                      clip-rule="evenodd"
                                                      d="M17.0964 7.39016L9.93638 14.3002L8.03638 12.2702C7.68638 11.9402 7.13638 11.9202 6.73638 12.2002C6.34638 12.4902 6.23638 13.0002 6.47638 13.4102L8.72638 17.0702C8.94638 17.4102 9.32638 17.6202 9.75638 17.6202C10.1664 17.6202 10.5564 17.4102 10.7764 17.0702C11.1364 16.6002 18.0064 8.41016 18.0064 8.41016C18.9064 7.49016 17.8164 6.68016 17.0964 7.38016V7.39016Z"
                                                      fill="#079455"
                                                  />
                                              </svg>
                                          </span>
                    Access to all basic features
                  </li>
                  <li class="flex gap-3">
                                          <span class="shrink-0">
                                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z" fill="#DCFAE6" />
                                                  <path
                                                      fill-rule="evenodd"
                                                      clip-rule="evenodd"
                                                      d="M17.0964 7.39016L9.93638 14.3002L8.03638 12.2702C7.68638 11.9402 7.13638 11.9202 6.73638 12.2002C6.34638 12.4902 6.23638 13.0002 6.47638 13.4102L8.72638 17.0702C8.94638 17.4102 9.32638 17.6202 9.75638 17.6202C10.1664 17.6202 10.5564 17.4102 10.7764 17.0702C11.1364 16.6002 18.0064 8.41016 18.0064 8.41016C18.9064 7.49016 17.8164 6.68016 17.0964 7.38016V7.39016Z"
                                                      fill="#079455"
                                                  />
                                              </svg>
                                          </span>
                    Basic reporting and analytics
                  </li>
                  <li class="flex gap-3">
                                          <span class="shrink-0">
                                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z" fill="#DCFAE6" />
                                                  <path
                                                      fill-rule="evenodd"
                                                      clip-rule="evenodd"
                                                      d="M17.0964 7.39016L9.93638 14.3002L8.03638 12.2702C7.68638 11.9402 7.13638 11.9202 6.73638 12.2002C6.34638 12.4902 6.23638 13.0002 6.47638 13.4102L8.72638 17.0702C8.94638 17.4102 9.32638 17.6202 9.75638 17.6202C10.1664 17.6202 10.5564 17.4102 10.7764 17.0702C11.1364 16.6002 18.0064 8.41016 18.0064 8.41016C18.9064 7.49016 17.8164 6.68016 17.0964 7.38016V7.39016Z"
                                                      fill="#079455"
                                                  />
                                              </svg>
                                          </span>
                    Up to 10 individual users
                  </li>
                  <li class="flex gap-3">
                                          <span class="shrink-0">
                                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z" fill="#DCFAE6" />
                                                  <path
                                                      fill-rule="evenodd"
                                                      clip-rule="evenodd"
                                                      d="M17.0964 7.39016L9.93638 14.3002L8.03638 12.2702C7.68638 11.9402 7.13638 11.9202 6.73638 12.2002C6.34638 12.4902 6.23638 13.0002 6.47638 13.4102L8.72638 17.0702C8.94638 17.4102 9.32638 17.6202 9.75638 17.6202C10.1664 17.6202 10.5564 17.4102 10.7764 17.0702C11.1364 16.6002 18.0064 8.41016 18.0064 8.41016C18.9064 7.49016 17.8164 6.68016 17.0964 7.38016V7.39016Z"
                                                      fill="#079455"
                                                  />
                                              </svg>
                                          </span>
                    20GB individual data each user
                  </li>
                  <li class="flex gap-3">
                                          <span class="shrink-0">
                                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z" fill="#DCFAE6" />
                                                  <path
                                                      fill-rule="evenodd"
                                                      clip-rule="evenodd"
                                                      d="M17.0964 7.39016L9.93638 14.3002L8.03638 12.2702C7.68638 11.9402 7.13638 11.9202 6.73638 12.2002C6.34638 12.4902 6.23638 13.0002 6.47638 13.4102L8.72638 17.0702C8.94638 17.4102 9.32638 17.6202 9.75638 17.6202C10.1664 17.6202 10.5564 17.4102 10.7764 17.0702C11.1364 16.6002 18.0064 8.41016 18.0064 8.41016C18.9064 7.49016 17.8164 6.68016 17.0964 7.38016V7.39016Z"
                                                      fill="#079455"
                                                  />
                                              </svg>
                                          </span>
                    Basic chat and email support
                  </li>
                </ul>
                <ul class="flex flex-col gap-3">
                  <li><a href="#" class="btn w-full">Get started</a></li>
                  <li><a href="#" class="btn bg-transparent text-[#344054] hover:text-white w-full border border-[#D0D5DD]">Contact to sales</a></li>
                </ul>
              </div>
              <div class="bg-white rounded-2xl p-6 lg:p-8 shadow-[0_12px_16px_rgba(16,24,40,0.08)] border border-white-light relative">
                <div class="text-center">
                  <h3 class="text-4xl md:text-5xl mb-4">$220/year</h3>
                  <h4 class="text-xl mb-1">Business plan</h4>
                  <p class="font-normal">Billed annually.</p>
                </div>
                <ul class="font-normal flex flex-col gap-4 mt-8 mb-10">
                  <li class="flex gap-3">
                                          <span class="shrink-0">
                                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z" fill="#DCFAE6" />
                                                  <path
                                                      fill-rule="evenodd"
                                                      clip-rule="evenodd"
                                                      d="M17.0964 7.39016L9.93638 14.3002L8.03638 12.2702C7.68638 11.9402 7.13638 11.9202 6.73638 12.2002C6.34638 12.4902 6.23638 13.0002 6.47638 13.4102L8.72638 17.0702C8.94638 17.4102 9.32638 17.6202 9.75638 17.6202C10.1664 17.6202 10.5564 17.4102 10.7764 17.0702C11.1364 16.6002 18.0064 8.41016 18.0064 8.41016C18.9064 7.49016 17.8164 6.68016 17.0964 7.38016V7.39016Z"
                                                      fill="#079455"
                                                  />
                                              </svg>
                                          </span>
                    200+ integrations
                  </li>
                  <li class="flex gap-3">
                                          <span class="shrink-0">
                                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z" fill="#DCFAE6" />
                                                  <path
                                                      fill-rule="evenodd"
                                                      clip-rule="evenodd"
                                                      d="M17.0964 7.39016L9.93638 14.3002L8.03638 12.2702C7.68638 11.9402 7.13638 11.9202 6.73638 12.2002C6.34638 12.4902 6.23638 13.0002 6.47638 13.4102L8.72638 17.0702C8.94638 17.4102 9.32638 17.6202 9.75638 17.6202C10.1664 17.6202 10.5564 17.4102 10.7764 17.0702C11.1364 16.6002 18.0064 8.41016 18.0064 8.41016C18.9064 7.49016 17.8164 6.68016 17.0964 7.38016V7.39016Z"
                                                      fill="#079455"
                                                  />
                                              </svg>
                                          </span>
                    Advanced reporting and analytics
                  </li>
                  <li class="flex gap-3">
                                          <span class="shrink-0">
                                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z" fill="#DCFAE6" />
                                                  <path
                                                      fill-rule="evenodd"
                                                      clip-rule="evenodd"
                                                      d="M17.0964 7.39016L9.93638 14.3002L8.03638 12.2702C7.68638 11.9402 7.13638 11.9202 6.73638 12.2002C6.34638 12.4902 6.23638 13.0002 6.47638 13.4102L8.72638 17.0702C8.94638 17.4102 9.32638 17.6202 9.75638 17.6202C10.1664 17.6202 10.5564 17.4102 10.7764 17.0702C11.1364 16.6002 18.0064 8.41016 18.0064 8.41016C18.9064 7.49016 17.8164 6.68016 17.0964 7.38016V7.39016Z"
                                                      fill="#079455"
                                                  />
                                              </svg>
                                          </span>
                    Up to 20 individual users
                  </li>
                  <li class="flex gap-3">
                                          <span class="shrink-0">
                                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z" fill="#DCFAE6" />
                                                  <path
                                                      fill-rule="evenodd"
                                                      clip-rule="evenodd"
                                                      d="M17.0964 7.39016L9.93638 14.3002L8.03638 12.2702C7.68638 11.9402 7.13638 11.9202 6.73638 12.2002C6.34638 12.4902 6.23638 13.0002 6.47638 13.4102L8.72638 17.0702C8.94638 17.4102 9.32638 17.6202 9.75638 17.6202C10.1664 17.6202 10.5564 17.4102 10.7764 17.0702C11.1364 16.6002 18.0064 8.41016 18.0064 8.41016C18.9064 7.49016 17.8164 6.68016 17.0964 7.38016V7.39016Z"
                                                      fill="#079455"
                                                  />
                                              </svg>
                                          </span>
                    40GB individual data each user
                  </li>
                  <li class="flex gap-3">
                                          <span class="shrink-0">
                                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z" fill="#DCFAE6" />
                                                  <path
                                                      fill-rule="evenodd"
                                                      clip-rule="evenodd"
                                                      d="M17.0964 7.39016L9.93638 14.3002L8.03638 12.2702C7.68638 11.9402 7.13638 11.9202 6.73638 12.2002C6.34638 12.4902 6.23638 13.0002 6.47638 13.4102L8.72638 17.0702C8.94638 17.4102 9.32638 17.6202 9.75638 17.6202C10.1664 17.6202 10.5564 17.4102 10.7764 17.0702C11.1364 16.6002 18.0064 8.41016 18.0064 8.41016C18.9064 7.49016 17.8164 6.68016 17.0964 7.38016V7.39016Z"
                                                      fill="#079455"
                                                  />
                                              </svg>
                                          </span>
                    Priority chat and email support
                  </li>
                </ul>
                <ul class="flex flex-col gap-3">
                  <li><a href="#" class="btn w-full">Get started</a></li>
                  <li><a href="#" class="btn bg-transparent text-[#344054] hover:text-white w-full border border-[#D0D5DD]">Contact to sales</a></li>
                </ul>
              </div>
              <div class="bg-white rounded-2xl p-6 lg:p-8 shadow-[0_12px_16px_rgba(16,24,40,0.08)] border border-white-light relative">
                <div class="text-center">
                  <h3 class="text-4xl md:text-5xl mb-4">$450/year</h3>
                  <h4 class="text-xl mb-1">Enterprise plan</h4>
                  <p class="font-normal">Billed annually.</p>
                </div>
                <ul class="font-normal flex flex-col gap-4 mt-8 mb-10">
                  <li class="flex gap-3">
                                          <span class="shrink-0">
                                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z" fill="#DCFAE6" />
                                                  <path
                                                      fill-rule="evenodd"
                                                      clip-rule="evenodd"
                                                      d="M17.0964 7.39016L9.93638 14.3002L8.03638 12.2702C7.68638 11.9402 7.13638 11.9202 6.73638 12.2002C6.34638 12.4902 6.23638 13.0002 6.47638 13.4102L8.72638 17.0702C8.94638 17.4102 9.32638 17.6202 9.75638 17.6202C10.1664 17.6202 10.5564 17.4102 10.7764 17.0702C11.1364 16.6002 18.0064 8.41016 18.0064 8.41016C18.9064 7.49016 17.8164 6.68016 17.0964 7.38016V7.39016Z"
                                                      fill="#079455"
                                                  />
                                              </svg>
                                          </span>
                    Advanced custom fields
                  </li>
                  <li class="flex gap-3">
                                          <span class="shrink-0">
                                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z" fill="#DCFAE6" />
                                                  <path
                                                      fill-rule="evenodd"
                                                      clip-rule="evenodd"
                                                      d="M17.0964 7.39016L9.93638 14.3002L8.03638 12.2702C7.68638 11.9402 7.13638 11.9202 6.73638 12.2002C6.34638 12.4902 6.23638 13.0002 6.47638 13.4102L8.72638 17.0702C8.94638 17.4102 9.32638 17.6202 9.75638 17.6202C10.1664 17.6202 10.5564 17.4102 10.7764 17.0702C11.1364 16.6002 18.0064 8.41016 18.0064 8.41016C18.9064 7.49016 17.8164 6.68016 17.0964 7.38016V7.39016Z"
                                                      fill="#079455"
                                                  />
                                              </svg>
                                          </span>
                    Audit log and data history
                  </li>
                  <li class="flex gap-3">
                                          <span class="shrink-0">
                                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z" fill="#DCFAE6" />
                                                  <path
                                                      fill-rule="evenodd"
                                                      clip-rule="evenodd"
                                                      d="M17.0964 7.39016L9.93638 14.3002L8.03638 12.2702C7.68638 11.9402 7.13638 11.9202 6.73638 12.2002C6.34638 12.4902 6.23638 13.0002 6.47638 13.4102L8.72638 17.0702C8.94638 17.4102 9.32638 17.6202 9.75638 17.6202C10.1664 17.6202 10.5564 17.4102 10.7764 17.0702C11.1364 16.6002 18.0064 8.41016 18.0064 8.41016C18.9064 7.49016 17.8164 6.68016 17.0964 7.38016V7.39016Z"
                                                      fill="#079455"
                                                  />
                                              </svg>
                                          </span>
                    Unlimited individual users
                  </li>
                  <li class="flex gap-3">
                                          <span class="shrink-0">
                                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z" fill="#DCFAE6" />
                                                  <path
                                                      fill-rule="evenodd"
                                                      clip-rule="evenodd"
                                                      d="M17.0964 7.39016L9.93638 14.3002L8.03638 12.2702C7.68638 11.9402 7.13638 11.9202 6.73638 12.2002C6.34638 12.4902 6.23638 13.0002 6.47638 13.4102L8.72638 17.0702C8.94638 17.4102 9.32638 17.6202 9.75638 17.6202C10.1664 17.6202 10.5564 17.4102 10.7764 17.0702C11.1364 16.6002 18.0064 8.41016 18.0064 8.41016C18.9064 7.49016 17.8164 6.68016 17.0964 7.38016V7.39016Z"
                                                      fill="#079455"
                                                  />
                                              </svg>
                                          </span>
                    Unlimited individual data
                  </li>
                  <li class="flex gap-3">
                                          <span class="shrink-0">
                                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z" fill="#DCFAE6" />
                                                  <path
                                                      fill-rule="evenodd"
                                                      clip-rule="evenodd"
                                                      d="M17.0964 7.39016L9.93638 14.3002L8.03638 12.2702C7.68638 11.9402 7.13638 11.9202 6.73638 12.2002C6.34638 12.4902 6.23638 13.0002 6.47638 13.4102L8.72638 17.0702C8.94638 17.4102 9.32638 17.6202 9.75638 17.6202C10.1664 17.6202 10.5564 17.4102 10.7764 17.0702C11.1364 16.6002 18.0064 8.41016 18.0064 8.41016C18.9064 7.49016 17.8164 6.68016 17.0964 7.38016V7.39016Z"
                                                      fill="#079455"
                                                  />
                                              </svg>
                                          </span>
                    Personalised+priotity service
                  </li>
                </ul>
                <ul class="flex flex-col gap-3">
                  <li><a href="#" class="btn w-full">Get started</a></li>
                  <li><a href="#" class="btn bg-transparent text-[#344054] hover:text-white w-full border border-[#D0D5DD]">Contact to sales</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="bg-white-dark py-16 md:py-24">
      <div class="container md:px-8">
        <div class="w-full max-w-3xl mb-16">
          <h3 class="text-brand-600 text-sm md:text-base mb-3">Features</h3>
          <h2 class="text-3xl md:text-4xl mb-6">Beautiful analytics to grow smarter</h2>
          <p class="md:text-xl font-normal">Powerful, self-serve product and growth analytics to help you convert, engage, and retain more users. Trusted by over 4,000 startups.</p>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-10 sm:gap-y-16">
          <template v-for="feature in features">
            <div class="flex flex-col gap-5">
              <div class="border border-white-light w-12 h-12 flex items-center justify-center text-[#344054] rounded-[10px]">
                <component :is="feature.icon" class="w-8 h-8"/>
              </div>
              <div class="">
                <h3 class="text-xl mb-2">{{ feature.title }}</h3>
                <p class="font-normal">{{ feature.description }}</p>
              </div>
              <div class="text-brand-600 inline-flex items-center gap-2.5 group font-semibold cursor-pointer">
                Learn more
                <SvgoArrowRight class="w-5 h-4 group-hover:translate-x-[8px] transition" />
              </div>
            </div>
          </template>
        </div>
      </div>
    </section>
    <section class="py-16 md:py-24">
      <div class="container md:px-8">
        <div class="w-full max-w-3xl mb-16">
          <h2 class="text-3xl md:text-4xl mb-5">FAQs</h2>
          <p class="font-normal">Everything you need to know about the product and billing. Can't find the answer you're looking for? Please chat to our friendly team.</p>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 sm:gap-y-16 mb-16">
          <template v-for="faq in faqs">
            <div class="faq-block">
              <h3 class="text-lg mb-2">{{ faq.question }}</h3>
              <p class="font-normal">{{ faq.answer }}</p>
            </div>
          </template>
        </div>
        <div class="bg-gray-50 rounded-2xl px-6 md:px-8 py-8 flex flex-col md:flex-row items-start justify-between gap-6">
          <div class="">
            <h4 class="text-xl mb-2">Still have questions?</h4>
            <p class="font-normal">Can't find the answer you're looking for? Please chat to our friendly team.</p>
          </div>
          <div class="shrink-0">
            <BaseButton label="Contact us"/>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
