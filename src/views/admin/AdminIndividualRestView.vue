<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

import axios from 'axios';

import config from '@/config';

const route = useRoute();

onMounted(async () => {
  const restId = route.params.id;

  try {
    const res = await axios.get(config.BASE_API_URL + `restaurants/${restId}`);
    console.log(res);
  } catch (err) {
    console.error(err);
  }
});
</script>

<template>Hello World</template>

<style scoped></style>
