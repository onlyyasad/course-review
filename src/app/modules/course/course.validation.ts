import z from 'zod'

const createTagValidationSchema = z.object({
  name: z.string(),
  isDeleted: z.boolean(),
})

const createDetailsValidationSchema = z.object({
  level: z.string(),
  description: z.string(),
})
const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    instructor: z.string(),
    categoryId: z.string(),
    price: z.number(),
    tags: z.array(createTagValidationSchema),
    startDate: z.iso.date(),
    endDate: z.iso.date(),
    language: z.string(),
    provider: z.string(),
    details: createDetailsValidationSchema,
  }),
})

export const CourseValidation = {
  createCourseValidationSchema,
  createTagValidationSchema,
  createDetailsValidationSchema,
}
