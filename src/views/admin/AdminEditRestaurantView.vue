<script setup>
import { OhVueIcon as vIcon } from 'oh-vue-icons'
</script>

<template>
  <div>
    <h1 class="text-2xl">Edit Restaurant:</h1>

    <!-- Edit Restaurant Details section -->
    <div
      tabindex="0"
      class="collapse border border-base-300 bg-base-100 rounded-box shadow-xl my-5">
      <input type="checkbox" />
      <div class="collapse-title flex align-middle pr-4">
        <div class="text-xl font-medium flex justify-center flex-col">
          <p>Edit Restaurant Details</p>
        </div>
        <div class="ml-auto">
          <v-icon name="md-arrowdropdown-outlined" scale="2" />
        </div>
      </div>
      <div class="collapse-content">
        <p>tabindex="0" attribute is necessary to make the div focusable</p>
      </div>
    </div>

    <div
      tabindex="0"
      class="collapse border border-base-300 bg-base-100 rounded-box shadow-xl my-5">
      <input type="checkbox" />
      <div class="collapse-title flex align-middle pr-4">
        <div class="text-xl font-medium flex justify-center flex-col">
          <p>Edit Menu</p>
        </div>
        <div class="ml-auto">
          <v-icon name="md-arrowdropdown-outlined" scale="2" />
        </div>
      </div>
      <div class="collapse-content">
        <p>tabindex="0" attribute is necessary to make the div focusable</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
