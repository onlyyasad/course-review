import httpStatus from 'http-status'
import { NextFunction, Request, Response } from 'express'
const notFound = (req: Request, res: Response, _next: NextFunction) => {
  const statusCode = httpStatus.NOT_FOUND
  const message = 'API Not Found!'

  res.status(statusCode).json({
    success: false,
    statusCode: httpStatus.NOT_FOUND,
    message: message,
    error: '',
  })
}

export default notFound
