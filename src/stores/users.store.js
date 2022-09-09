import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

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
        const accessToken = response.data.accessToken
        this.user = jwtDecode(accessToken)
        localStorage.setItem('refreshToken', response.data.refreshToken)
      }
    },

    logout() {
      this.user = null
      localStorage.removeItem('user')
      router.push({ name: 'login' })
    },
  },
})
