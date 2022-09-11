import { defineStore } from 'pinia'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

import config from '../config'
// Imports above

const SIGNUP_ENDPOINT = config.BASE_API_URL + 'users/signup/'
const REFRESH_ENDPOINT = config.BASE_API_URL + 'users/refresh/'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    accessToken: localStorage.getItem('accessToken'),
  }),

  getters: {
    isLoggedIn() {
      return this.user ? true : false
    },
  },

  actions: {
    async signup(registerUser) {
      const response = await axios.post(SIGNUP_ENDPOINT, registerUser, {
        withCredentials: true,
      })

      if (response.status === 200) {
        const { accessToken } = response.data
        this.accessToken = accessToken
        localStorage.setItem('accessToken', accessToken)

        this.decodeTokenSetUser()
      }
    },

    async refreshAccessToken() {
      try {
        const response = await axios.get(REFRESH_ENDPOINT, {
          withCredentials: true,
        })

        if (response.status === 200) {
          const { accessToken } = response.data
          this.accessToken = accessToken
          localStorage.setItem('accessToken', accessToken)

          this.decodeTokenSetUser()
        }
      } catch (err) {
        this.logout()
      }
    },

    /** Decode accessToken that is in memory, and assign the object from the decoded `accessToken` to the `user` */
    decodeTokenSetUser() {
      // if accessToken is not specified in memory or in localStorage, logout and redirect user to the login page

      try {
        this.user = jwtDecode(this.accessToken)
      } catch (err) {
        this.logout()
      }
    },

    logout() {
      this.user = null
      localStorage.removeItem('accessToken')
    },
  },
})
