import z, { ZodError } from 'zod'
import { TErrorSources, TGenericErrorResponse } from '../interface/error'

const handleZodError = (error: ZodError): TGenericErrorResponse => {
  const statusCode = 400
  const errorSources: TErrorSources = error.issues.map(
    (issue: z.core.$ZodIssue) => {
      return {
        path: issue.path[issue.path.length - 1].toString(),
        message: issue.message,
      }
    },
  )
  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  }
}

export default handleZodError
