<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import axios from 'axios';

import config from '@/config';

const route = useRoute();
const restData = ref(null);

onMounted(async () => {
  const restId = route.params.id;

  try {
    const { data } = await axios.get(
      config.BASE_API_URL + `restaurants/${restId}`
    );
    restData.value = data;
  } catch (err) {
    console.error(err);
  }
});
</script>

<template>
  <div v-if="restData">
    <h1>{{ restData.restName }}</h1>
  </div>
</template>

<style scoped></style>
