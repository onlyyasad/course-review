import { Router } from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { ReviewValidation } from './review.validation'
import { ReviewController } from './review.controller'
import auth from '../../middlewares/auth'
import { USER_ROLE } from '../auth/auth.constant'

const router = Router()

router.get('/', ReviewController.getAllReviews)

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(ReviewValidation.reviewCreateValidationSchema),
  ReviewController.createReview,
)

export const ReviewRoutes = router
