import { status as httpStatus } from 'http-status'
import mongoose from 'mongoose'
import { TLoginUser, TUser } from './auth.interface'
import { PasswordHistory, User } from './auth.model'
import AppError from '../../errors/appError'
import config from '../../config'
import { createToken } from './auth.utils'
import { JwtPayload, SignOptions } from 'jsonwebtoken'
import bcrypt from 'bcrypt'

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

const changePasswordInDB = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  const user = await User.isUserExistsByUsername(userData.username)
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found.')
  }

  const passwordHistory = await PasswordHistory.find({
    userId: user._id,
  }).sort({ createdAt: -1 })
  const oldPasswords = passwordHistory.map((ph) => ph.password)

  const isPasswordMatched = await User.isPasswordMatched(
    payload.oldPassword,
    user.password,
  )

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Password is incorrect.')
  }

  const isNewPasswordUsedBefore =
    await User.isNewPasswordMatchedWithOldPasswords(
      payload.newPassword,
      oldPasswords,
    )

  if (isNewPasswordUsedBefore) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'New password must not be same as previous passwords.',
    )
  }

  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  )

  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    await User.findOneAndUpdate(
      { username: userData.username, role: userData.role },
      {
        password: newHashedPassword,
        passwordChangedAt: new Date(),
      },
      { session },
    )
    await PasswordHistory.create(
      [
        {
          userId: user._id,
          password: newHashedPassword,
        },
      ],
      { session },
    )
    if (passwordHistory.length >= Number(config.password_history_limit)) {
      const passwordsToDelete = passwordHistory
        .slice(Number(config.password_history_limit) - 1)
        .map((ph) => ph._id)

      await PasswordHistory.deleteMany(
        { _id: { $in: passwordsToDelete } },
        { session },
      )
    }
    await session.commitTransaction()
    await session.endSession()
    return null
  } catch (_error) {
    await session.abortTransaction()
    await session.endSession()

    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to change password.')
  }
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
  changePasswordInDB,
  createUserIntoDB,
}
