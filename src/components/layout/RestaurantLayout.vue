<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import config from '@/config'
import { useRestaurantStore } from '../../stores/restaurants.store'

import LoadingIcon from '../icons/LoadingIcon.vue'
import RestaurantCard from '../RestaurantCard.vue'

// Imports above

const RESTAURANT_ENDPOINT = config.BASE_API_URL + 'restaurants'
// const searchQuery = ref('')
const restaurants = useRestaurantStore()
const { searchedRestaurants } = storeToRefs(restaurants)

defineProps({
  searchQuery: {
    type: String,
    required: false,
    default: '',
  },
  buttonName: {
    type: String,
    required: true,
  },
})
onMounted(() => {
  restaurants.fetchRestaurantsLoop(
    RESTAURANT_ENDPOINT + '?cuisines=true&orderby=open&sort=desc',
    500,
    10
  )
})
</script>

<template>
  <main class="py-5 subpixel-antialiased overflow-x-hidden">
    <!-- Display restaurants -->
    <section class="mx-5">
      <!-- TODO: Add a different style of loading where there is a skeleton of the layout and there is a loading animation in it -->
      <!-- Loading and Error -->
      <div class="text-center" v-if="restaurants.isLoading">
        <div id="loading-icon" class="w-52 mx-auto">
          <LoadingIcon color="#000"></LoadingIcon>
        </div>
        <div class="max-w-2xl mx-auto" v-if="restaurants.fetchError">
          Please try refreshing or coming back after some time, there seems to
          be an error with the server.
        </div>
      </div>

      <!-- Restaurant Cards -->
      <div v-if="!restaurants.isLoading">
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-x-5">
          <RestaurantCard
            v-for="(restaurant, index) in searchedRestaurants(searchQuery)"
            :key="index"
            :restData="restaurant"
            :buttonName="buttonName" />
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped></style>
