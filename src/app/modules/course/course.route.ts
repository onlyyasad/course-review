import { Router } from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { CourseValidation } from './course.validation'
import { CourseController } from './course.controller'

const router = Router()

router.post(
  '/',
  validateRequest(CourseValidation.createCourseValidationSchema),
  CourseController.createCourse,
)

export const CourseRoutes = router
