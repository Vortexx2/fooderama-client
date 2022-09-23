import axios from 'axios'
import { defineStore } from 'pinia'

import config from '../config'
import { useUserStore } from './users.store'
// Imports above

const userStore = useUserStore()

const RESTAURANTS_ENDPOINT = config.BASE_API_URL + 'restaurants'
const CUISINES_ENDPOINT = config.BASE_API_URL + 'cuisines'

export const useRestaurantStore = defineStore('restaurants', {
  state: () => {
    return {
      /** Array containing all of the fetched restaurants */
      restData: [],

      /** All of the cuisines available in the DB */
      cuisines: [],

      /** Indicates if the restaurants have still not been fetched */
      isLoading: true,

      /** If the fetching is failed, changes to true */
      fetchError: false,
      cuisineFieldsToShow: ['cuisineName'],
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

    getRestaurant: state => {
      return restId => {
        return state.restData.find(restObj => restObj.restId === restId)
      }
    },
  },
  actions: {
    async fetchRestaurants(url = RESTAURANTS_ENDPOINT) {
      const response = await axios.get(url)

      if (response.status === 200) {
        this.restData = response.data
      }
    },

    async fetchCuisines(url = CUISINES_ENDPOINT) {
      const response = await axios.get(url)

      if (response.status === 200) {
        this.cuisines = response.data
      }
    },

    /**
     * An asynchronous loop that checks the backend for restaurants for `totalTries` number of times every `fetchInterval` ms. Uses `setInterval` with regular checks to see if the request has been resolved.
     * @param {number} fetchInterval the interval at which to try the backend for information
     * @param {number} totalTries the number of times to try the backend
     */
    fetchRestaurantsLoop(url, fetchInterval, totalTries) {
      let numTries = 1

      // if the initial network request fails
      this.fetchRestaurants(url).catch(() => {
        // every `fetchInterval` ms, execute a network request and increment the `numTries` var
        let timerId = setInterval(() => {
          //  check if numTries is still lesser than totalTries
          if (numTries < totalTries) {
            numTries++

            // if this.fetchRestaurants succeeds stop all new interval calls in the future
            this.fetchRestaurants(url).then(() => clearInterval(timerId))
          } else {
            // if `numTries` has exceeded `totalTries` stop fetching for the resource

            clearInterval(timerId)
          }
        }, fetchInterval)
      })
    },

    async createRestaurant(creationObject, url = RESTAURANTS_ENDPOINT) {
      const response = await axios.post(url, creationObject, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${userStore.accessToken}`,
        },
      })

      if (response.status === 200) {
        await this.fetchRestaurants()
      }
    },
  },
})
