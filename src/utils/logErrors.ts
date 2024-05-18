import { NextFunction, Request, Response } from 'express'
import logger from './logger'

function logErrors (err: Error, req: Request, res: Response, next: NextFunction): void {
  logger.error(err.stack)
}

export default logErrors
