import httpStatus from 'http-status'
import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import { CourseServices } from './course.service'
import sendResponse from '../../utils/sendResponse'

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
  createCourse,
}
