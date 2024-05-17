import { Request, RequestHandler, Response } from 'express'
import { validationResult } from 'express-validator'
import { Equal, IsNull } from 'typeorm'
import operationsConfig from '../../config/operations'
import AppDataSource from '../../database/data-source'
import { User } from '../../database/entities/user'
import { UserStatus } from '../../enums/userStatus'
import { userResource } from '../../resources/user'
import addition from '../../services/addition'

const invoke = (async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email } = req.body

    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOne({
      where: {
        email: Equal(email),
        status: Equal(UserStatus.active),
        deleted_at: IsNull()
      }
    })

    if (user === null) {
      return res.status(401).json({
        status: 'error',
        error: 'Invalid token!'
      })
    }

    if (user.credits < operationsConfig.addition.cost) {
      return res.status(402).json({
        status: 'error',
        message: 'Insuficient credits'
      })
    }

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        errors: errors.array()
      })
    }

    const {
      first_number: firstNumber,
      second_number: secondNumber
    } = req.body

    const result = addition(firstNumber, secondNumber)
    user.credits = user.credits - operationsConfig.addition.cost
    await userRepository.save(user)

    return res.status(200).json({
      status: 'success',
      result,
      user: userResource(user)
    })
  } catch (err) {
    return res.status(500).json({ status: 'error', message: 'Internal server error' })
  }
}) as RequestHandler

export default {
  invoke
}
