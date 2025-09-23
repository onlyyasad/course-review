import { Router } from 'express'
import { CategoryRoutes } from '../modules/category/category.route'
import { CourseRoutes } from '../modules/course/course.route'
import { ReviewRoutes } from '../modules/review/review.route'

const router = Router()

const moduleRoutes = [
  {
    path: '/categories',
    route: CategoryRoutes,
  },
  {
    path: '/course',
    route: CourseRoutes,
  },
  {
    path: '/review',
    route: ReviewRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
