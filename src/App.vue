<script setup>
import { RouterView } from 'vue-router'

import { useUserStore } from './stores/users.store'

import NavbarComponent from '@/components/NavbarComponent.vue'
import Footer from './components/Footer.vue'
import { onMounted } from 'vue'

// Imports above

const userStore = useUserStore()

onMounted(async () => {
  await userStore.refreshAccessToken()
})
</script>

<template>
  <div class="bg-cultured min-h-screen flex flex-col overflow-hidden">
    <header>
      <div class="wrapper">
        <NavbarComponent></NavbarComponent>
      </div>
    </header>

    <RouterView />
    <Footer class="mt-auto"></Footer>
  </div>
</template>

<style scoped></style>
