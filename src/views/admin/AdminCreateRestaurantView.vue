<script setup>
import FormComponent from '../../components/layout/FormComponent.vue'
// Imports above

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
  console.log(values)
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
  </div>
</template>

<style scoped></style>
