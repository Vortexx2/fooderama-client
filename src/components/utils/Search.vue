<script setup>
import SearchIcon from '../icons/SearchIcon.vue'

const props = defineProps({
  defaultSearchValue: {
    type: String,
    required: false,
    default: 'Search',
  },
})
</script>

<template>
  <span class="flex rounded bg-space-6 shadow-black shadow-lg">
    <!-- icon for the search operation -->
    <span
      class="px-3 py-1 rounded-l-lg cursor-pointer group hover:bg-raisinb-5"
    >
      <slot name="icon">
        <SearchIcon class="w-[25px] h-[25px]"></SearchIcon>
      </slot>
    </span>

    <!-- input for the search operation -->
    <span>
      <input
        type="text"
        class="h-full rounded-r-lg bg-cultured text-black text-md px-2 focus:outline-none focus:outline-1"
        :placeholder="defaultSearchValue"
      />
    </span>
  </span>
</template>
