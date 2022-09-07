import z from 'zod'
import validator from 'validator'
// Imports above

const config = {
  EMAIL_REGEX:
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  MAX_EMAIL_LEN: 256,
  MIN_PASSWORD_LEN: 6,
  MAX_PASSWORD_LEN: 30,
}

/** The zod parser object with custom logic for password with strength */
export const zLoginForm = z.object({
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
    .trim()
    .refine(
      pass =>
        validator.isStrongPassword(pass, {
          minLength: 6,
          minLowercase: 1,
          minUppercase: 0,
          minNumbers: 1,
          minSymbols: 0,
          returnScore: false,
        }) &&
        validator.isLength(pass, {
          max: config.MAX_PASSWORD_LEN,
        }),
      {
        message: `Password must be between ${config.MIN_PASSWORD_LEN} and ${config.MAX_PASSWORD_LEN} characters in length, with minimum 1 lowercase and 1 numerical character`,
      }
    ),
})

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
      .trim()
      .refine(
        pass =>
          validator.isStrongPassword(pass, {
            minLength: 6,
            minLowercase: 1,
            minUppercase: 0,
            minNumbers: 1,
            minSymbols: 0,
            returnScore: false,
          }) &&
          validator.isLength(pass, {
            max: config.MAX_PASSWORD_LEN,
          }),
        {
          message:
            'Password must be between 6 and 30 characters in length, with minimum 1 lowercase and 1 numerical character',
        }
      ),

    confirmPassword: z.string().trim(),
  })
  .refine(obj => obj.password === obj.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
  .transform(obj => {
    return {
      email: obj.email,
      password: obj.password,
    }
  })
