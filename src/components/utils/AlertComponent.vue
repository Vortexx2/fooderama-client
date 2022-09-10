<script setup>
defineProps({
  message: {
    type: String,
    required: false,
  },
})
</script>

<template>
  <transition name="drop-alert">
    <!-- <div v-if="message" class="py-2 px-4 my-2 rounded-sm" :class="classes.div"> -->
    <div v-if="message" class="alert">
      <p class="text-md">{{ message }}</p>
    </div>
  </transition>
</template>

<style scoped>
.drop-alert-enter-active,
.drop-alert-leave-active {
  transform-origin: top;
  transition: transform 0.3s;
}

.drop-alert-enter-from,
.drop-alert-leave-to {
  transform: scaleY(0);
}
</style>
