import { z } from 'zod'

import { toFormValidator } from '@vee-validate/zod'
// Imports above

const MIN_REST_LEN = 3
const MAX_REST_LEN = 32
const MIN_DESC_LEN = 4
const MAX_DESC_LEN = 256
const MAX_CUISINES_CREATION = 5

/**
 * The zod restaurant schema.
 */
const zRestaurant = z.object({
  restName: z.string().trim().min(MIN_REST_LEN).max(MAX_REST_LEN),
  restImage: z.string().trim().url().optional(),
  description: z.string().trim().min(MIN_DESC_LEN).max(MAX_DESC_LEN).optional(),
  openingTime: z.string().trim().optional(),
  closingTime: z.string().trim().optional(),
})

/**
 * The zod schema for the `Cuisines` array that will be provided when creating a new restaurant or adding cuisines to an existing restaurant.
 */
const zCuisinesArray = z
  .array(z.object({ cuisineId: z.number().int().nonnegative() }).strict())
  .max(MAX_CUISINES_CREATION)

export const restaurantSchema = toFormValidator(zRestaurant)
export const cuisineSchema = toFormValidator(zCuisinesArray)
