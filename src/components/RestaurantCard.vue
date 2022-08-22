<script setup>
import { ref, computed, onMounted } from 'vue'
import { restaurantResponseProp } from '../constants/rest.const'

// props for this component
const props = defineProps({
  restData: {
    type: Object,
    required: true,
    default(rawProps) {
      return { open: true }
    },
  },
})

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
    classesObj.orderButtonClasses = ['cursor-default']
  }

  return classesObj
})
</script>

<template>
  <div
    class="w-full rounded-md bg-space text-cultured shadow-2xl"
    :class="cardClasses.cardClasses">
    <span>
      <img
        :src="restData.restImage"
        alt="Restaurant Image"
        class="rounded-t-md" />
    </span>
    <div class="px-3 py-3">
      <span class="flex items-center mb-2">
        <span>
          <p>{{ restData.restName }}</p>
        </span>
        <button
          class="ml-auto font-medium bg-amaranth rounded-md py-1 px-2 shadow-xl"
          :class="cardClasses.orderButtonClasses">
          Order
        </button>
      </span>
      <span>
        <p class="text-xs text-cultured-3">{{ restData.description }}</p>
      </span>
    </div>
  </div>
</template>

<style scoped></style>
