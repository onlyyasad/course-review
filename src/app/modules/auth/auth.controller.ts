import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import { AuthService } from './auth.service'

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
  createUser,
}
