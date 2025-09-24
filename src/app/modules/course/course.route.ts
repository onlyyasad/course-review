import { Router } from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { CourseValidation } from './course.validation'
import { CourseController } from './course.controller'

const router = Router()

router.get('/', CourseController.getAllCourse)

router.get('/best', CourseController.getBestCourse)

router.get('/:courseId/reviews', CourseController.getCourseWithReviews)

router.post(
  '/',
  validateRequest(CourseValidation.createCourseValidationSchema),
  CourseController.createCourse,
)

router.put(
  '/:courseId',
  validateRequest(CourseValidation.updateCourseValidationSchema),
  CourseController.updateCourse,
)

export const CourseRoutes = router
