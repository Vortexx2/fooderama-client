<script setup>
import { computed } from 'vue'

// props for this component
const props = defineProps({
  restData: {
    type: Object,
    required: true,
    default() {
      return { open: true }
    },
  },
  submitButton: {
    type: Object,
    required: true,
  },
})

/**
 * The classes for the card depending on the open property
 */
const cardClasses = computed(() => {
  const { open } = props.restData

  const classesObj = {
    cardClasses: [],
    orderButtonClasses: [],
  }

  if (open) {
    classesObj.cardClasses = [
      'cursor-pointer',
      'transition',
      'hover:scale-110',
      'hover:shadow-3xl',
    ]

    classesObj.orderButtonClasses = [
      'transition',
      'hover:-translate-y-1',
      'hover:bg-amaranth-3',
      'hover:scale-[1.05]',
    ]
  } else {
    classesObj.cardClasses = ['opacity-50']
    classesObj.orderButtonClasses = [
      'cursor-default',
      'transition-none',
      'hover:bg-amaranth',
    ]
  }

  return classesObj
})
</script>

<template>
  <div
    class="w-full rounded-md bg-space text-cultured shadow-2xl mb-4"
    :class="cardClasses.cardClasses">
    <span>
      <img
        :src="restData.restImage"
        alt="Restaurant Image"
        class="rounded-t-md" />
    </span>
    <div class="px-3 py-3 text-ellipsis">
      <span class="flex items-center mb-2">
        <!-- Restaurant Name -->
        <span>
          <p>{{ restData.restName }}</p>
        </span>

        <!-- Order button -->
        <RouterLink
          :to="submitButton.redirectName"
          custom
          v-slot="{ navigate }">
          <button
            @click="navigate"
            class="ml-auto py-1 px-2 btn-red"
            :class="cardClasses.orderButtonClasses">
            {{ submitButton.buttonName }}
          </button>
        </RouterLink>
      </span>

      <!-- Cuisines section -->
      <span v-if="restData.Cuisines">
        <span
          class="mr-1 text-xs text-cultured-3"
          v-for="(cuisine, index) in restData.Cuisines"
          :key="index">
          <span>{{ cuisine.cuisineName }}</span>

          <!-- Commas are there only if it's not the last restaurant -->
          <span v-if="index !== restData.Cuisines.length - 1">,</span>
        </span>
      </span>
    </div>
  </div>
</template>

<style scoped></style>
