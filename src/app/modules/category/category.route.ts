import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.send('Hello Category nested route')
})

export const CategoryRoutes = router
