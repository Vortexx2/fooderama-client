<template>
  <div class="flex rounded border-2 border-white w-fit p-3">
    <span>
      <p>{{ restData.restName }}</p>
    </span>
    <button class="btn-green ml-3">Edit</button>
  </div>
</template>

<script setup>
const props = defineProps({
  restData: {
    restId: Number,
    restName: String,
    description: String,
    open: Boolean,
    rating: Number,
    openingTime: String,
    closingTime: String,
  },
});
</script>

<style scoped></style>
