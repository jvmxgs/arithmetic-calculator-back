import { Request, Response, NextFunction } from 'express'

export default function (req: Request, res: Response, next: NextFunction): void {
  console.log(' here is auth middleware')
  next()
}
