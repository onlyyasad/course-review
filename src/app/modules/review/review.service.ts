import { User } from '../auth/auth.model'
import { TReview } from './review.interface'
import { Review } from './review.model'

const getAllReviewsFromDB = async (): Promise<TReview[]> => {
  const result = await Review.find()
  return result
}

const createReviewIntoDB = async (
  username: string,
  review: TReview,
): Promise<TReview> => {
  const user = await User.findOne({ username })
  if (user) {
    review.createdBy = user._id
  }

  const result = (await Review.create(review)).populate('createdBy')
  return result
}

export const ReviewService = {
  getAllReviewsFromDB,
  createReviewIntoDB,
}
