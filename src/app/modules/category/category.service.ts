import { TCategory } from './category.interface'
import { Category } from './category.model'

const getAllCategoriesFromDB = async () => {
  const result = await Category.find()
  return result
}

const createCategoryIntoDB = async (payload: TCategory) => {
  const result = await Category.create(payload)
  return result
}

export const CategoryServices = {
  createCategoryIntoDB,
  getAllCategoriesFromDB,
}
