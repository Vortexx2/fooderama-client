<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import axios from 'axios'

import config from '@/config'
import { restaurantFormFields } from '@/constants/rest.const'
import Form from '../../components/Form.vue'

const route = useRoute()
const restData = ref(null)

onMounted(async () => {
  try {
    const restId = route.params.id
    getRestaurantData(config.BASE_API_URL + `restaurants/${restId}`)
  } catch (err) {
    console.error(err)
  }
})

async function getRestaurantData(url) {
  const { data } = await axios.get(url)
  restData.value = data
}
</script>

<template>
  <div v-if="restData" class="ml-10 mt-3">
    <h1 class="text-2xl">{{ restData.restName }}</h1>
    <Form :fields-obj="restaurantFormFields(true)" submit-button-name="Edit"></Form>
  </div>
</template>

<style scoped></style>
