import { defineStore } from 'pinia'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

import config from '../config'
// Imports above

const SIGNUP_ENDPOINT = config.BASE_API_URL + 'users/signup/'
const LOGIN_ENDPOINT = config.BASE_API_URL + 'users/login'
const LOGOUT_ENDPOINT = config.BASE_API_URL + 'users/logout'
const REFRESH_ENDPOINT = config.BASE_API_URL + 'users/refresh/'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    accessToken: localStorage.getItem('accessToken'),
  }),

  getters: {
    /** checks if `accessToken` exists */
    isLoggedIn() {
      return this.accessToken ? true : false
    },

    /** checks if the role of the user in state is admin */
    isAdmin() {
      return this.user && this.user.role === 'admin'
    },
    /** checks if the role of the user in state is manager */
    isManager() {
      return this.user && this.user.role === 'manager'
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

        await this.decodeTokenSetUser()
      }
    },

    async login(loginUser) {
      const response = await axios.post(LOGIN_ENDPOINT, loginUser, {
        withCredentials: true,
      })

      if (response.status === 200) {
        const { accessToken } = response.data
        this.accessToken = accessToken
        localStorage.setItem('accessToken', accessToken)

        await this.decodeTokenSetUser()
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

          await this.decodeTokenSetUser()
        }
      } catch (err) {
        console.log(err)
        await this.logout()
      }
    },

    /** Decode accessToken that is in memory, and assign the object from the decoded `accessToken` to the `user` */
    async decodeTokenSetUser() {
      // if accessToken is not specified in memory or in localStorage, logout and redirect user to the login page

      try {
        this.user = jwtDecode(this.accessToken)
      } catch (err) {
        await this.logout()
      }
    },

    async logout() {
      this.user = null
      localStorage.removeItem('accessToken')

      const response = await axios.get(LOGOUT_ENDPOINT, {
        withCredentials: true,
      })
    },
  },
})
