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

export const zLoginForm = z.object({
  email: z.string().trim().max(config.MAX_EMAIL_LEN).regex(config.EMAIL_REGEX),
  password: z
    .string()
    .trim()
    .min(config.MIN_PASSWORD_LEN)
    .max(config.MAX_PASSWORD_LEN)
    .refine(
      pass =>
        validator.isStrongPassword(pass, {
          minLength: 6,
          minLowercase: 1,
          minUppercase: 0,
          minNumbers: 1,
          minSymbols: 0,
          returnScore: false,
        }),
      {
        message:
          'Password must be minimum 6 characters in length with minimum 1 lowercase and 1 numerical character',
      }
    ),
})
