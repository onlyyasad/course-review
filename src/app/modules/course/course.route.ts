import { Router } from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { CourseValidation } from './course.validation'
import { CourseController } from './course.controller'
import auth from '../../middlewares/auth'
import { USER_ROLE } from '../auth/auth.constant'

const router = Router()

router.get('/', CourseController.getAllCourse)

router.get('/best', CourseController.getBestCourse)

router.get('/:courseId/reviews', CourseController.getCourseWithReviews)

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(CourseValidation.createCourseValidationSchema),
  CourseController.createCourse,
)

router.put(
  '/:courseId',
  auth(USER_ROLE.admin),
  validateRequest(CourseValidation.updateCourseValidationSchema),
  CourseController.updateCourse,
)

export const CourseRoutes = router
