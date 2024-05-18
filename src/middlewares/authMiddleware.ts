import { NextFunction, Request, Response } from 'express'
import jwt, { JsonWebTokenError } from 'jsonwebtoken'
import appConfig from '../config/app'
import { JwtPayload } from '../types/jwtPayload'
import { sendErrorResponse } from '../utils/responses'

export default function (req: Request, res: Response, next: NextFunction): void {
  try {
    const authorization = req.headers.authorization ?? ''
    const [, token] = authorization.split(' ')

    if (token === undefined) {
      sendErrorResponse(res, 'No token provided', 401)
      return
    }

    const decodedToken = jwt.verify(token, appConfig.key) as JwtPayload
    req.body.user = { email: decodedToken.email }

    regenerateToken(res, decodedToken.email, decodedToken.exp)

    next()
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      sendErrorResponse(res, 'Invalid token', 401)
      return
    }

    sendErrorResponse(res, 'Internal server error')
  }
}

const regenerateToken = (res: Response, email: string, exp: number | undefined): void => {
  const currentTime = Math.floor(Date.now() / 1000)

  if ((exp ?? 0) - currentTime < 300) {
    const newToken = jwt.sign({ email }, appConfig.key, { expiresIn: appConfig.jwt.expiresIn })
    res.setHeader('Authorization', `Bearer ${newToken}`)
  }
}
