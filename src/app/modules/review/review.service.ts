import { TReview } from './review.interface'
import { Review } from './review.model'

const getAllReviewsFromDB = async (): Promise<TReview[]> => {
  const result = await Review.find()
  return result
}

const createReviewIntoDB = async (review: TReview): Promise<TReview> => {
  const result = await Review.create(review)
  return result
}

export const ReviewService = {
  getAllReviewsFromDB,
  createReviewIntoDB,
}
