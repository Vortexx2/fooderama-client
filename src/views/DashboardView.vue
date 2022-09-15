<script setup>
import { useUserStore } from '../stores/users.store'
import { storeToRefs } from 'pinia'
// Imports above

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
</script>

<template>
  <div class="my-5 mx-96">
    <aside class="w-full text-left">
      <h1 class="font-bold text-center text-5xl my-3">Admin Dashboard</h1>
      <p class="text-left">Hello {{ user.email }}</p>
    </aside>
    <RouterView></RouterView>
  </div>
</template>

<style scoped></style>
