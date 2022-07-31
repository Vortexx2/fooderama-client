<script setup>
import { ref } from 'vue'
import CartIcon from './icons/CartIcon.vue'
import Search from './utils/Search.vue'
import SearchIcon from './icons/SearchIcon.vue'

const colors = ref({
  cultured: '#edf4f2',
})
</script>

<template>
  <nav
    class="w-full flex bg-raisinb text-white align-middle p-3 rounded-b-lg shadow-[7px_7px_5px_0px_rgba(0,0,0,0.3)] items-center"
  >
    <span id="logo" class="mx-3 flex items-center">
      <h3 class="text-2xl h-fit">Fooderama</h3>
    </span>

    <!-- Search Component -->
    <span class="ml-auto -mr-52">
      <Search>
        <template #icon>
          <SearchIcon
            :color="colors.cultured"
            class="w-[25px] h-[25px] group-hover:-translate-y-0.5 transition"
          ></SearchIcon>
        </template>
      </Search>
    </span>

    <!-- Cart Button -->
    <span class="ml-auto cursor-pointer hover:-translate-y-0.5 transition">
      <CartIcon
        :color="colors.cultured"
        class="w-[35px] h-[35px] -scale-x-100"
      />
    </span>

    <!-- Login Button -->
    <span class="flex align-middle ml-5 mr-2">
      <button class="btn-dark hover:-translate-y-0.5">Login</button>
    </span>
  </nav>
</template>
