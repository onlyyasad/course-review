import { Router } from 'express'
import { CategoryControllers } from './category.controller'
import validateRequest from '../../middlewares/validateRequest'
import { CategoryValidation } from './category.validation'

const router = Router()

router.get('/', CategoryControllers.getCategories)

router.post(
  '/',
  validateRequest(CategoryValidation.createCategoryValidationSchema),
  CategoryControllers.createCategory,
)

export const CategoryRoutes = router
