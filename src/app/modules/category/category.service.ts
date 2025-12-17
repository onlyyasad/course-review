import { User } from '../auth/auth.model'
import { TCategory } from './category.interface'
import { Category } from './category.model'

const getAllCategoriesFromDB = async () => {
  const result = await Category.find()
  return result
}

const createCategoryIntoDB = async (username: string, payload: TCategory) => {
  const user = await User.findOne({ username })
  if (user) {
    payload.createdBy = user._id
  }
  const result = await Category.create(payload)
  return result
}

export const CategoryServices = {
  createCategoryIntoDB,
  getAllCategoriesFromDB,
}
