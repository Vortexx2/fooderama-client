<script setup>
import { ref } from 'vue'
import SearchIcon from '../icons/SearchIcon.vue'
// Imports above

const props = defineProps({
  // the default placeholder value that will be placed in the search box
  defaultSearchValue: {
    type: String,
    required: false,
    default: 'Search',
  },
  doneTypingInterval: {
    type: Number,
    required: false,
    default: 500,
  },
})

const emit = defineEmits(['doneTyping'])

const searchQuery = ref('')

let typingTimer

function doneTyping() {
  clearTimeout(typingTimer)

  typingTimer = setTimeout(search, props.doneTypingInterval)
}

function search() {
  emit('doneTyping', searchQuery.value)
}
</script>

<template>
  <span class="flex rounded shadow-black shadow-md">
    <!-- icon for the search operation -->
    <slot name="btn" :search="searchQuery">
      <span class="px-3 py-1 btn-red rounded">
        <SearchIcon class="w-[25px] h-[25px]"></SearchIcon>
      </span>
    </slot>

    <!-- input for the search operation -->
    <span>
      <input
        type="text"
        class="h-full w-full rounded-r-lg bg-cultured text-black text-md px-2 focus:outline-none focus:outline-1"
        :placeholder="defaultSearchValue"
        v-model="searchQuery"
        @keyup="doneTyping" />
    </span>
  </span>
</template>
