import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import axios, { Axios, AxiosError } from 'axios'

import config from '../config'
// Imports above

const router = useRouter()

const SIGNUP_ENDPOINT = config.BASE_API_URL + 'users/signup/'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
  }),

  actions: {
    async signup(registerUser) {
      const response = await axios.post(SIGNUP_ENDPOINT, registerUser)

      if (response.status === 200) {
        this.user = response.data
        localStorage.setItem('refreshToken', response.data.refreshToken)
        router.push({ name: 'home' })
      }
    },

    logout() {
      this.user = null
      localStorage.removeItem('user')
      router.push({ name: 'login' })
    },
  },
})
