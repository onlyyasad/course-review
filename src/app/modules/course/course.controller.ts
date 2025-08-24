import httpStatus from 'http-status'
import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import { CourseServices } from './course.service'
import sendResponse from '../../utils/sendResponse'

const getAllCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseServices.getAllCourseFromDB()

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Courses retrieved successfully!',
    data: result,
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

export const CourseController = {
  getAllCourse,
  createCourse,
}
