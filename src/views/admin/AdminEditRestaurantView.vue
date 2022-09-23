<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { AxiosError } from 'axios'

import { useRestaurantStore } from '../../stores/restaurants.store'
import { restaurantWithCuisinesSchema } from '../../constants/restaurant.schema'

import FormComponent from '../../components/layout/FormComponent.vue'
import AlertComponent from '../../components/utils/AlertComponent.vue'
// Imports above

const route = useRoute(),
  router = useRouter()
const restaurantStore = useRestaurantStore()
const currRestaurant = ref({})
const networkError = ref('')
const restId = parseInt(route.params['restId'], 10)

/** Has all of the details required to render the form component */
const restaurantDetailsForm = ref([
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
])

onMounted(async () => {
  await restaurantStore.refreshRestaurantsAndCuisines()
  currRestaurant.value = restaurantStore.getRestaurant(restId)

  if (!currRestaurant.value) {
    router.push({ name: 'admin-monitor-restaurants' })
  }

  restaurantDetailsForm.value.push({
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

async function editRestaurantDetails(values) {
  try {
    if (Object.prototype.hasOwnProperty.call(values, 'Cuisines')) {
      values.Cuisines = values.Cuisines.map(cuisineIdSelected => {
        return { cuisineId: cuisineIdSelected }
      })
    }
    await restaurantStore.updateRestaurant(restId, values)
    currRestaurant.value = restaurantStore.getRestaurant(restId)
  } catch (err) {
    if (err instanceof AxiosError) {
      networkError.value = err.response?.data?.message || err.message
    }
    console.error(err)
  }
}
</script>

<template>
  <div>
    <h1 class="text-2xl inline-block">Edit Restaurant:</h1>
    <h1 class="text-2xl inline-block ml-2" v-if="currRestaurant">
      {{ currRestaurant.restName }}
    </h1>

    <!-- Edit Restaurant Details section -->
    <div
      tabindex="0"
      class="collapse border border-base-300 bg-base-100 rounded-box shadow-xl my-5">
      <input type="checkbox" />
      <div class="collapse-title flex align-middle pr-4">
        <div class="text-xl font-medium flex justify-center flex-col">
          <p>Edit Restaurant Details</p>
        </div>
        <div class="ml-auto">
          <v-icon name="md-arrowdropdown-outlined" scale="2" />
        </div>
      </div>
      <div class="collapse-content">
        <FormComponent
          :fields-obj="restaurantDetailsForm"
          @form-submitted="editRestaurantDetails"
          :schema="restaurantWithCuisinesSchema"
          submit-button-name="Update">
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
    </div>

    <div
      tabindex="0"
      class="collapse border border-base-300 bg-base-100 rounded-box shadow-xl my-5">
      <input type="checkbox" />
      <div class="collapse-title flex align-middle pr-4">
        <div class="text-xl font-medium flex justify-center flex-col">
          <p>Edit Menu</p>
        </div>
        <div class="ml-auto">
          <v-icon name="md-arrowdropdown-outlined" scale="2" />
        </div>
      </div>
      <div class="collapse-content">
        <p>tabindex="0" attribute is necessary to make the div focusable</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
