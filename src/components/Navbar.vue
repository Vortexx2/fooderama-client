<script setup>
import CartIcon from './icons/CartIcon.vue'
</script>

<template>
  <nav
    class="w-full flex bg-raisinb text-white align-middle p-3 rounded-b-2xl shadow-3xl items-center"
  >
    <span id="logo" class="mx-3 flex items-center">
      <h3 class="text-2xl h-fit">Fooderama</h3>
    </span>
    <span class="ml-auto cursor-pointer hover:-translate-y-1 transition">
      <CartIcon color="#edf4f2" class="w-[35px] h-[35px] -scale-x-100" />
    </span>
    <span class="flex align-middle ml-5 mr-2">
      <button class="btn-dark">Login</button>
    </span>
  </nav>
</template>
