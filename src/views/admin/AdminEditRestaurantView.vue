<script setup>
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'

import { useRestaurantStore } from '../../stores/restaurants.store'

import FormComponent from '../../components/layout/FormComponent.vue'
// Imports above

const route = useRoute()
const restaurantStore = useRestaurantStore()

const restId = parseInt(route.params['restId'], 10)

onMounted(() => {})

/** Has all of the details required to render the form component */
const restaurantDetailsForm = [
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
</script>

<template>
  <div>
    <h1 class="text-2xl">Edit Restaurant:</h1>

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
        <form-component
          :fields-obj="restaurantDetailsForm"
          submit-button-name="Update" />
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
