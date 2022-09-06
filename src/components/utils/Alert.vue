<script setup>
import { computed } from 'vue'

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  variant: {
    type: String,
    required: true,
    validator(value) {
      return ['red'].includes(value)
    },
  },
})

const classes = computed(() => {
  if (props.variant === 'red') {
    return {
      div: ['bg-imperial-3'],
      p: ['text-black'],
    }
  }
})
</script>

<template>
  <transition name="drop-alert">
    <div v-if="message" class="py-2 px-4 my-2 rounded-sm" :class="classes.div">
      <p class="text-md" :class="classes.p">{{ message }}</p>
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
