import httpStatus from 'http-status'
import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import { CourseServices } from './course.service'
import sendResponse from '../../utils/sendResponse'

const getAllCourse = catchAsync(async (req: Request, res: Response) => {
  const { meta, data } = await CourseServices.getAllCourseFromDB(req.query)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Courses retrieved successfully!',
    meta: meta,
    data: data,
  })
})

const createCourse = catchAsync(async (req: Request, res: Response) => {
  const course = req.body

  const result = await CourseServices.createCourseIntoDB(course)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Course created successfully!',
    data: result,
  })
})

const updateCourse = catchAsync(async (req: Request, res: Response) => {
  const { courseId } = req.params
  const payload = req.body

  const result = await CourseServices.updateCourseIntoDB(courseId, payload)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Course updated successfully!',
    data: result,
  })
})

export const CourseController = {
  getAllCourse,
  createCourse,
  updateCourse,
}
