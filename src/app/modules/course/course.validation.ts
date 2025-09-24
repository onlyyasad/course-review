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

const updateDetailsValidationSchema = z.object({
  level: z.string().optional(),
  description: z.string().optional(),
})

const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    instructor: z.string().optional(),
    categoryId: z.string().optional(),
    price: z.number().optional(),
    tags: z.array(createTagValidationSchema).optional(),
    startDate: z.iso.date().optional(),
    endDate: z.iso.date().optional(),
    language: z.string().optional(),
    provider: z.string().optional(),
    details: updateDetailsValidationSchema.optional(),
  }),
})

export const CourseValidation = {
  createCourseValidationSchema,
  createTagValidationSchema,
  createDetailsValidationSchema,
  updateCourseValidationSchema,
}
