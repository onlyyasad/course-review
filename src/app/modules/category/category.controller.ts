import { Request, Response } from 'express'
import { CategoryServices } from './category.service'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'

const getCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryServices.getAllCategoriesFromDB()
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Categories retrieved successfully!',
    data: result,
  })
})

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const category = req.body
  const user = req.user
  const username = user?.username

  const result = await CategoryServices.createCategoryIntoDB(username, category)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Category created successfully!',
    data: result,
  })
})

export const CategoryControllers = {
  getCategories,
  createCategory,
}
