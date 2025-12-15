import { status as httpStatus } from 'http-status'
import mongoose from 'mongoose'
import { TUser } from './auth.interface'
import { PasswordHistory, User } from './auth.model'
import AppError from '../../errors/appError'

const createUserIntoDB = async (userData: TUser) => {
  const session = await mongoose.startSession()
  try {
    session.startTransaction()

    const user = await User.create([userData], { session })

    if (!user.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user.')
    }

    const userId = user[0]._id
    const password = user[0].password

    const passwordHistoryPayload = {
      userId,
      password,
    }

    await PasswordHistory.create([passwordHistoryPayload], { session })

    await session.commitTransaction()
    await session.endSession()

    const newUser = user[0]
    newUser.password = ''
    return newUser
  } catch (_error) {
    await session.abortTransaction()
    session.endSession()
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student.')
  }
}

export const AuthService = {
  createUserIntoDB,
}
