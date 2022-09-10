import { defineStore } from 'pinia'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

import config from '../config'
// Imports above

const SIGNUP_ENDPOINT = config.BASE_API_URL + 'users/signup/'

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
      const response = await axios.post(SIGNUP_ENDPOINT, registerUser)

      if (response.status === 200) {
        const accessToken = response.data.accessToken
        this.user = jwtDecode(accessToken)
        localStorage.setItem('accessToken', accessToken)

        // FIXME: Store refreshToken in cookies
        localStorage.setItem('refreshToken', response.data.refreshToken)
      }
    },

    /** Decode accessToken that is in memory, and assign the object from the decoded `accessToken` to the `user` */
    async decodeTokenSetUser() {
      // if accessTokeen is not specified in memory or in localStorage, logout and redirect user to the login page
      {
        if (!this.accessToken) {
          this.logout()
        } else {
          try {
            this.user = jwtDecode(this.accessToken)
          } catch (err) {
            this.logout()
          }
        }
      }
    },

    logout() {
      this.user = null
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
    },
  },
})
