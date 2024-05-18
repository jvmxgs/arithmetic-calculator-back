import { Response } from 'express'
import { ValidationError } from 'express-validator'

export const sendSuccessResponse = (
  res: Response,
  data: object,
  message: string = 'Success',
  statusCode: number = 200
): Response => {
  return res.status(statusCode).json({
    status: 'success',
    message,
    data
  })
}

export const sendErrorResponse = (
  res: Response,
  message: string,
  statusCode: number = 500,
  errors?: string[] | ValidationError[]
): Response => {
  const response = {
    status: 'error',
    message,
    errors
  }

  return res.status(statusCode).json(response)
}
