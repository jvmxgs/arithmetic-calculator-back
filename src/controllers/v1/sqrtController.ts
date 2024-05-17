import { Request, RequestHandler, Response } from 'express'
import { validationResult } from 'express-validator'
import AppDataSource from '../../database/data-source'
import { User } from '../../database/entities/user'
import { InsuficientCreditsError } from '../../errors/insuficientCredits'
import { userResource } from '../../resources/user'
import { decreaseCreditsToUser, getOperation, getUser, handleExceptions } from '../../services/balanceManager'
import sqrt from '../../services/sqrt'

const invoke = (async (req: Request, res: Response): Promise<Response> => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        errors: errors.array()
      })
    }

    const userRepository = AppDataSource.getRepository(User)

    const user = await getUser(req, userRepository)

    const operation = await getOperation(req, 'addition')

    if (user.credits < operation.cost) {
      throw new InsuficientCreditsError()
    }

    const {
      first_number: firstNumber
    } = req.body

    const result = sqrt(firstNumber)

    await decreaseCreditsToUser(user, operation, userRepository)

    return res.status(200).json({
      status: 'success',
      result,
      user: userResource(user)
    })
  } catch (err) {
    return handleExceptions(err, res)
  }
}) as RequestHandler

export default {
  invoke
}
