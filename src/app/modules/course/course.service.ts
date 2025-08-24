import { TCourse } from './course.interface'
import { Course } from './course.model'

const getAllCourseFromDB = async () => {
  const result = await Course.find()
  return result
}
const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload)
  return result
}

export const CourseServices = {
  getAllCourseFromDB,
  createCourseIntoDB,
}
