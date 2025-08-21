import { Request, Response } from 'express'
import { CategoryServices } from './category.service'

const createCategory = async (req: Request, res: Response) => {
  const category = req.body

  const result = await CategoryServices.createCategoryIntoDB(category)
  res.send({
    success: true,
    message: 'Category created successfully!',
    data: result,
  })
}

export const CategoryControllers = {
  createCategory,
}
