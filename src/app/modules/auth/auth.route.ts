import { Router } from 'express'
import { AuthController } from './auth.controller'

const router = Router()

router.post('/login', (req, res) => {
  res.send('Login route')
})

router.post('/register', AuthController.createUser)

router.post('/change-password', (req, res) => {
  res.send('Change Password route')
})

export const AuthRoutes = router
