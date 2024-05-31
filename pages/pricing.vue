<script setup lang="ts">
import CheckMarkIcon from 'assets/icons/check-mark.svg'
import ChatsIcon from 'assets/icons/chats.svg'
import FlashIcon from 'assets/icons/flash.svg'
import ReportIcon from 'assets/icons/report.svg'
import HappyFaceIcon from 'assets/icons/happy-face.svg'
import ToolIcon from 'assets/icons/tool.svg'
import PositiveFeedbackIcon from 'assets/icons/positive-feedback.svg'
import { faqs, features, pricingPlans } from "~/components/core/constants/pricing.constants";
import { useHomeStore } from "~/segments/home/store";

const homeStore = useHomeStore();
const { checkoutURL } = storeToRefs(homeStore);

const selectedSlot = ref<number>(10);

const getSelectedSlotDetails = computed(() => {
  return pricingPlans[2]?.slotsPricing.filter(slot => slot.totalSlots == selectedSlot.value)[0];
})

function getSlotPriceId() {
  redirectToStripe(getSelectedSlotDetails.value.priceId);
}

async function redirectToStripe(priceId :string) {
  const payload = {
    price_id: priceId,
    qty: 1
  }
  await homeStore.fetchStripeCheckoutURL(payload);
  if (checkoutURL.value) window.open(checkoutURL.value, '_blank');
}
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
        <div class="projects-blocks projects">
          <div class="project" data-filter="monthly">
            <div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-8">
              <template v-for="(offer, index) in pricingPlans">
                <div class="flex flex-col bg-white rounded-2xl p-6 lg:p-8 shadow-[0_12px_16px_rgba(16,24,40,0.08)] border border-white-light relative">
                  <div v-if="false" class="text-brand-600 text-sm inline-flex absolute -top-6 right-0 lg:-right-16">
                    <svg width="60" height="46" viewBox="0 0 60 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.22056 42.4487C9.06321 43.262 9.595 44.0489 10.4084 44.2063C11.2217 44.3636 12.0086 43.8318 12.166 43.0185L9.22056 42.4487ZM50.5841 3.79132C51.405 3.68035 51.9806 2.92487 51.8696 2.10391C51.7586 1.28295 51.0032 0.707389 50.1822 0.818364L50.5841 3.79132ZM4.78725 32.3309C4.36038 31.6209 3.43878 31.3914 2.7288 31.8183C2.01882 32.2452 1.78931 33.1668 2.21618 33.8768L4.78725 32.3309ZM8.9767 42.21L7.69117 42.9829L7.69189 42.9841L8.9767 42.21ZM12.5932 43.2607L11.9803 41.8917L11.979 41.8922L12.5932 43.2607ZM23.5123 40.0157C24.2684 39.6772 24.6069 38.7898 24.2684 38.0337C23.9299 37.2776 23.0425 36.939 22.2864 37.2776L23.5123 40.0157ZM10.6933 42.7336C12.166 43.0185 12.1659 43.0188 12.1658 43.0191C12.1658 43.0191 12.1658 43.0193 12.1658 43.0193C12.1658 43.0193 12.1658 43.019 12.166 43.0185C12.1662 43.0174 12.1666 43.0153 12.1672 43.0122C12.1684 43.0059 12.1705 42.9954 12.1735 42.9809C12.1794 42.9518 12.1887 42.9065 12.2016 42.8457C12.2274 42.7241 12.2676 42.5405 12.3233 42.3009C12.4349 41.8218 12.6088 41.1194 12.8551 40.2422C13.3481 38.4864 14.1291 36.0372 15.2773 33.2783C17.5833 27.7376 21.3236 21.0616 27.0838 16.2003L25.1489 13.9077C18.8763 19.2014 14.905 26.3652 12.5076 32.1256C11.3042 35.0172 10.4856 37.5838 9.96684 39.4312C9.7073 40.3556 9.52235 41.1017 9.40152 41.6205C9.34109 41.88 9.29667 42.0828 9.26695 42.2229C9.25209 42.2929 9.24091 42.3472 9.23323 42.3851C9.22939 42.404 9.22643 42.4189 9.22432 42.4295C9.22327 42.4348 9.22243 42.4391 9.22181 42.4423C9.22149 42.4439 9.22123 42.4452 9.22103 42.4463C9.22092 42.4468 9.22081 42.4474 9.22075 42.4477C9.22065 42.4482 9.22056 42.4487 10.6933 42.7336ZM27.0838 16.2003C38.8964 6.23119 48.2848 4.10213 50.5841 3.79132L50.1822 0.818364C47.3237 1.20477 37.402 3.56674 25.1489 13.9077L27.0838 16.2003ZM2.21618 33.8768L7.69117 42.9829L10.2622 41.437L4.78725 32.3309L2.21618 33.8768ZM7.69189 42.9841C8.83415 44.8799 11.2204 45.521 13.2074 44.6292L11.979 41.8922C11.2779 42.2069 10.5661 41.9414 10.2615 41.4358L7.69189 42.9841ZM13.2061 44.6298L23.5123 40.0157L22.2864 37.2776L11.9803 41.8917L13.2061 44.6298Z"
                          fill="currentColor"
                      />
                    </svg>
                    <span class="relative -top-2">Most popular!</span>
                  </div>
                  <div class="text-center">
                    <h4 class="capitalize text-xl mb-1">{{ offer.title }}</h4>
                    <h3 v-if="offer?.slotsPricing" class="text-4xl my-4">
                      Starting at {{ getSelectedSlotDetails.price }} for {{ selectedSlot }}
                    </h3>
                    <h3 v-else class="text-4xl my-4">{{ offer.priceText }}</h3>
                    <p v-if="offer.showSlotOptions" class="text-success-600">Saving {{ getSelectedSlotDetails.saving }}</p>
                  </div>
                  <ul class="font-normal flex flex-col gap-4 mt-8 mb-8">
                    <template v-for="benefit in offer.benefits">
                      <li class="flex items-center gap-3 text-sm">
                        <span class="shrink-0">
                          <SvgoGreenCheckMark class="w-5 h-5" />
                        </span>
                        {{ benefit }}
                      </li>
                    </template>
                  </ul>
                  <ul class="flex flex-col justify-end grow gap-3">
                    <div v-if="offer.showSlotOptions">
                      <label for="slotOptions" class="text-sm font-medium">Quantity:</label>
                      <SelectBox
                          v-model="selectedSlot"
                          :label-value-options="true"
                          label=""
                          name="slotOptions"
                          :data="offer?.slotsPricing?.map((slot) => ({ label: slot.totalSlots, value: slot.totalSlots }))"
                          subLabel=""
                      />
                    </div>
                    <template v-if="offer.showBuyBtn">
                      <BaseButton v-if="offer.id === 3" label="Buy Now" :full-sized="true" @click="getSlotPriceId"/>
                      <BaseButton v-else label="Buy Now" :full-sized="true" @click="redirectToStripe(offer.priceId)"/>
                    </template>
                    <BaseButton v-if="offer.showContactSalesBtn" label="Contact sales" color="gray" :outline="true" :full-sized="true" />
                  </ul>
                </div>
              </template>
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
