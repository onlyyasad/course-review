import { Types } from 'mongoose'
import { USER_ROLES } from './auth.constant'

export type TUserRole = (typeof USER_ROLES)[number]

export type TUser = {
  username: string
  email: string
  password: string
  role: TUserRole
}

export type TPasswordHistory = {
  userId: Types.ObjectId
  password: string
}
