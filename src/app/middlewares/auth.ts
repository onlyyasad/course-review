import { NextFunction, Request, Response } from 'express'
import catchAsync from '../utils/catchAsync'
import AppError from '../errors/appError'
import { status as httpStatus } from 'http-status'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../config'
import { User } from '../modules/auth/auth.model'

const auth = (...requiredRoles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization

    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized to access this resource.',
      )
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload

    const { role, username, iat } = decoded

    const user = await User.isUserExistsByUsername(username)
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found.')
    }

    if (
      user.passwordChangedAt &&
      User.isJWTIssuedBeforePasswordChange(
        iat as number,
        user.passwordChangedAt,
      )
    ) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        'You are not authorized to access this resource.',
      )
    }

    if (requiredRoles && !requiredRoles.includes(role as string)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized to access this resource.',
      )
    }

    req.user = decoded as JwtPayload
    next()
  })
}

export default auth
