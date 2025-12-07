import { model, Schema } from 'mongoose'
import { TPasswordHistory, TUser } from './auth.interface'
import { USER_ROLES } from './auth.constant'
import bcrypt from 'bcrypt'
import config from '../../config'

const userSchema = new Schema<TUser>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: USER_ROLES, required: true },
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

userSchema.post('save', function (doc, next) {
  doc.password = ''
  next()
})

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
