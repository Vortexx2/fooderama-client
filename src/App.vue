<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
</script>

<template>
  <div class="bg-cultured h-screen">
    <header>
      <div class="wrapper">
        <Navbar></Navbar>
      </div>
    </header>

    <RouterView />
  </div>
</template>

<style scoped></style>
