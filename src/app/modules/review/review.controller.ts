import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import { ReviewService } from './review.service'

const getAllReviews = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.getAllReviewsFromDB()
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Reviews retrieved successfully!',
    data: result,
  })
})

const createReview = catchAsync(async (req: Request, res: Response) => {
  const review = req.body
  const result = await ReviewService.createReviewIntoDB(review)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Review created successfully!',
    data: result,
  })
})

export const ReviewController = {
  getAllReviews,
  createReview,
}
