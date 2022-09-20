<script setup></script>

<template>
  <transition name="drop-alert">
    <div class="alert shadow-lg my-2">
      <slot name="message"></slot>
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
