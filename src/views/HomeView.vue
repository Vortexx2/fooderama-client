<script setup>
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'

import config from '../config'
import { useRestaurantStore } from '../stores/restaurants.store'
import { useUserStore } from '../stores/users.store'

// Components
import RestaurantCard from '../components/RestaurantCard.vue'
import Search from '../components/utils/Search.vue'
import LoadingIcon from '../components/icons/LoadingIcon.vue'
import SearchIcon from '../components/icons/SearchIcon.vue'
import AlertComponent from '../components/utils/AlertComponent.vue'
// Imports above

const RESTAURANT_ENDPOINT = config.BASE_API_URL + 'restaurants'

const restaurants = useRestaurantStore()
const userStore = useUserStore()

const searchQuery = ref('')
const { searchedRestaurants } = storeToRefs(restaurants)

const NOT_VERIFIED_MESSAGE = `Your email <a href=${userStore.user.email}>${userStore.user.email}</a> has not been verified yet.`

onMounted(() => {
  restaurants.fetchRestaurantsLoop(
    RESTAURANT_ENDPOINT + '?cuisines=true&orderby=open&sort=desc',
    500,
    10
  )
})

function searchRestaurant(query) {
  searchQuery.value = query
}
</script>

<template>
  <div>
    <!-- Display to be confirmed if email is not confirmed -->
    <aside v-if="!userStore.user.confirmed">
      <AlertComponent :message="NOT_VERIFIED_MESSAGE"></AlertComponent>
    </aside>
    <main class="font-montserrat subpixel-antialiased overflow-x-hidden">
      <!-- Info and tagline -->
      <section class="my-4 text-center">
        <div class="capitalize text-3xl font-bold">
          Experience the ease of ordering food
        </div>
        <div class="text-lg font-normal mt-2">
          Either order food online or choose takeaway
        </div>
      </section>

      <!-- Display restaurants -->
      <section class="mx-5">
        <div class="mb-3 flex">
          <div class="text-2xl">Place an Order</div>
          <div class="ml-auto">
            <Search @doneTyping="searchRestaurant">
              <template #btn="{ search }"
                ><span
                  class="px-3 py-1 btn-red rounded"
                  @click="searchRestaurant(search)">
                  <SearchIcon
                    class="w-[25px] h-[25px]"
                    color="#edf4f2"></SearchIcon>
                </span> </template
            ></Search>
          </div>
        </div>
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
              :restData="restaurant" />
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
