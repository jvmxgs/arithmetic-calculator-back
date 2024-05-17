import { NextFunction, Request, Response } from 'express'
import jwt, { JsonWebTokenError } from 'jsonwebtoken'
import appConfig from '../config/app'
import { JwtPayload } from '../types/jwtPayload'

export default function (req: Request, res: Response, next: NextFunction): void {
  try {
    const authorization = req.headers.authorization ?? ''
    const [, token] = authorization.split(' ')

    if (token === undefined) {
      res.status(401).json({ error: 'No token provided' })
      return
    }

    const decodedToken = jwt.verify(token, appConfig.key) as JwtPayload
    req.body.email = decodedToken.email

    regenerateToken(res, decodedToken.email, decodedToken.exp)

    next()
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      res.status(401).json({ error: 'Invalid token!' })
      return
    }

    res.status(500).json({ error: 'Internal server error' })
  }
}

const regenerateToken = (res: Response, email: string, exp: number | undefined): void => {
  const currentTime = Math.floor(Date.now() / 1000)

  if ((exp ?? 0) - currentTime < 300) {
    const newToken = jwt.sign({ email }, appConfig.key, { expiresIn: appConfig.jwt.expiresIn })
    res.setHeader('Authorization', `Bearer ${newToken}`)
  }
}
