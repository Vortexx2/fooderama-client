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

const cardIsActiveClasses = computed(() => {
  const { open } = restData

  if (open)
    return [
      'cursor-pointer',
      'transition',
      'hover:scale-110',
      'hover:shadow-3xl',
    ]
  else return ['opacity-50']
})
</script>

<template v-if="restData">
  <div
    class="w-full rounded-md bg-space text-cultured shadow-2xl cursor-pointer transition hover:scale-110 hover:shadow-3xl">
    <span>
      <img
        :src="restData.restImage"
        alt="Restaurant Image"
        class="rounded-t-md" />
    </span>
    <div class="px-3 py-3">
      <span class="flex items-center">
        <span>
          <p>{{ restData.restName }}</p>
        </span>
        <button
          class="ml-auto font-medium bg-amaranth rounded-md py-1 px-2 shadow-xl transition hover:-translate-y-1 hover:bg-amaranth-3 hover:scale-[1.05]">
          Order
        </button>
      </span>
      <span>
        <p>{{ restData.description }}</p>
      </span>
    </div>
  </div>
</template>

<style scoped></style>
