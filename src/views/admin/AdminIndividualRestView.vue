<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import axios from 'axios'

import config from '@/config'
import { restaurantFormFields } from '@/constants/rest.const'
import Form from '../../components/Form.vue'

const route = useRoute()
const restData = ref(null)

const restId = route.params.id
const individualRestaurantAPI = config.BASE_API_URL + `restaurants/${restId}`

onMounted(async () => {
  try {
    getRestaurantData(individualRestaurantAPI)
  } catch (err) {
    console.error(err)
  }
})

async function getRestaurantData(url) {
  const { data } = await axios.get(url)
  restData.value = data
}

async function editRestaurant(formObj) {
  const restId = route.params.id

  const bodyObj = {}
  Object.keys(formObj).map(field => {
    if (formObj[field].value !== '') bodyObj[field] = formObj[field].value
  })
  const res = await axios.put(individualRestaurantAPI, bodyObj)

  getRestaurantData(individualRestaurantAPI)
  console.log(res)
}
</script>

<template>
  <div v-if="restData" class="ml-10 mt-3">
    <h1 class="text-2xl">{{ restData.restName }}</h1>
    <Form
      :fields-obj="restaurantFormFields(true)"
      submit-button-name="Edit"
      @form-submitted="editRestaurant"
    ></Form>
  </div>
</template>

<style scoped></style>
