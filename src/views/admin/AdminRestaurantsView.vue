<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import RestaurantLayout from '../../components/layout/RestaurantLayout.vue'
import SearchIcon from '../../components/icons/SearchIcon.vue'
import Search from '../../components/utils/Search.vue'

// Imports above

const router = useRouter()
const res = ref(null)
const searchQuery = ref('')

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

function searchRestaurant(search) {
  searchQuery.value = search
}
</script>

<template>
  <div>
    <div class="mb-3 mx-6 flex">
      <div class="text-2xl">Edit a Restaurant</div>

      <RouterLink
        to="/admin/restaurants/create"
        class="btn btn-sm btn-outline btn-square btn-secondary text-xl shadow-lg ml-3">
        <span class="leading-none text-3xl">&plus;</span>
      </RouterLink>
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
    <RestaurantLayout buttonName="Edit" :searchQuery="searchQuery">
    </RestaurantLayout>
  </div>
</template>
