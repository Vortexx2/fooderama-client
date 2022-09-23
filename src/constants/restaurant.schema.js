import { z } from 'zod'

import { toFormValidator } from '@vee-validate/zod'
// Imports above

const MIN_REST_LEN = 3
const MAX_REST_LEN = 32
const MIN_DESC_LEN = 4
const MAX_DESC_LEN = 256
const MAX_CUISINES_CREATION = 5

/**
 * Base Restaurant zod schema
 */
const zBaseRestaurant = z.object({
  restName: z
    .string()
    .trim()
    .min(MIN_REST_LEN, {
      message: `Restaurant must have at least ${MIN_REST_LEN} characters`,
    })
    .max(MAX_REST_LEN),
  restImage: z.string().trim().url().optional(),
  description: z.string().trim().min(MIN_DESC_LEN).max(MAX_DESC_LEN).optional(),
  openingTime: z.string().trim().optional(),
  closingTime: z.string().trim().optional(),
})

/**
 * Complete zod restaurant schema with cuisines (extends `zBaseRestaurant`)
 */
const zRestaurantWithCuisines = zBaseRestaurant.extend({
  Cuisines: z.array(z.number().int().nonnegative()).max(MAX_CUISINES_CREATION, {
    message: `Select at most ${MAX_CUISINES_CREATION} cuisines`,
  }),
})
/**
 * The zod schema for the `Cuisines` array that will be provided when creating a new restaurant or adding cuisines to an existing restaurant.
 */
const zCuisinesArray = z
  .array(z.object({ cuisineId: z.number().int().nonnegative() }).strict())
  .max(MAX_CUISINES_CREATION)

export const baseRestaurantSchema = toFormValidator(zBaseRestaurant)

export const restaurantWithCuisinesSchema = toFormValidator(
  zRestaurantWithCuisines
)
