import { Router } from 'express'
import { CategoryControllers } from './category.controller'
import validateRequest from '../../middlewares/validateRequest'
import { CategoryValidation } from './category.validation'
import auth from '../../middlewares/auth'
import { USER_ROLE } from '../auth/auth.constant'

const router = Router()

router.get('/', CategoryControllers.getCategories)

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(CategoryValidation.createCategoryValidationSchema),
  CategoryControllers.createCategory,
)

export const CategoryRoutes = router
