<script setup>
import { onMounted, ref, defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router'
import { AxiosError } from 'axios'

import { useRestaurantStore } from '../../stores/restaurants.store'
import { baseRestaurantSchema } from '../../constants/restaurant.schema'

import AlertComponent from '../../components/utils/AlertComponent.vue'
// Imports above

const restaurantStore = useRestaurantStore()
const networkError = ref('')
const router = useRouter()

const FormComponent = defineAsyncComponent(async () => {
  await restaurantStore.fetchCuisines()

  return import('../../components/layout/FormComponent.vue')
})

const formObj = [
  {
    // field to display in label
    field: 'Restaurant Name',

    // name that the field will have on the object returned
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

onMounted(async () => {
  await restaurantStore.fetchCuisines()

  formObj.push({
    field: 'Cuisines',

    // the name used to reference
    name: 'Cuisines',
    type: 'multiselect',

    // the array that has all of the options the user can select or unselect
    options: restaurantStore.cuisines,

    // the fields that we want to show in the table
    fieldHeadings: restaurantStore.cuisineFieldsToShow,

    idReference: 'cuisineId',
    required: false,
  })
})

async function createRestaurant(values) {
  try {
    if (Object.prototype.hasOwnProperty.call(values, 'Cuisines')) {
      values.Cuisines = values.Cuisines.map(cuisineIdSelected => {
        return { cuisineId: cuisineIdSelected }
      })
    }

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
      :schema="baseRestaurantSchema"
      :fields-obj="formObj"
      submit-button-name="Create">
      <!-- General error that might occur due to network or validation issues on the backend -->
      <template #networkErrorAlert>
        <AlertComponent v-if="networkError" class="alert-error py-2">
          <!-- message that will be passed to the alert -->
          <template #message>
            <p class="text-md">{{ networkError }}</p>
          </template>
        </AlertComponent>
      </template>
    </FormComponent>
  </div>
</template>

<style scoped></style>
