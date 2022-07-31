<script setup>
import { ref } from 'vue'
import CartIcon from './icons/CartIcon.vue'
import Search from './utils/Search.vue'
import SearchIcon from './icons/SearchIcon.vue'
import HamburgerIcon from './icons/HamburgerIcon.vue'
import CrossIcon from './icons/CrossIcon.vue'

const colors = ref({
  cultured: '#edf4f2',
})

const dropDownOpen = ref(false)

function toggleDropdown() {
  dropDownOpen.value = !dropDownOpen.value
}
</script>

<template>
  <nav
    class="w-full flex bg-raisinb text-white align-middle p-3 rounded-b-lg shadow-[7px_7px_5px_0px_rgba(0,0,0,0.3)] items-center"
  >
    <span id="logo" class="mx-3 flex items-center">
      <h3 class="text-2xl h-fit">Fooderama</h3>
    </span>

    <!-- Search Component -->
    <!-- <span class="max-w-[175px] ml-auto sm:max-w-[200px] lg:-mr-52">
      <Search>
        <template #icon>
          <SearchIcon
            :color="colors.cultured"
            class="w-[25px] h-[25px] group-hover:-translate-y-0.5 transition"
          ></SearchIcon>
        </template>
      </Search>
    </span> -->

    <!-- Cart Button -->
    <span
      class="ml-auto cursor-pointer hover:-translate-y-0.5 transition hidden md:inline"
    >
      <CartIcon
        :color="colors.cultured"
        class="w-[35px] h-[35px] -scale-x-100"
      />
    </span>

    <!-- Login Button -->
    <span class="align-middle ml-5 mr-2 hidden md:inline">
      <button class="btn-dark hover:-translate-y-0.5">Login</button>
    </span>

    <!-- Hamburger menu -->
    <span class="ml-auto cursor-pointer md:hidden" @click="toggleDropdown">
      <HamburgerIcon
        :color="colors.cultured"
        class="w-[32px] h-[32px]"
      ></HamburgerIcon>
    </span>

    <!-- Menu that opens with the hamburger -->
    <transition name="dropdown">
      <div
        class="w-screen h-fit absolute top-0 right-0 bg-raisinb shadow-lg shadow-black z-50 transition"
        v-if="dropDownOpen"
      >
        <!-- Cross Icon -->
        <div
          class="w-fit ml-auto m-5 p-2 cursor-pointer transition hover:bg-raisinb-5 hover:-translate-y-[2px] hover:shadow-lg hover:shadow-black"
          @click="toggleDropdown"
        >
          <CrossIcon
            :color="colors.cultured"
            class="w-[25px] h-[25px]"
          ></CrossIcon>
        </div>
        <div class="flex flex-col">
          <div
            class="text-2xl p-5 shadow-sm shadow-black transition cursor-pointer hover:bg-raisinb-5 hover:-translate-y-[2px] hover:shadow-lg hover:shadow-black"
          >
            Home
          </div>
          <div
            class="text-2xl p-5 shadow-sm shadow-black transition cursor-pointer hover:bg-raisinb-5 hover:-translate-y-[2px] hover:shadow-lg hover:shadow-black"
          >
            Cart
          </div>
          <div
            class="text-2xl p-5 shadow-sm shadow-black transition cursor-pointer hover:bg-raisinb-5 hover:-translate-y-[2px] hover:shadow-lg hover:shadow-black"
          >
            Login
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transform-origin: top;
  transition: transform 1s;
}

.dropdown-enter-from,
.dropdown-leave-to {
  transform: scaleY(0);
}
</style>
