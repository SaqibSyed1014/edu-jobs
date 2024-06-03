<script setup lang="ts">
import {convertTZDateToShortDate} from "~/segments/utils";
import {usePostjobStore} from "~/segments/postjobs/store";

const props = defineProps<{
  formData: any
}>()

const postJobStore = usePostjobStore();
const { gradeLevelDropdown } = storeToRefs(postJobStore);

const emit = defineEmits(['editIconClicked', 'moveToPrevStep'])

const gradeLevelsLabels = computed(() => {
  return props.formData.stepTwo?.gradeLevel.map((value :any) => {
    const foundItem = gradeLevelDropdown.value.find(item => item.value === value);
    return foundItem ? foundItem.label : null;
  }).join(', ');
})
</script>

<template>
  <div class="w-full">
    <div class="mt-5 border-b border-gray-900/10 divide-y divide-gray-900/10 border-t pb-0">
      <div class="flex-col justify-start items-start inline-flex w-full gap-6 py-4 md:py-6">
        <h4 class="text-gray-900 text-base font-semibold leading-normal">
          Organization Information
        </h4>
        <div class="grid sm:grid-cols-2 gap-4 w-full">
          <div class="justify-start items-start gap-8 inline-flex">
            <div class="flex-col justify-start items-start gap-2 inline-flex">
              <div class="inline-flex items-center gap-1">
                <p class="text-gray-700 text-base font-semibold leading-normal">
                  Organization Name
                </p>
                <button
                  id="tooltipButton"
                  type="button"
                  @click="() => emit('editIconClicked', 0)"
                >
                  <BaseTooltip id="edit-icon-1" tooltip-content="Edit" position="right">
                    <SvgoEditPensil class="ml-0.5 h-4 text-gray-500 hover:text-brand-500 transition" />
                  </BaseTooltip>
                </button>
              </div>

              <p class="text-gray-600 text-base font-normal leading-normal">
                {{ formData.stepOne?.organizationName ? formData.stepOne.organizationName : "N/A" }}
              </p>
            </div>
          </div>
          <div class="justify-start items-start gap-8 inline-flex">
            <div
              class="flex-col justify-start items-start gap-2 inline-flex"
            >
              <div class="inline-flex items-center gap-1">
                <p class="text-gray-700 text-base font-semibold leading-normal">
                  Your work email address
                </p>
                <button
                  id="tooltipButton"
                  type="button"
                  @click="() => emit('editIconClicked', 0)"
                >
                  <BaseTooltip id="edit-icon-2" tooltip-content="Edit" position="right">
                    <SvgoEditPensil class="ml-0.5 h-4 text-gray-500 hover:text-brand-500 transition" />
                  </BaseTooltip>
                </button>
              </div>

              <p class="text-gray-600 text-base font-normal leading-normal">
                {{ formData.stepOne?.email ? formData.stepOne.email : "N/A" }}
              </p>
            </div>
          </div>
        </div>

        <div class="grid sm:grid-cols-2 gap-4 w-full">
          <div class="justify-start items-start gap-8 inline-flex">
            <div
              class="flex-col justify-start items-start gap-2 inline-flex"
            >
              <div class="inline-flex items-center gap-1">
                <p class="text-gray-700 text-base font-semibold leading-normal">
                  Your full name
                </p>
                <button
                  id="tooltipButton"
                  type="button"
                  @click="() => emit('editIconClicked', 0)"
                >
                  <BaseTooltip id="edit-icon-3" tooltip-content="Edit" position="right">
                    <SvgoEditPensil class="ml-0.5 h-4 text-gray-500 hover:text-brand-500 transition" />
                  </BaseTooltip>
                </button>
              </div>

              <p class="text-gray-600 text-base font-normal leading-normal">
                {{ formData.stepOne?.fullName ? formData.stepOne.fullName : "N/A" }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex-col justify-start items-start inline-flex w-full gap-6 py-4 md:py-6">
        <h4 class="text-gray-900 text-base font-semibold leading-normal">
          Job Details
        </h4>
        <div class="grid sm:grid-cols-2 gap-4 w-full">
          <div class="justify-start items-start gap-8 inline-flex">
            <div
              class="flex-col justify-start items-start gap-2 inline-flex"
            >
              <div class="inline-flex items-center gap-1">
                <p class="text-gray-700 text-base font-semibold leading-normal">
                  Job Title
                </p>
                <button
                  id="tooltipButton"
                  type="button"
                  @click="() => emit('editIconClicked', 1)"
                >
                  <BaseTooltip id="edit-icon-4" tooltip-content="Edit" position="right">
                    <SvgoEditPensil class="ml-0.5 h-4 text-gray-500 hover:text-brand-500 transition" />
                  </BaseTooltip>
                </button>
              </div>

              <p class="text-gray-600 text-base font-normal leading-normal">
                {{ formData.stepTwo?.jobTitle ? formData.stepTwo.jobTitle : "N/A" }}
              </p>
            </div>
          </div>
          <div class="justify-start items-start gap-8 inline-flex">
            <div
              class="flex-col justify-start items-start gap-2 inline-flex"
            >
              <div class="inline-flex items-center gap-1">
                <p class="text-gray-700 text-base font-semibold leading-normal">
                  Start Date
                </p>
                <button
                  id="tooltipButton"
                  type="button"
                  @click="() => emit('editIconClicked', 1)"
                >
                  <BaseTooltip id="edit-icon-5" tooltip-content="Edit" position="right">
                    <SvgoEditPensil class="ml-0.5 h-4 text-gray-500 hover:text-brand-500 transition" />
                  </BaseTooltip>
                </button>
              </div>

              <p class="text-gray-600 text-base font-normal leading-normal">
                {{ formData.stepTwo?.startDate ? convertTZDateToShortDate(formData.stepTwo.startDate) : "N/A" }}
              </p>
            </div>
          </div>
        </div>

        <div class="grid sm:grid-cols-2 gap-4 w-full">
          <div class="justify-start items-start gap-8 inline-flex">
            <div
              class="flex-col justify-start items-start gap-2 inline-flex"
            >
              <div class="inline-flex items-center gap-1">
                <p class="text-gray-700 text-base font-semibold leading-normal">
                  Employment Type
                </p>
                <button
                  id="tooltipButton"
                  type="button"
                  @click="() => emit('editIconClicked', 1)"
                >
                  <BaseTooltip id="edit-icon-6" tooltip-content="Edit" position="right">
                    <SvgoEditPensil class="ml-0.5 h-4 text-gray-500 hover:text-brand-500 transition" />
                  </BaseTooltip>
                </button>
              </div>

              <p class="text-gray-600 text-base font-normal leading-normal">
                {{ formData.stepTwo?.employmentTypeId ? formData.stepTwo?.employmentTypeId : "N/A" }}
              </p>
            </div>
          </div>

          <div class="justify-start items-start gap-8 inline-flex">
            <div
              class="flex-col justify-start items-start gap-2 inline-flex"
            >
              <div class="inline-flex items-center gap-1">
                <p class="text-gray-700 text-base font-semibold leading-normal">
                  Job Role
                </p>
                <button
                  id="tooltipButton"
                  type="button"
                  @click="() => emit('editIconClicked', 1)"
                >
                  <BaseTooltip id="edit-icon-7" tooltip-content="Edit" position="right">
                    <SvgoEditPensil class="ml-0.5 h-4 text-gray-500 hover:text-brand-500 transition" />
                  </BaseTooltip>
                </button>
              </div>

              <p class="text-gray-600 text-base font-normal leading-normal">
                {{ formData.stepTwo?.jobRole ? formData.stepTwo?.jobRole : "N/A" }}
              </p>
            </div>
          </div>
        </div>

        <div v-if="formData.stepTwo?.jobRole === 'Instructional'" class="grid sm:grid-cols-2 gap-4 w-full">
          <div class="justify-start items-start gap-8 inline-flex">
            <div class="flex-col justify-start items-start gap-2 inline-flex">
              <div class="inline-flex items-center gap-1">
                <p class="text-gray-700 text-base font-semibold leading-normal">
                  Grade Level(s)
                </p>
                <button
                  id="tooltipButton"
                  type="button"
                  @click="() => emit('editIconClicked', 1)"
                >
                  <BaseTooltip id="edit-icon-8" tooltip-content="Edit" position="right">
                    <SvgoEditPensil class="ml-0.5 h-4 text-gray-500 hover:text-brand-500 transition" />
                  </BaseTooltip>
                </button>
              </div>

              <p class="text-gray-600 text-base font-normal leading-normal">
                {{ formData.stepTwo?.gradeLevel.length ? gradeLevelsLabels : "N/A" }}
              </p>
            </div>
          </div>

          <div class="justify-start items-start gap-8 inline-flex">
            <div
              class="flex-col justify-start items-start gap-2 inline-flex"
            >
              <div class="inline-flex items-center gap-1">
                <p class="text-gray-700 text-base font-semibold leading-normal">
                  Subject Area(s)
                </p>
                <button
                  id="tooltipButton"
                  type="button"
                  @click="() => emit('editIconClicked', 1)"
                >
                  <BaseTooltip id="edit-icon-9" tooltip-content="Edit" position="right">
                    <SvgoEditPensil class="ml-0.5 h-4 text-gray-500 hover:text-brand-500 transition" />
                  </BaseTooltip>
                </button>
              </div>

              <p
                class="text-gray-600 text-base font-normal leading-normal"
              >
                {{ formData.stepTwo?.subjects ? formData.stepTwo?.subjects : "N/A" }}
              </p>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-4 w-full">
          <div class="justify-start items-start gap-8 inline-flex">
            <div class="flex-col justify-start items-start gap-2 inline-flex">
              <div class="inline-flex items-center gap-1">
                <p class="text-gray-700 text-base font-semibold leading-normal">
                  Job Description
                </p>
                <button
                  id="tooltipButton"
                  type="button"
                  @click="() => emit('editIconClicked', 1)"
                >
                  <BaseTooltip id="edit-icon-10" tooltip-content="Edit" position="right">
                    <SvgoEditPensil class="ml-0.5 h-4 text-gray-500 hover:text-brand-500 transition" />
                  </BaseTooltip>
                </button>
              </div>
              <p
                class="text-gray-600 text-base font-normal leading-normal"
                v-html="formData.stepTwo.jobDescription"
              ></p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex-col justify-start items-start inline-flex w-full gap-6 py-4 md:py-6">
        <h4 class="text-gray-900 text-base font-semibold leading-normal">
          Application Details
        </h4>
        <div class="grid sm:grid-cols-2 gap-4 w-full">
          <div class="justify-start items-start gap-8 inline-flex">
            <div
              class="flex-col justify-start items-start gap-2 inline-flex"
            >
              <div class="inline-flex items-center gap-1">
                <p
                  class="text-gray-700 text-base font-semibold leading-normal"
                >
                  Application method
                </p>
                <button
                  id="tooltipButton"
                  type="button"
                  @click="() => emit('editIconClicked', 2)"
                >
                  <BaseTooltip id="edit-icon-11" tooltip-content="Edit" position="right">
                    <SvgoEditPensil class="ml-0.5 h-4 text-gray-500 hover:text-brand-500 transition" />
                  </BaseTooltip>
                </button>
              </div>

              <p
                class="text-gray-600 text-base font-normal leading-normal"
              >
                {{ formData.stepThree?.applicationMethod ? formData.stepThree?.applicationMethod : "N/A" }}
              </p>
            </div>
          </div>
          <div class="justify-start items-start gap-8 inline-flex">
            <div
              class="flex-col justify-start items-start gap-2 inline-flex"
            >
              <div class="inline-flex items-center gap-1">
                <p class="text-gray-700 text-base font-semibold leading-normal">
                  {{ formData.stepThree?.applicationMethod }}
                </p>
                <button
                  id="tooltipButton"
                  type="button"
                  @click="() => emit('editIconClicked', 2)"
                >
                  <BaseTooltip id="edit-icon-12" tooltip-content="Edit">
                    <SvgoEditPensil class="ml-0.5 h-4 text-gray-500 hover:text-brand-500 transition" />
                  </BaseTooltip>
                </button>
              </div>

              <p v-if="formData.stepThree?.applicationMethod === 'URL'" class="text-gray-600 text-base font-normal leading-normal">
                {{ formData.stepThree?.applyURL ? "http://" + formData.stepThree.applyURL : "N/A" }}
              </p>
              <p v-if="formData.stepThree?.applicationMethod === 'Email'" class="text-gray-600 text-base font-normal leading-normal">
                {{ formData.stepThree?.applyEmail ? formData.stepThree.applyEmail : "N/A" }}
              </p>
            </div>
          </div>
        </div>

        <div class="grid sm:grid-cols-2 gap-4 w-full">
          <div class="justify-start items-start gap-8 inline-flex">
            <div class="flex-col justify-start items-start gap-2 inline-flex">
              <div class="inline-flex items-center gap-1">
                <p class="text-gray-700 text-base font-semibold leading-normal">
                  Application deadline date
                </p>
                <button
                  id="tooltipButton"
                  type="button"
                  @click="() => emit('editIconClicked', 2)"
                >
                  <BaseTooltip id="edit-icon-13" tooltip-content="Edit">
                    <SvgoEditPensil class="ml-0.5 h-4 text-gray-500 hover:text-brand-500 transition" />
                  </BaseTooltip>
                </button>
              </div>

              <p class="text-gray-600 text-base font-normal leading-normal">
                {{ formData.stepThree?.applicationDeadline ? convertTZDateToShortDate(formData.stepThree?.applicationDeadline) : "N/A" }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <FeatureJobPrompt />

      <FormFooterButtons
        :hide-cancel-button="true"
        :hide-next-button="true"
        @back-btn-clicked="() => emit('moveToPrevStep')"
      />
    </div>
  </div>
</template>
