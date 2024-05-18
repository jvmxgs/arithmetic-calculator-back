import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { Equal, IsNull, Repository } from 'typeorm'
import AppDataSource from '../database/data-source'
import { Operation } from '../database/entities/operation'
import { Record } from '../database/entities/record'
import { User } from '../database/entities/user'
import { UserStatus } from '../enums/userStatus'
import { InsuficientCreditsError } from '../errors/insuficientCredits'
import { InvalidTokenError } from '../errors/invalidToken'
import { userResource } from '../resources/user'
import { sendErrorResponse, sendSuccessResponse } from '../utils/responses'

async function getUser (req: Request, userRepository: Repository<User>): Promise<User> {
  const { email } = req.body.user

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

async function getOperation (type: string): Promise<Operation> {
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

  return sendErrorResponse(res, message, statusCode)
}

async function registerRecord (user: User, operation: Operation, result: string): Promise<void> {
  const recordRepository = AppDataSource.getRepository(Record)
  const newRecord = new Record()
  newRecord.operation_id = operation.id
  newRecord.user = user
  newRecord.amount = operation.cost
  newRecord.user_balance = user.credits
  newRecord.operation_response = result

  await recordRepository.save(newRecord)
}
async function performOperation (req: Request, res: Response, operationType: string, operationFn: (req: Request) => number | Promise<string>): Promise<Response> {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return sendErrorResponse(res, 'Validation errors', 400, errors.array())
  }

  const userRepository = AppDataSource.getRepository(User)

  const user = await getUser(req, userRepository)

  const operation = await getOperation(operationType)

  if (user.credits < operation.cost) {
    throw new InsuficientCreditsError()
  }

  let result = await operationFn(req)

  if (typeof result === 'number') {
    result = result.toString()
  }

  await decreaseCreditsToUser(user, operation, userRepository)
  await registerRecord(user, operation, result)

  return sendSuccessResponse(res, { user: userResource(user), result }, 'Operation completed successfully')
}

export {
  decreaseCreditsToUser,
  getOperation,
  getUser,
  handleExceptions,
  performOperation,
  registerRecord
}
