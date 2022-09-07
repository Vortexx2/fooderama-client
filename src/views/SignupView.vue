<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ZodError } from 'zod'
import axios from 'axios'

import { zSignupForm } from '../constants/userSchema'
import config from '../config'
import { emptyAllValues } from '../utils/utils'

import Alert from '../components/utils/Alert.vue'
// Imports above

const router = useRouter()

/** Values that are used to model each field of the form */
const formValues = ref({
  email: '',
  password: '',
  confirmPassword: '',
})

/** Values that are used to display the errors that each field might have (upon submitting the form) */
const formErrors = ref({
  email: '',
  password: '',
  confirmPassword: '',
  general: '',
})

const SIGNUP_ENDPOINT = config.BASE_API_URL + 'users/signup/'
const formFields = Object.keys(formValues.value)

async function signupEvent(event) {
  event.preventDefault()

  // empty all of the errors
  // for (const field of formFields) formErrors.value[field] = ''
  emptyAllValues(formErrors.value)

  try {
    const parsed = zSignupForm.parse(formValues.value)

    emptyAllValues(formValues.value)

    const response = await axios.post(SIGNUP_ENDPOINT, parsed)

    if (response.status === 200) {
      router.push('/')
    }
  } catch (err) {
    if (err instanceof ZodError) {
      const flattenedErr = err.flatten().fieldErrors

      // assign each error to the respective field that it belongs to
      for (const field of formFields) {
        if (flattenedErr[field]) {
          formErrors.value[field] = flattenedErr[field][0]
        }
      }
    } else {
      formErrors.value.general =
        'Network Error. Please try again after some time.'
    }
  }
}
</script>

<template>
  <div
    id="container"
    class="bg-raisinb lg:w-5/12 w-3/4 mx-auto my-32 p-6 rounded-xl shadow-md shadow-black text-white">
    <!-- Signup Heading -->
    <div class="text-center text-3xl mb-3">Signup</div>

    <!-- Signup Form -->
    <form @submit="signupEvent($event)" class="mt-10 px-6">
      <div>
        <!-- Email input field -->
        <div id="email-pair" class="mb-6">
          <div class="text-left mb-2">
            <label for="email" class="text-lg">Email:</label>
          </div>
          <div>
            <input
              type="email"
              required
              v-model="formValues.email"
              id="email"
              class="rounded-md text-lg py-1 px-2 w-full text-black transition border-3 border-raisinb focus:outline-none focus:border-malachite-2 focus:border-3" />
          </div>
          <Alert :message="formErrors.email" variant="red"></Alert>
        </div>

        <!-- Password input field -->
        <div class="mb-6">
          <div class="text-left mb-2">
            <label for="password" class="text-lg">Password:</label>
          </div>
          <div>
            <input
              type="password"
              required
              v-model="formValues.password"
              id="password"
              class="rounded-md text-lg py-1 px-2 w-full text-black transition border-3 border-raisinb focus:outline-none focus:border-malachite-2 focus:border-3" />
          </div>
          <Alert :message="formErrors.password" variant="red"></Alert>
        </div>

        <!-- Confirm password input field -->
        <div class="mb-6">
          <div class="text-left mb-2">
            <label for="confirm-password" class="text-lg"
              >Confirm Password:</label
            >
          </div>
          <div>
            <input
              type="password"
              required
              v-model="formValues.confirmPassword"
              id="confirm-password"
              class="rounded-md text-lg py-1 px-2 w-full text-black transition border-3 border-raisinb focus:outline-none focus:border-malachite-2 focus:border-3" />
          </div>
          <Alert :message="formErrors.confirmPassword" variant="red"></Alert>
        </div>

        <Alert :message="formErrors.general" variant="red"></Alert>
        <div class="text-center">
          <input
            type="submit"
            value="Signup"
            class="btn-dark cursor-pointer px-3 py-2" />
        </div>
      </div>
    </form>

    <!-- Link to go to login page -->

    <!-- Horizontal Rule to divide the 2 sections -->
    <hr class="text-cultured opacity-75 mt-4" />

    <!-- Contains link -->
    <div class="text-center text-cultured-2 mt-4">
      <p class="inline-block mr-2">Already have an account?</p>
      <RouterLink to="login" class="text-malachite-2">Login</RouterLink>
    </div>
  </div>
</template>

<style scoped></style>
