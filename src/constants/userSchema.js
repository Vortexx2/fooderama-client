import z from 'zod'
import { toFormValidator } from '@vee-validate/zod'
// Imports above

const config = {
  EMAIL_REGEX:
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  PASSWORD_REGEX: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
  MAX_EMAIL_LEN: 256,
  MIN_PASSWORD_LEN: 6,
  MAX_PASSWORD_LEN: 30,
}

export const zSignupForm = z
  .object({
    email: z
      .string()
      .trim()
      .max(config.MAX_EMAIL_LEN, {
        message: 'Email must have at most 256 characters',
      })
      .regex(config.EMAIL_REGEX, {
        message: 'Email is not valid',
      }),
    password: z
      .string()
      .min(
        config.MIN_PASSWORD_LEN,
        `Password must be at least ${config.MIN_PASSWORD_LEN} characters in length`
      )
      .max(
        config.MAX_PASSWORD_LEN,
        `Password must be less than ${config.MAX_PASSWORD_LEN} characters in length`
      )
      .regex(
        config.PASSWORD_REGEX,
        'Password must have at least 1 character and 1 number'
      ),
    confirmPassword: z.string(),
  })
  .refine(obj => obj.password === obj.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export const signupSchema = toFormValidator(zSignupForm)
