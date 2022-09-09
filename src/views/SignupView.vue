<script setup>
import { ref } from 'vue'
import { z, ZodError } from 'zod'
import { Form, Field, ErrorMessage } from 'vee-validate'

import { zSignupForm, signupSchema } from '../constants/userSchema'
import { emptyAllValues } from '../utils/utils'
import { useUserStore } from '../stores/users'

import Alert from '../components/utils/Alert.vue'
import { AxiosError } from 'axios'
// Imports above

const user = useUserStore()

async function signupEvent() {
  // empty all of the errors

  try {
    await user.signup(parsed)
  } catch (err) {
    console.error(err)
    if (err instanceof ZodError) {
    } else if (err instanceof AxiosError) {
    }
  }
}

async function testSignup(values) {
  console.log(JSON.stringify(values, null, 2))
}
</script>

<template>
  <div
    id="container"
    class="bg-raisinb lg:w-5/12 w-3/4 mx-auto my-32 p-6 rounded-xl shadow-md shadow-black text-white">
    <!-- Signup Heading -->
    <div class="text-center text-3xl mb-3">Signup</div>

    <!-- Signup Form -->
    <Form
      @submit="testSignup"
      :validation-schema="signupSchema"
      v-slot="{ errors }"
      class="mt-10 px-6">
      <div>
        <!-- Email input field -->
        <div id="email-pair" class="mb-6">
          <div class="text-left mb-2">
            <label for="email" class="text-lg">Email:</label>
          </div>
          <div>
            <Field
              name="email"
              type="email"
              id="email"
              class="rounded-md text-lg py-1 px-2 w-full text-black transition border-3 border-raisinb focus:outline-none focus:border-malachite-2 focus:border-3" />
          </div>
          <Alert :message="errors.email" variant="red"></Alert>
        </div>

        <!-- Password input field -->
        <div class="mb-6">
          <div class="text-left mb-2">
            <label for="password" class="text-lg">Password:</label>
          </div>
          <div>
            <Field
              name="password"
              type="password"
              id="password"
              class="rounded-md text-lg py-1 px-2 w-full text-black transition border-3 border-raisinb focus:outline-none focus:border-malachite-2 focus:border-3" />
          </div>
          <Alert :message="errors.password" variant="red"></Alert>
        </div>

        <!-- Confirm password input field -->
        <div class="mb-6">
          <div class="text-left mb-2">
            <label for="confirmPassword" class="text-lg"
              >Confirm Password:</label
            >
          </div>
          <div>
            <Field
              name="confirmPassword"
              type="password"
              id="confirmPassword"
              class="rounded-md text-lg py-1 px-2 w-full text-black transition border-3 border-raisinb focus:outline-none focus:border-malachite-2 focus:border-3" />
          </div>

          <Alert :message="errors.confirmPassword" variant="red"></Alert>
        </div>

        <!-- <Alert :message="" variant="red"></Alert> -->
        <div class="text-center">
          <input
            type="submit"
            value="Signup"
            class="btn-dark cursor-pointer px-3 py-2" />
        </div>
      </div>
    </Form>

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
