<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="bg-cultured min-h-screen flex flex-col overflow-hidden">
    <header>
      <div class="wrapper">
        <Navbar></Navbar>
      </div>
    </header>

    <RouterView />
    <Footer class="mt-auto"></Footer>
  </div>
</template>

<style scoped></style>
