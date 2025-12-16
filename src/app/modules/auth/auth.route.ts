import { Router } from 'express'
import { AuthController } from './auth.controller'
import validateRequest from '../../middlewares/validateRequest'
import { AuthValidation } from './auth.validation'
import auth from '../../middlewares/auth'
import { USER_ROLE } from './auth.constant'

const router = Router()

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.loginUser,
)

router.post(
  '/register',
  validateRequest(AuthValidation.createUserValidationSchema),
  AuthController.createUser,
)

router.post(
  '/change-password',
  auth(USER_ROLE.user),
  validateRequest(AuthValidation.passwordChangeValidationSchema),
  AuthController.changePassword,
)

export const AuthRoutes = router
