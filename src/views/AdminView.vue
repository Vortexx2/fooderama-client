<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { RouterLink } from 'vue-router';

const API_URL = 'http://localhost:4000/api/v1/restaurants';
const res = ref(null);

async function getRestaraunts(url: string) {
  res.value = await (await fetch(url)).json();
}

getRestaraunts(API_URL);
</script>

<template>
  <div class="p-3 w-full">
    <div id="header" class="text-center flex align-middle">
      <h1 class="text-2xl inline-block">Restaurants</h1>
      <button class="bg-lime-500 px-2 ml-9">
        <router-link to="/admin/addrest">Create</router-link>
      </button>
    </div>
    <main id="main-content">{{ res }}</main>
  </div>
</template>
