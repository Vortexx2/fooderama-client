<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

import { useUserStore } from '../stores/users.store'

import CartIcon from './icons/CartIcon.vue'
import HamburgerIcon from './icons/HamburgerIcon.vue'
import CrossIcon from './icons/CrossIcon.vue'
// Imports above

const router = useRouter()
const userStore = useUserStore()

const colors = ref({
  cultured: '#edf4f2',
})
const dropDownOpen = ref(false)
const { isLoggedIn } = storeToRefs(userStore)

/** Toggles the dropdown by toggling its display state. */
function toggleDropdown() {
  dropDownOpen.value = !dropDownOpen.value
}

/**
 * Function triggered when a link is clicked in the dropdown navbar menu. Toggles dropdown to false and goes to the path provided.
 * @param {string} path the path to go to when the dropdown link is clicked
 */
function clickedDropdownLink(path) {
  dropDownOpen.value = false
  router.push(path)
}
</script>

<template>
  <nav
    class="w-full flex bg-raisinb text-white align-middle p-3 rounded-b-lg shadow-[7px_7px_5px_0px_rgba(0,0,0,0.3)] items-center">
    <RouterLink to="/" id="logo" class="mx-3 flex items-center">
      <h3 class="text-2xl h-fit">Fooderama</h3>
    </RouterLink>

    <!-- Cart Button -->
    <RouterLink
      to="/cart"
      tag="span"
      class="ml-auto cursor-pointer hover:-translate-y-0.5 transition hidden md:inline">
      <CartIcon
        :color="colors.cultured"
        class="w-[35px] h-[35px] -scale-x-100" />
    </RouterLink>

    <!-- Login Button -->
    <RouterLink
      to="/login"
      v-if="!isLoggedIn"
      class="align-middle ml-5 mr-2 hidden md:inline">
      <button class="btn-dark hover:-translate-y-0.5">Login</button>
    </RouterLink>

    <!-- Avatar -->
    <div v-if="isLoggedIn" class="avatar ml-2 cursor-pointer">
      <div class="w-10 rounded-full">
        <img src="../assets/images/user-avatar.jpg" />
      </div>
    </div>

    <button
      v-if="isLoggedIn"
      @click="userStore.logout"
      class="ml-2 btn btn-primary">
      logout
    </button>

    <!-- Hamburger menu -->
    <span class="ml-auto cursor-pointer md:hidden" @click="toggleDropdown">
      <HamburgerIcon
        :color="colors.cultured"
        class="w-[32px] h-[32px]"></HamburgerIcon>
    </span>

    <!-- Menu that opens with the hamburger -->
    <transition name="dropdown">
      <div
        class="w-screen h-fit absolute top-0 right-0 bg-raisinb shadow-lg shadow-black z-50 transition"
        v-if="dropDownOpen">
        <!-- Cross Icon -->
        <div
          class="w-fit ml-auto m-5 p-2 cursor-pointer transition hover:bg-raisinb-5 hover:-translate-y-[2px] hover:shadow-lg hover:shadow-black"
          @click="toggleDropdown">
          <CrossIcon
            :color="colors.cultured"
            class="w-[25px] h-[25px]"></CrossIcon>
        </div>
        <div class="flex flex-col">
          <div
            class="text-2xl p-5 shadow-sm shadow-black transition cursor-pointer hover:bg-raisinb-5 hover:-translate-y-[2px] hover:shadow-lg hover:shadow-black"
            @click="clickedDropdownLink('/')">
            Home
          </div>
          <div
            class="text-2xl p-5 shadow-sm shadow-black transition cursor-pointer hover:bg-raisinb-5 hover:-translate-y-[2px] hover:shadow-lg hover:shadow-black"
            @click="clickedDropdownLink('/cart')">
            Cart
          </div>
          <div
            v-if="!isLoggedIn"
            @click="clickedDropdownLink('/login')"
            class="text-2xl p-5 shadow-sm shadow-black transition cursor-pointer hover:bg-raisinb-5 hover:-translate-y-[2px] hover:shadow-lg hover:shadow-black">
            Login
          </div>
          <div
            v-if="isLoggedIn"
            @click="clickedDropdownLink('/user/profile')"
            class="text-2xl p-5 shadow-sm shadow-black transition cursor-pointer hover:bg-raisinb-5 hover:-translate-y-[2px] hover:shadow-lg hover:shadow-black">
            Profile
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
  transition: transform 0.5s;
}

.dropdown-enter-from,
.dropdown-leave-to {
  transform: scaleY(0);
}
</style>
