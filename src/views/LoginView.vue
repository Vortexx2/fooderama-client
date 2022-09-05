<script setup></script>

<template>
  <main class="">
    <div
      id="container"
      class="bg-raisinb w-5/12 mx-auto my-40 p-6 rounded-xl shadow-md shadow-black text-white">
      <!-- Login Heading -->
      <div class="text-center text-3xl mb-3">Login</div>

      <!-- Login Form -->
      <form class="mt-10 px-6">
        <div>
          <!-- Email input field -->
          <div id="email-pair" class="mb-6">
            <div class="text-left mb-2">
              <label class="text-lg">Email:</label>
            </div>
            <div>
              <input
                type="email"
                class="rounded-sm text-lg py-1 px-2 w-full text-black transition border-3 border-raisinb focus:outline-none focus:border-malachite-2 focus:border-3" />
            </div>
          </div>

          <!-- Password input field -->
          <div class="mb-6">
            <div class="text-left mb-2">
              <label class="text-lg">Password:</label>
            </div>
            <div>
              <input
                type="password"
                class="rounded-sm text-lg py-1 px-2 w-full text-black transition border-3 border-raisinb focus:outline-none focus:border-malachite-2 focus:border-3" />
            </div>
          </div>

          <div class="text-center">
            <button class="btn-red px-3 py-2">Login</button>
          </div>
        </div>
      </form>
    </div>
  </main>
</template>

<style scoped></style>
