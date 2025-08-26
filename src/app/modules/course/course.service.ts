import { TCourse } from './course.interface'
import { Course } from './course.model'

const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  const page = parseInt(query.page as string) || 1
  const limit = parseInt(query.limit as string) || 10
  const skip = (page - 1) * limit

  const result = await Course.find().skip(skip).limit(limit)
  const count = await Course.countDocuments()

  const data = {
    meta: {
      page: page,
      limit: limit,
      total: count,
    },
    data: result,
  }
  return data
}
const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload)
  return result
}

export const CourseServices = {
  getAllCourseFromDB,
  createCourseIntoDB,
}
