<script setup>
import { ref } from 'vue'
import { ZodError } from 'zod'

import { zLoginForm } from '../constants/userSchema'

import Alert from '../components/utils/Alert.vue'
// Imports above

const formValues = ref({
  email: '',
  password: '',
})

const formErrors = ref({
  emailError: '',
  passwordError: '',
})

function loginEvent(event) {
  event.preventDefault()

  formErrors.value.emailError = formErrors.value.passwordError = ''

  try {
    const parsed = zLoginForm.parse(formValues.value)

    console.log(parsed)
  } catch (err) {
    if (err instanceof ZodError) {
      if (err.flatten().fieldErrors.email) {
        formErrors.value.emailError = err.flatten().fieldErrors.email[0]
      }

      if (err.flatten().fieldErrors.password) {
        formErrors.value.passwordError = err.flatten().fieldErrors.password[0]
      }
    }
  }
}
</script>

<template>
  <main class="">
    <div
      id="container"
      class="bg-raisinb lg:w-5/12 w-3/4 mx-auto my-32 p-6 rounded-xl shadow-md shadow-black text-white">
      <!-- Login Heading -->
      <div class="text-center text-3xl mb-3">Login</div>

      <!-- Login Form -->
      <form @submit="loginEvent($event)" class="mt-10 px-6">
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
            <Alert :message="formErrors.emailError" variant="red"></Alert>
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
            <Alert :message="formErrors.passwordError" variant="red"></Alert>
          </div>

          <div class="text-center">
            <input
              type="submit"
              value="Login"
              class="btn-dark cursor-pointer px-3 py-2" />
          </div>
        </div>
      </form>

      <!-- Link to go to signup page -->

      <!-- Horizontal Rule to divide the 2 sections -->
      <hr class="text-cultured opacity-75 mt-4" />

      <!-- Contains link -->
      <div class="text-center text-cultured-2 mt-4">
        <p class="inline-block mr-2">New to Fooderama?</p>
        <RouterLink to="/signup" class="text-malachite-2"
          >Create account</RouterLink
        >
      </div>
    </div>
  </main>
</template>

<style scoped></style>
