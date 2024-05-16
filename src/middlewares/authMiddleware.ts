import { NextFunction, Request, Response } from 'express'
import jwt, { JsonWebTokenError } from 'jsonwebtoken'
import appConfig from '../config/app'

export default function (req: Request, res: Response, next: NextFunction): void {
  try {
    const authorization = req.headers.authorization ?? ''
    const [, token] = authorization.split(' ')

    if (token === undefined) {
      res.status(401).json({ error: 'No token provided' })
      return
    }

    jwt.verify(token, appConfig.key)

    next()
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      res.status(401).json({ error: 'Invalid token!' })
      return
    }

    res.status(500).json({ error: 'Internal server error' })
  }
}
