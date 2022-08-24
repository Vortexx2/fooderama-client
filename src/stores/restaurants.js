import axios from 'axios'
import { defineStore } from 'pinia'
// Imports above

const RESTAURANTS_ENDPOINT = 'http://localhost:4000/api/v1/restaurants'

export const useRestaurantStore = defineStore('restaurants', {
  state: () => {
    return {
      /** Array containing all of the fetched restaurants */
      restData: [],

      /** Indicates if the restaurants have still not been fetched */
      isLoading: true,

      /** If the fetching is failed, changes to true */
      fetchError: false,
    }
  },
  getters: {
    /**
     * `searchedRestaurants(searchQuery)` is used to filter the already stored restaurants by search query. It searches restaurant based on the restaurant name and the cuisines it has.
     * @param {object} state state used to access the restData
     * @returns
     */
    searchedRestaurants: state => {
      return searchQuery => {
        if (searchQuery === '') {
          return state.restData
        }

        return state.restData.filter(restaurant => {
          // check every restaurants name and cuisines
          return searchQuery
            .toLowerCase()
            .split(' ')
            .every(word => {
              // check if search query is in the name of the restaurant
              const isInRestName = restaurant.restName
                .toLowerCase()
                .includes(word)

              // and return true
              if (isInRestName) return true

              // check if search query is in any of the cuisines associated with the restaurant and return true even if it exists on one of the cuisines
              return restaurant.Cuisines.some(cuisine =>
                cuisine.cuisineName.toLowerCase().includes(word)
              )
            })
        })
      }
    },
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
