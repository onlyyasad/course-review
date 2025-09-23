import { Router } from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { ReviewValidation } from './review.validation'
import { ReviewController } from './review.controller'

const router = Router()

router.get('/', ReviewController.getAllReviews)

router.post(
  '/',
  validateRequest(ReviewValidation.reviewCreateValidationSchema),
  ReviewController.createReview,
)

export const ReviewRoutes = router
