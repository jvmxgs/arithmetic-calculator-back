import bcrypt from 'bcrypt'
import { Request, RequestHandler, Response } from 'express'
import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import { Equal, IsNull } from 'typeorm'
import appConfig from '../../../config/app'
import AppDataSource from '../../../database/data-source'
import { User } from '../../../database/entities/user'
import { UserStatus } from '../../../enums/userStatus'
import { userResource } from '../../../resources/user'

const invoke = (async (req: Request, res: Response): Promise<Response> => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        errors: errors.array()
      })
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
      return res.status(401).json({ status: 'error', message: 'Invalid email or password' })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return res.status(401).json({ status: 'error', message: 'Invalid email or password' })
    }

    const token = jwt.sign({ email }, appConfig.key, { expiresIn: appConfig.jwt.expiresIn })

    return res.status(200).json({
      status: 'success',
      token,
      user: userResource(user)
    })
  } catch (err) {
    return res.status(401).json({ status: 'error', message: 'Authentication failed' })
  }
}) as RequestHandler

export default {
  invoke
}
