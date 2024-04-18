<script setup lang="ts">
import * as Yup from "yup";
import {useForm} from "vee-validate";

definePageMeta({
  layout: 'auth-form'
})

const model = defineModel()
const emit = defineEmits(['proceed'])

const passwordVisibility = ref(false)
const passwordFieldIcon = computed(() => passwordVisibility.value ? 'SvgoEyeOff' : 'SvgoEye')


const initialValues = ref({
  email: "",
  password: ""
});

// validation schema
const schema = Yup.object().shape({
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(6).required(),
});

const { handleSubmit, defineField, errors, meta } = useForm({
  initialValues: initialValues.value,
  validationSchema: schema,
});

const [email, emailAttrs] = defineField("email");
const [password, passAttrs] = defineField("password");

const canProceed = computed(() => {
  return meta.value.dirty && meta.value.valid;
});

function redirection() {
  emit('proceed')
}
</script>

<template>
  <BaseModal
      v-model="model"
      ok-text="Create Account"
      width="450px"
      :ok-disabled="!canProceed"
      @close="model = false"
      :on-cancel="redirection"
      :on-ok="redirection"
  >
    <template #body>
      <p class="text-sm">
        Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.
      </p>

      <form class="flex flex-col gap-5">
        <div class="form-control">
          <label for="email" class="text-custom-secondary-700">Email</label>
          <input v-model="email" v-bind="emailAttrs" type="email" id="email" placeholder="Enter your email" class="form-input" :class="{ 'has-error': errors.email }"/>
          <span class="input-error" v-if="errors.email">{{ errors.email }}</span>

        </div>
        <div class="form-control">
          <label for="password" class="text-custom-secondary-700">Password</label>
          <div class="relative">
            <div class="absolute inset-y-0 top-0 flex items-center right-3">
              <component
                  :is="passwordFieldIcon"
                  class="w-5 h-5 text-gray-600 cursor-pointer"
                  @click="passwordVisibility = !passwordVisibility"
              />
            </div>
            <input v-model="password" v-bind="passAttrs" :type="passwordVisibility ? 'text' : 'password'" id="password" placeholder="Enter your password" class="form-input" :class="{ 'has-error': errors.password }" />
          </div>
          <span class="input-error" v-if="errors.password">{{ errors.password }}</span>
        </div>
      </form>
    </template>
  </BaseModal>
</template>
