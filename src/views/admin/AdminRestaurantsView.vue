<script setup>
import { onMounted, ref, watchEffect } from 'vue';
import { RouterLink } from 'vue-router';

import RestaurantCard from '@/components/RestaurantCard.vue';

import config from '@/config';

const API_URL = config.BASE_API_URL + 'restaurants';
const res = ref(null);

async function getRestaurants(url) {
  res.value = await (await fetch(url)).json();
}

onMounted(() => {
  getRestaurants(API_URL);
});
</script>

<template>
  <div class="p-3 w-full">
    <div id="header" class="text-center flex align-middle">
      <h1 class="text-2xl inline-block">Restaurants</h1>
      <button class="btn-green ml-9">
        <router-link to="/admin/addrest">Create</router-link>
      </button>
    </div>
    <main id="main-content">
      <restaurant-card
        v-for="(rest, index) in res"
        :key="index"
        :restData="rest"
        class="mt-3"
      ></restaurant-card>
    </main>
  </div>
</template>
