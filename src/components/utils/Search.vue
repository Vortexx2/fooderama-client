<script setup>
import SearchIcon from '../icons/SearchIcon.vue'

const props = defineProps({
  styles: {
    iconColor: String,
    iconWidth: String,
    iconHeight: String,
  },
})
</script>

<template>
  <span class="flex">
    <span>
      <SearchIcon
        :color="styles.iconColor"
        :class="`w-[${styles.iconWidth}] h-[${styles.iconHeight}]`"
      ></SearchIcon>
    </span>
    <span>
      <input type="text" />
    </span>
  </span>
</template>
