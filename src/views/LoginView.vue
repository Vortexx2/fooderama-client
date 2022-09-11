<script setup>
import { ref } from 'vue'
import { AxiosError } from 'axios'
import { Form, Field } from 'vee-validate'
import { useRouter } from 'vue-router'

import { useUserStore } from '../stores/users.store'

import AlertComponent from '../components/utils/AlertComponent.vue'
// Imports above

const router = useRouter()

const userStore = useUserStore()

const loginError = ref('')

async function loginEvent(values, { resetForm }) {
  try {
    resetForm()

    await userStore.login(values)

    router.push({ name: 'home' })
  } catch (err) {
    if (err instanceof AxiosError) {
      if (!err.response.data) {
        loginError.value = err.message
      } else {
        loginError.value = err.response.data.message
      }
    }

    console.error(err)
  }
}
</script>

<template>
  <main>
    <div
      id="container"
      class="bg-raisinb lg:w-5/12 md:w-3/4 w-11/12 mx-auto my-32 p-6 rounded-xl shadow-md shadow-black text-white">
      <!-- Login Heading -->
      <div class="text-center text-3xl mb-3">Login</div>

      <!-- Login Form -->
      <Form @submit="loginEvent" class="mt-10 md:px-6">
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
                required
                class="rounded-md text-lg py-1 px-2 w-full text-black transition border-3 border-raisinb focus:outline-none focus:border-malachite-2 focus:border-3" />
            </div>
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
                required
                class="rounded-md text-lg py-1 px-2 w-full text-black transition border-3 border-raisinb focus:outline-none focus:border-malachite-2 focus:border-3" />
            </div>
          </div>
          <AlertComponent v-if="loginError" class="alert-error">
            <template #message>
              <p class="text-md">{{ loginError }}</p>
            </template>
          </AlertComponent>

          <div class="text-center">
            <input
              type="submit"
              value="Login"
              class="btn-dark cursor-pointer px-3 py-2" />
          </div>
        </div>
      </Form>

      <!-- Link to go to signup page -->

      <!-- Horizontal Rule to divide the 2 sections -->
      <hr class="text-cultured opacity-75 mt-4" />

      <!-- Contains link -->
      <div class="text-center text-cultured-2 mt-4">
        <p class="inline-block mr-2">New to Fooderama?</p>
        <RouterLink to="signup" class="text-malachite-2"
          >Create account</RouterLink
        >
      </div>
    </div>
  </main>
</template>

<style scoped></style>
