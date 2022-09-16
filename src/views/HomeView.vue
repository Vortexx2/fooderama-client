<script setup>
import { onMounted, ref } from 'vue'

import config from '../config'
import { useRestaurantStore } from '../stores/restaurants.store'
import { useUserStore } from '../stores/users.store'

// Components
import Search from '../components/utils/Search.vue'
import SearchIcon from '../components/icons/SearchIcon.vue'
import AlertComponent from '../components/utils/AlertComponent.vue'
import RestaurantLayout from '../components/layout/RestaurantLayout.vue'
// Imports above

const RESTAURANT_ENDPOINT = config.BASE_API_URL + 'restaurants'

const restaurants = useRestaurantStore()
const userStore = useUserStore()

const searchQuery = ref('')

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
    <aside v-if="userStore.user && !userStore.user.activated" class="mt-3">
      <AlertComponent>
        <template #message>
          <p class="text-lg">
            Your email
            <a :href="userStore.user.email" class="link link-accent">{{
              userStore.user.email
            }}</a>
            has not been verified yet
          </p>
        </template>
      </AlertComponent>
    </aside>

    <!-- Info and tagline -->
    <section class="my-4 text-center">
      <div class="capitalize text-3xl font-bold">
        Experience the ease of ordering food
      </div>
      <div class="text-lg font-normal mt-2">
        Either order food online or choose takeaway
      </div>
    </section>

    <div class="mb-3 flex">
      <div class="text-2xl">Edit a Restaurant</div>
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
    <RestaurantLayout
      :searchQuery="searchQuery"
      buttonName="Order"></RestaurantLayout>
  </div>
</template>
