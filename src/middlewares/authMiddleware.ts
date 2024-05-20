import { NextFunction, Request, Response } from 'express'
import jwt, { JsonWebTokenError } from 'jsonwebtoken'
import { Equal, IsNull } from 'typeorm'
import appConfig from '../config/app'
import AppDataSource from '../database/data-source'
import { User } from '../database/entities/user'
import { UserStatus } from '../enums/userStatus'
import { JwtPayload } from '../types/jwtPayload'
import { sendErrorResponse } from '../utils/responses'

export default async function (req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const authorization = req.headers.authorization ?? ''
    const [, token] = authorization.split(' ')

    if (token === undefined) {
      sendErrorResponse(res, 'No token provided', 401)
      return
    }

    const decodedToken = jwt.verify(token, appConfig.key) as JwtPayload
    req.body.user = { email: decodedToken.email }

    await regenerateToken(res, decodedToken.email, decodedToken.exp)

    next()
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      sendErrorResponse(res, 'Invalid token', 401)
      return
    }

    sendErrorResponse(res, 'Internal server error')
  }
}

const regenerateToken = async (res: Response, email: string, exp: number | undefined): Promise<void> => {
  const userRepository = AppDataSource.getRepository(User)

  const user = await userRepository.findOne({
    where: {
      email: Equal(email),
      status: Equal(UserStatus.active),
      deleted_at: IsNull()
    }
  })

  if (user === null) {
    return
  }

  const currentTime = Math.floor(Date.now() / 1000)

  if ((exp ?? 0) - currentTime < 300) {
    const newToken = jwt.sign({ email }, appConfig.key, { expiresIn: appConfig.jwt.expiresIn })
    res.setHeader('Authorization', `Bearer ${newToken}`)
  }
}
