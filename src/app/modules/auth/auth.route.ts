import { Router } from 'express'
import { AuthController } from './auth.controller'
import validateRequest from '../../middlewares/validateRequest'
import { AuthValidation } from './auth.validation'

const router = Router()

router.post('/login', (req, res) => {
  res.send('Login route')
})

router.post(
  '/register',
  validateRequest(AuthValidation.createUserValidationSchema),
  AuthController.createUser,
)

router.post('/change-password', (req, res) => {
  res.send('Change Password route')
})

export const AuthRoutes = router
