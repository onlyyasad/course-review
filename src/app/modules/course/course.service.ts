import mongoose from 'mongoose'
import { courseSortableFields } from './course.constant'
import { TCourse, TCourseUpdates, TTag } from './course.interface'
import { Course } from './course.model'
import { User } from '../auth/auth.model'

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
          $ceil: {
            $divide: [
              {
                $subtract: ['$endDate', '$startDate'],
              },
              1000 * 60 * 60 * 24 * 7,
            ],
          },
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
const createCourseIntoDB = async (username: string, payload: TCourse) => {
  const user = await User.findOne({ username })
  if (user) {
    payload.createdBy = user._id
  }

  const result = (await Course.create(payload)).populate('createdBy')
  return result
}

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const updatedData: Record<string, unknown> = payload

  const updates: TCourseUpdates = {} as TCourseUpdates
  const setUpdates: TCourse = {} as TCourse
  const pushUpdates: { tags: TTag[] } = {} as { tags: TTag[] }

  for (const key in updatedData) {
    if (key === 'tags') {
      updates.$push = updates.$push || {}
      updates.$push[key] = updatedData[key]
    } else if (
      typeof updatedData[key] === 'object' &&
      updatedData[key] !== null &&
      !Array.isArray(updatedData[key])
    ) {
      const nestedObj = updatedData[key] as Record<string, unknown>
      for (const nestedKey in nestedObj) {
        updates.$set = updates.$set || {}
        updates.$set[`${key}.${nestedKey}`] = nestedObj[nestedKey]
      }
    } else {
      updates.$set = updates.$set || {}
      updates.$set[key] = updatedData[key]
    }
  }

  if (Object.keys(setUpdates).length) {
    updates.$set = setUpdates
  }

  if (Object.keys(pushUpdates).length) {
    updates.$push = pushUpdates
  }

  const result = await Course.findByIdAndUpdate(id, updates, { new: true })
  return result
}

const getCourseWithReviewsFromDB = async (id: string) => {
  const courseId = new mongoose.Types.ObjectId(id)

  const result = await Course.aggregate([
    { $match: { _id: courseId } },
    {
      $lookup: {
        from: 'reviews', // The name of the reviews collection
        localField: '_id',
        foreignField: 'courseId',
        as: 'reviews',
      },
    },
  ])

  return result[0]
}

const getBestCourseFromDB = async () => {
  const result = await Course.aggregate([
    {
      $lookup: {
        from: 'reviews', // The name of the reviews collection
        localField: '_id',
        foreignField: 'courseId',
        as: 'reviews',
      },
    },
    {
      $addFields: {
        averageRating: { $avg: '$reviews.rating' },
        reviewsCount: { $size: '$reviews' },
      },
    },
    {
      $sort: { averageRating: -1, reviewsCount: -1 },
    },
    {
      $limit: 1,
    },
  ])

  return result[0]
}

export const CourseServices = {
  getAllCourseFromDB,
  getBestCourseFromDB,
  createCourseIntoDB,
  updateCourseIntoDB,
  getCourseWithReviewsFromDB,
}
