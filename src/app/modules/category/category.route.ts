import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.send('Hello Category nested route')
})

router.post('/', (req, res) => {
  const body = req.body
  res.send({
    success: true,
    data: body,
  })
})

export const CategoryRoutes = router
