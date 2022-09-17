<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { AxiosError } from 'axios'

import { useRestaurantStore } from '../../stores/restaurants.store'

import FormComponent from '../../components/layout/FormComponent.vue'
import AlertComponent from '../../components/utils/AlertComponent.vue'
// Imports above

const restaurantStore = useRestaurantStore()
const networkError = ref('')
const router = useRouter()

const formObj = [
  {
    field: 'Restaurant Name',
    name: 'restName',
    type: 'text',
    required: true,
  },
  {
    field: 'Image URL',
    name: 'restImage',
    type: 'text',
    required: false,
  },
  {
    field: 'Description',
    name: 'description',
    type: 'text',
    required: false,
  },
  {
    field: 'Opening Time',
    name: 'openingTime',
    type: 'text',
    required: false,
  },
  {
    field: 'Closing Time',
    name: 'closingTime',
    type: 'text',
    required: false,
  },
]

async function createRestaurant(values) {
  try {
    await restaurantStore.createRestaurant(values)
    router.push({ name: 'admin-monitor-restaurants' })
  } catch (err) {
    if (err instanceof AxiosError) {
      networkError.value = err.response?.data?.message || err.message
    }
    console.error(err)
  }
}
</script>

<template>
  <div class="mx-6">
    <div class="">
      <h1 class="text-2xl">Create Restaurant:</h1>
    </div>
    <FormComponent
      @form-submitted="createRestaurant"
      :fields-obj="formObj"
      submit-button-name="Create"></FormComponent>
    <AlertComponent v-if="networkError" class="alert-error">
      <template #message>
        <p class="text-md">{{ networkError }}</p>
      </template>
    </AlertComponent>
  </div>
</template>

<style scoped></style>
