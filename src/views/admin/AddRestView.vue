<script setup>
import axios from 'axios'

import Form from '../../components/Form.vue'

import config from '@/config'
import { restaurantFormFields } from '../../constants/rest.const'

/* will map fields to properties the field should have like value, required etc. */

const API_URL = config.BASE_API_URL + '/restaurants'

/**
 *
 * @param {Event} e
 */
function addRestaurant(formObj) {
  const bodyObj = {}

  // remove all fields that have an empty 'value' property, since that equates to null in that field
  Object.keys(formObj).map(field => {
    if (formObj[field].value !== '') bodyObj[field] = formObj[field].value
  })

  axios
    .post(API_URL, bodyObj)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.error(err)
    })
}
</script>

<template>
  <div>
    <div id="title" class="ml-4">
      <h1 class="text-3xl">Add Restaurant</h1>
    </div>
    <div class="mt-5 ml-5">
      <Form
        :fields-obj="restaurantFormFields()"
        submit-button-name="Create"
        @form-submitted="addRestaurant"></Form>
    </div>
  </div>
</template>
