import { status as httpStatus } from 'http-status'
import mongoose from 'mongoose'
import { TLoginUser, TUser } from './auth.interface'
import { PasswordHistory, User } from './auth.model'
import AppError from '../../errors/appError'
import config from '../../config'
import { createToken } from './auth.utils'
import { SignOptions } from 'jsonwebtoken'

const loginUserInDB = async (payload: TLoginUser) => {
  const user = await User.isUserExistsByUsername(payload.username)
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User does not exist')
  }

  const isPasswordMatched = await User.isPasswordMatched(
    payload.password,
    user.password,
  )

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Password is incorrect')
  }

  const jwtPayload = {
    username: user.username,
    role: user.role,
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as SignOptions['expiresIn'],
  )

  return { accessToken }
}

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
  loginUserInDB,
  createUserIntoDB,
}
