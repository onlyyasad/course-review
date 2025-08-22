import z from 'zod'

const createCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string({
      error: (issue) =>
        issue.code === 'invalid_type' ? 'Name must be string.' : undefined,
    }),
  }),
})

export const CategoryValidation = {
  createCategoryValidationSchema,
}
