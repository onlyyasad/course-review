import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import { AuthService } from './auth.service'
import { TLoginUser } from './auth.interface'

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const loginData: TLoginUser = req.body

  const result = await AuthService.loginUserInDB(loginData)
  const { accessToken } = result

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    data: {
      accessToken,
    },
  })
})

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const user = req.user
  const { ...passwordData } = req.body
  const result = await AuthService.changePasswordInDB(user, passwordData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password changed successfully',
    data: result,
  })
})

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.body

  const result = await AuthService.createUserIntoDB(user)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User created successfully!',
    data: result,
  })
})

export const AuthController = {
  loginUser,
  createUser,
  changePassword,
}
