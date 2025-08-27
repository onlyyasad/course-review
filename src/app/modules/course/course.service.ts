import { courseSortableFields } from './course.constant'
import { TCourse } from './course.interface'
import { Course } from './course.model'

const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  const page = parseInt(query.page as string) || 1
  const limit = parseInt(query.limit as string) || 10
  const skip = (page - 1) * limit

  let sort = '-createdAt'

  if (query.sortBy) {
    const sortBy = (query.sortBy as string).split(',')
    const filterSort = sortBy.filter((singleSort) =>
      courseSortableFields.includes(singleSort),
    )
    const sortWithOrder = filterSort.length
      ? filterSort.map((singleSort) => {
          if (query.sortOrder) {
            const sortOrder = query.sortOrder === 'desc' ? '-' : ''
            return `${sortOrder + singleSort}`
          }
          return singleSort
        })
      : []
    sort = sortWithOrder.length ? sortWithOrder.join(' ') : '-createdAt'
  }

  const result = await Course.find().skip(skip).limit(limit).sort(sort)
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
