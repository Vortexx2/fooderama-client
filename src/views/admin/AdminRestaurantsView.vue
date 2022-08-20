<script setup>
import { onMounted, ref, watchEffect } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

import RestaurantCard from '@/components/RestaurantCard.vue'

import config from '@/config'

const API_URL = config.BASE_API_URL + 'restaurants'
const router = useRouter()
const res = ref(null)

onMounted(() => {
  getRestaurants(API_URL)
})

async function getRestaurants(url) {
  res.value = await (await fetch(url)).json()
}

/**
 *
 * @param {number} restId
 */
function editRestaurant(restId) {
  router.push({
    name: 'individual restaurants',
    params: {
      id: restId,
    },
  })
}
</script>

<template>
  <div class="p-3 w-full">
    <div id="header" class="text-center flex align-middle">
      <h1 class="text-2xl inline-block">Restaurants</h1>
      <button class="btn-green ml-9">
        <router-link :to="{ name: 'addrest' }">Create</router-link>
      </button>
    </div>
    <main id="main-content">
      <restaurant-card
        v-for="(rest, index) in res"
        :key="index"
        :restData="rest"
        class="mt-3"
        @edit-restaurant="editRestaurant"></restaurant-card>
    </main>
  </div>
</template>
