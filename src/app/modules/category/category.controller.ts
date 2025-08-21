import { Request, Response } from 'express'
import { CategoryServices } from './category.service'

const getCategories = async (req: Request, res: Response) => {
  const result = await CategoryServices.getAllCategoriesFromDB()
  res.send({
    success: true,
    statusCode: 201,
    data: result,
  })
}

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
  getCategories,
  createCategory,
}
