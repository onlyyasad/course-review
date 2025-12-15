import z from 'zod'
import { USER_ROLES } from './auth.constant'

const createUserValidationSchema = z.object({
  body: z.object({
    username: z.string().min(1, 'Username is required'),
    email: z.email('Invalid email'),
    password: z.string().max(20),
    role: z.enum(USER_ROLES),
  }),
})

const loginValidationSchema = z.object({
  body: z.object({
    username: z.string(),
    password: z.string(),
  }),
})

const passwordChangeValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string(),
    newPassword: z.string(),
  }),
})

export const AuthValidation = {
  createUserValidationSchema,
  loginValidationSchema,
  passwordChangeValidationSchema,
}
