/**
 * Function that returns the object for displaying fields to fill in the form for registration of a restaurant.
 * @param {boolean} includeOpen decides if the `open` field should be included in the returned object
 * @returns the object with the fields that need to be entered to register a restaurant
 */
export const restaurantFormFields = (includeOpen = false) => {
  const returnObj = {
    restName: {
      value: '',
      type: 'text',
      required: true,
      displayField: 'Restaurant Name',
    },
    description: {
      value: '',
      type: 'text',
      required: false,
      displayField: 'Description',
    },
    openingTime: {
      value: '',
      type: 'text',
      required: false,
      displayField: 'Opening Time',
    },
    closingTime: {
      value: '',
      type: 'text',
      required: false,
      displayField: 'Closing Time',
    },
  }

  if (includeOpen)
    returnObj['open'] = {
      value: false,
      type: 'checkbox',
      required: false,
      displayField: 'Is Restaurant Open?',
    }

  return returnObj
}

/**
 * @returns the object with correct structure for restData in the restaurant-card component
 */
export const restaurantResponseProp = {
  restId: Number,
  restName: String,
  restImage: String,
  description: String,
  open: Boolean,
  rating: Number,
  openingTime: String,
  closingTime: String,
}
