import { courseSortableFields } from './course.constant'
import { TCourse } from './course.interface'
import { Course } from './course.model'

const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  const {
    minPrice,
    maxPrice,
    tags,
    startDate,
    endDate,
    language,
    provider,
    durationInWeeks,
    level,
    sortBy,
    sortOrder,
    page: pageNumber,
    limit: perPage,
  } = query

  const queryFilter: Record<string, unknown> = {}

  const page = parseInt(pageNumber as string) || 1
  const limit = parseInt(perPage as string) || 10
  const skip = (page - 1) * limit

  let sort = '-createdAt'

  if (sortBy) {
    const sortByArray = (sortBy as string).split(',')
    const filterSort = sortByArray.filter((singleSort) =>
      courseSortableFields.includes(singleSort),
    )
    const sortWithOrder = filterSort.length
      ? filterSort.map((singleSort) => {
          if (sortOrder) {
            const sortByOrder = sortOrder === 'desc' ? '-' : ''
            return `${sortByOrder + singleSort}`
          }
          return singleSort
        })
      : []
    sort = sortWithOrder.length ? sortWithOrder.join(' ') : '-createdAt'
  }

  if (minPrice || maxPrice) {
    if (minPrice) {
      queryFilter.price = { $gte: Number(minPrice) }
    }
    if (maxPrice) {
      queryFilter.price = { $lte: Number(maxPrice) }
    }
  }

  if (tags) {
    queryFilter.tags = { $elemMatch: { name: tags } }
  }

  if (startDate) {
    queryFilter.startDate = startDate
  }

  if (endDate) {
    queryFilter.endDate = endDate
  }

  if (language) {
    queryFilter.language = language
  }

  if (provider) {
    queryFilter.provider = provider
  }

  if (level) {
    queryFilter['details.level'] = level
  }

  if (durationInWeeks) {
    queryFilter.$expr = {
      $gte: [
        {
          $divide: [
            {
              $subtract: ['$endDate', '$startDate'],
            },
            1000 * 60 * 60 * 24 * 7,
          ],
        },
        Number(durationInWeeks),
      ],
    }
  }

  const result = await Course.find(queryFilter)
    .skip(skip)
    .limit(limit)
    .sort(sort)
  const total = result.length

  const data = {
    meta: {
      page: page,
      limit: limit,
      total: total,
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
