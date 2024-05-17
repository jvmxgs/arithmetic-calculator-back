import { Request, Response } from 'express'
import { Equal, IsNull, Repository } from 'typeorm'
import AppDataSource from '../database/data-source'
import { Operation } from '../database/entities/operation'
import { User } from '../database/entities/user'
import { UserStatus } from '../enums/userStatus'
import { InsuficientCreditsError } from '../errors/insuficientCredits'
import { InvalidTokenError } from '../errors/invalidToken'

async function getUser (req: Request, userRepository: Repository<User>): Promise<User> {
  const { email } = req.body

  const user = await userRepository.findOne({
    where: {
      email: Equal(email),
      status: Equal(UserStatus.active),
      deleted_at: IsNull()
    }
  })

  if (user === null) {
    throw new InvalidTokenError()
  }

  return user
}

async function getOperation (req: Request, type: string): Promise<Operation> {
  const operationRepository = AppDataSource.getRepository(Operation)

  const operation = await operationRepository.findOne({
    where: {
      type,
      deleted_at: IsNull()
    }
  })

  if (operation === null) {
    throw new Error('Operation not found')
  }

  return operation
}

async function decreaseCreditsToUser (user: User, operation: Operation, userRepository: Repository<User>): Promise<void> {
  user.credits = user.credits - operation.cost
  await userRepository.save(user)
}

function handleExceptions (err: unknown, res: Response): Response {
  let message = 'Internal server error'
  let statusCode = 500

  if (err instanceof InvalidTokenError) {
    message = 'Invalid token!'
    statusCode = 401
  }

  if (err instanceof InsuficientCreditsError) {
    message = 'Insuficient credits!'
    statusCode = 402
  }

  return res.status(statusCode).json({ status: 'error', message })
}

export {
  decreaseCreditsToUser, getOperation, getUser, handleExceptions
}
