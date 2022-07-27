<script setup>
import { restaurantResponseProp } from '../constants/rest.const';

// props for this component
const props = defineProps({
  restData: restaurantResponseProp(),
});
</script>

<template>
  <div class="flex rounded border-2 border-white w-fit p-3">
    <span>
      <p>{{ restData.restName }}</p>
    </span>
    <button
      class="btn-green ml-3"
      @click="$emit('editRestaurant', restData.restId)"
    >
      Edit
    </button>
  </div>
</template>

<style scoped></style>
