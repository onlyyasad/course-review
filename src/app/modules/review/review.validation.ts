import z from 'zod'

const reviewCreateValidationSchema = z.object({
  body: z.object({
    courseId: z.string('Course id is required'),
    rating: z
      .number('Rating is required')
      .min(1, 'Rating must be at least 1')
      .max(5, 'Rating must be at most 5'),
    review: z.string('Review is required'),
  }),
})

export const ReviewValidation = {
  reviewCreateValidationSchema,
}
