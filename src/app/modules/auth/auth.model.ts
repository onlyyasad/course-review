import { model, Schema } from 'mongoose'
import { TPasswordHistory, TUser } from './auth.interface'
import { USER_ROLES } from './auth.constant'

const userSchema = new Schema<TUser>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: USER_ROLES, required: true },
  },
  { timestamps: true },
)

const passwordHistorySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
)

export const User = model<TUser>('User', userSchema)

export const PasswordHistory = model<TPasswordHistory>(
  'PasswordHistory',
  passwordHistorySchema,
)
