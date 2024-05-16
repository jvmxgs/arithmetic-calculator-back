import { NextFunction, Request, Response } from 'express'
import jwt, { JsonWebTokenError, JwtPayload } from 'jsonwebtoken'
import appConfig from '../config/app'

export default function (req: Request, res: Response, next: NextFunction): void {
  try {
    const authorization = req.headers.authorization ?? ''
    const [, token] = authorization.split(' ')

    if (token === undefined) {
      res.status(401).json({ error: 'No token provided' })
      return
    }

    const verifiedToken = jwt.verify(token, appConfig.key)

    regenerateToken(res, verifiedToken)

    next()
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      res.status(401).json({ error: 'Invalid token!' })
      return
    }

    res.status(500).json({ error: 'Internal server error' })
  }
}

const regenerateToken = (res: Response, verifiedToken: string | JwtPayload): void => {
  const currentTime = Math.floor(Date.now() / 1000)
  const decodedToken = verifiedToken as { exp: number, email: string }

  if (decodedToken.exp - currentTime < 300) {
    const newToken = jwt.sign({ email: decodedToken.email }, appConfig.key, { expiresIn: '1h' })
    res.setHeader('Authorization', `Bearer ${newToken}`)
  }
}
