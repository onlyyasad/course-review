import { model, Schema } from 'mongoose'
import { TPasswordHistory, TUser, UserModel } from './auth.interface'
import { USER_ROLES } from './auth.constant'
import bcrypt from 'bcrypt'
import config from '../../config'

const userSchema = new Schema<TUser>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: USER_ROLES, required: true },
    passwordChangedAt: {
      type: Date,
      select: false,
    },
  },
  { timestamps: true },
)

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  )
  next()
})

const passwordHistorySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
)

userSchema.statics.isUserExistsByUsername = async function (username: string) {
  const existingUser = await User.findOne({ username }).select('+password')
  return existingUser
}

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword: string,
  hashedPassword: string,
) {
  const isPasswordMatched = await bcrypt.compare(
    plainTextPassword,
    hashedPassword,
  )
  return isPasswordMatched
}

userSchema.statics.isNewPasswordMatchedWithOldPasswords = async function (
  plainTextPassword: string,
  hashedOldPasswords: string[],
) {
  let isPasswordMatched = false
  if (hashedOldPasswords.length === 0) {
    return isPasswordMatched
  }
  for (const hashedPassword of hashedOldPasswords) {
    isPasswordMatched = await bcrypt.compare(plainTextPassword, hashedPassword)
    if (isPasswordMatched) {
      return isPasswordMatched
    }
  }
  return isPasswordMatched
}

userSchema.statics.isJWTIssuedBeforePasswordChange = function (
  jwtIssuedAt: number,
  passwordChangedAt?: Date,
) {
  if (passwordChangedAt) {
    const passwordChangedAtInSeconds = Math.floor(
      new Date(passwordChangedAt).getTime() / 1000,
    )
    return jwtIssuedAt < passwordChangedAtInSeconds
  }
  return false
}

export const User = model<TUser, UserModel>('User', userSchema)

export const PasswordHistory = model<TPasswordHistory>(
  'PasswordHistory',
  passwordHistorySchema,
)
