/**
 * Function that returns the object for displaying fields to fill in the form for registration of a restaurant.
 * @returns the object with the fields that need to be entered to register a restaurant
 */
export const restaurantFormFields = (includeOpen = false) => {
  const returnObj = {
    restName: {
      value: '',
      required: true,
      displayField: 'Restaurant Name',
    },
    description: {
      value: '',
      required: false,
      displayField: 'Description',
    },
    openingTime: {
      value: '',
      required: false,
      displayField: 'Opening Time',
    },
    closingTime: {
      value: '',
      required: false,
      displayField: 'Closing Time',
    },
  }

  if (includeOpen)
    returnObj['open'] = {
      value: false,
      required: true,
      displayField: 'Is Restaurant Open?',
    }

  return returnObj
}

/**
 * @returns the object with correct structure for restData in the restaurant-card component
 */
export const restaurantResponseProp = () => {
  return {
    restId: Number,
    restName: String,
    description: String,
    open: Boolean,
    rating: Number,
    openingTime: String,
    closingTime: String,
  }
}
