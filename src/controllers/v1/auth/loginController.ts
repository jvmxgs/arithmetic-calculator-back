import bcrypt from 'bcrypt'
import { Request, RequestHandler, Response } from 'express'
import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import { Equal, IsNull } from 'typeorm'
import appConfig from '../../../config/app'
import AppDataSource from '../../../database/data-source'
import { User } from '../../../database/entities/user'
import { UserStatus } from '../../../enums/userStatus'
import { sendErrorResponse, sendSuccessResponse } from '../../../utils/responses'

const invoke = (async (req: Request, res: Response): Promise<Response> => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return sendErrorResponse(res, 'Validation errors', 400, errors.array())
    }

    const { email, password } = req.body

    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOne({
      where: {
        email: Equal(email),
        status: Equal(UserStatus.active),
        deleted_at: IsNull()
      }
    })

    if (user === null) {
      return sendErrorResponse(res, 'Invalid email or password', 401)
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return sendErrorResponse(res, 'Invalid email or password', 401)
    }

    const token = jwt.sign({ email }, appConfig.key, { expiresIn: appConfig.jwt.expiresIn })

    return sendSuccessResponse(res, { token }, 'Logged in successfully')
  } catch (err) {
    return sendErrorResponse(res, 'Authentication failed', 401)
  }
}) as RequestHandler

export default {
  invoke
}
