import { Router } from 'express'
import { CategoryControllers } from './category.controller'

const router = Router()

router.get('/', (req, res) => {
  res.send('Hello Category nested route')
})

router.post('/', CategoryControllers.createCategory)

export const CategoryRoutes = router
