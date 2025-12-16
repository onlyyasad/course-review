import { Model, Types } from 'mongoose'
import { USER_ROLES } from './auth.constant'

export type TUserRole = (typeof USER_ROLES)[number]

export type TUser = {
  [x: string]: unknown
  username: string
  email: string
  password: string
  role: TUserRole
  passwordChangedAt?: Date
}

export type TLoginUser = {
  username: string
  password: string
}

export type TPasswordHistory = {
  userId: Types.ObjectId
  password: string
}

export interface UserModel extends Model<TUser> {
  isUserExistsByUsername(username: string): Promise<TUser>
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>
  isNewPasswordMatchedWithOldPasswords(
    plainTextPassword: string,
    hashedOldPasswords: string[],
  ): Promise<boolean>
  isJWTIssuedBeforePasswordChange(
    jwtIssuedAt: number,
    passwordChangedAt?: Date,
  ): boolean
}
