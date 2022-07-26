<script setup>
import RestaurantCard from '@/components/RestaurantCard.vue';

import { ref, watchEffect } from 'vue';
import { RouterLink } from 'vue-router';

const API_URL = 'http://localhost:4000/api/v1/restaurants';
const res = ref(null);

async function getRestaraunts(url) {
  res.value = await (await fetch(url)).json();
}

getRestaraunts(API_URL);
</script>

<template>
  <div class="p-3 w-full">
    <div id="header" class="text-center flex align-middle">
      <h1 class="text-2xl inline-block">Restaurants</h1>
      <button class="btn-green ml-9">
        <router-link to="/admin/addrest">Create</router-link>
      </button>
    </div>
    <main id="main-content" v-if="res">
      <restaurant-card
        v-for="(rest, index) in res"
        :key="index"
        :restData="rest"
        class="mt-3"
      ></restaurant-card>
    </main>
  </div>
</template>
