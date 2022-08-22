<script setup>
import { onMounted, onUnmounted, ref, watchEffect } from 'vue'
import RestaurantCard from '../components/RestaurantCard.vue'
import LoadingIcon from '../components/icons/LoadingIcon.vue'
import config from '../config'
import axios from 'axios'

const RESTAURANT_ENDPOINT = config.BASE_API_URL + 'restaurants'

const fetchedData = ref(null)
const isLoading = ref(true)
const fetchError = ref(false)

/**
 * Fetches all restaurants from `RESTAURANT_ENDPOINT` and assigns `fetchedData` the incoming axios data. Then sets `isLoading` to false.
 */
async function getRestaurants() {
  // below URL sorts items by the 'open' field in descending order -> null, true, false
  fetchedData.value = await axios.get(
    RESTAURANT_ENDPOINT + '?orderby=open&sort=desc'
  )
  isLoading.value = false
}

/**
 * An asynchronous loop that checks the backend for restaurants for `totalTries` number of times every `fetchInterval` ms. Uses `setInterval` with regular checks to see if the request has been resolved.
 * @param {number} fetchInterval the interval at which to try the backend for information
 * @param {number} totalTries the number of times to try the backend
 */
function fetchRestaurantLoop(fetchInterval, totalTries) {
  let numTries = 1

  // if the initial network request fails
  getRestaurants().catch(err => {
    // every `fetchInterval` ms, execute a network request and increment the `numTries` var
    let timerId = setInterval(() => {
      //  check if numTries is still lesser than totalTries
      if (numTries < totalTries) {
        numTries++

        // if getRestaurants succeeds stop all new interval calls in the future
        getRestaurants().then(() => clearInterval(timerId))
      } else {
        // if `numTries` has exceeded `totalTries` stop fetching for the resource

        fetchError.value = true
        clearInterval(timerId)
      }
    }, fetchInterval)
  })
}

onMounted(() => {
  fetchRestaurantLoop(500, 10)
})
</script>

<template>
  <main class="mx-5 font-montserrat subpixel-antialiased">
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
    <section>
      <div class="text-2xl mb-3">Place an Order</div>

      <!-- TODO: Add a different style of loading where there is a skeleton of the layout and there is a loading animation in it -->
      <!-- Loading and Error -->
      <div class="text-center" v-if="isLoading">
        <div id="loading-icon" class="w-52 mx-auto">
          <LoadingIcon color="#000"></LoadingIcon>
        </div>
        <div class="max-w-2xl mx-auto" v-if="fetchError">
          Please try refreshing or coming back after some time, there seems to
          be an error with the server.
        </div>
      </div>

      <!-- Restaurant Cards -->
      <div v-if="!isLoading">
        <!-- <RestaurantCard :restData="fetchedData.data[0]"></RestaurantCard> -->
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-x-5">
          <RestaurantCard
            v-for="(restaurant, index) in fetchedData.data"
            :restData="restaurant" />
        </div>
      </div>
    </section>
  </main>
</template>
