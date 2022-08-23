import axios from 'axios'
import { defineStore } from 'pinia'
// Imports above

const RESTAURANTS_ENDPOINT = 'http://localhost:4000/api/v1/restaurants'

export const useRestaurantStore = defineStore('restaurants', {
  state: () => {
    return {
      restData: [],
      isLoading: true,
      fetchError: false,
    }
  },
  actions: {
    async fetchRestaurants(url = RESTAURANTS_ENDPOINT) {
      this.restData = (await axios.get(url)).data
      this.isLoading = false
    },

    /**
     * An asynchronous loop that checks the backend for restaurants for `totalTries` number of times every `fetchInterval` ms. Uses `setInterval` with regular checks to see if the request has been resolved.
     * @param {number} fetchInterval the interval at which to try the backend for information
     * @param {number} totalTries the number of times to try the backend
     */
    fetchRestaurantsLoop(url, fetchInterval, totalTries) {
      let numTries = 1

      // if the initial network request fails
      this.fetchRestaurants(url).catch(err => {
        // every `fetchInterval` ms, execute a network request and increment the `numTries` var
        let timerId = setInterval(() => {
          //  check if numTries is still lesser than totalTries
          if (numTries < totalTries) {
            numTries++

            // if this.fetchRestaurants succeeds stop all new interval calls in the future
            this.fetchRestaurants(url).then(() => clearInterval(timerId))
          } else {
            // if `numTries` has exceeded `totalTries` stop fetching for the resource

            this.fetchError = true
            clearInterval(timerId)
          }
        }, fetchInterval)
      })
    },
  },
})
