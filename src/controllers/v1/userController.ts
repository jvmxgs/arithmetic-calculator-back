import bcrypt from 'bcrypt'
import { Request, RequestHandler, Response } from 'express'
import { validationResult } from 'express-validator'
import { Equal, Repository } from 'typeorm'
import AppDataSource from '../../database/data-source'
import { User } from '../../database/entities/user'
import { UserStatus } from '../../enums/userStatus'
import { userResource } from '../../resources/user'
import { sendErrorResponse, sendSuccessResponse } from '../../utils/responses'

const index = (async (req: Request, res: Response): Promise<Response> => {
  try {
    const users = await AppDataSource.manager.find(User)

    return sendSuccessResponse(res, { users }, 'Users retrived successfully!')
  } catch (err) {
    return sendErrorResponse(res, 'Internal Server Error')
  }
}) as RequestHandler

const show = (req: Request, res: Response): void => {
  //
}

export const store = (async (req: Request, res: Response): Promise<Response> => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return sendErrorResponse(res, 'Validation errors', 400, errors.array())
    }

    return await handleUserCreation(req, res)
  } catch (err) {
    return sendErrorResponse(res, 'Internal Server Error')
  }
}) as RequestHandler

const initializeUserRepository = (): Repository<User> => {
  return AppDataSource.getRepository(User)
}
async function handleUserCreation (req: Request, res: Response): Promise<Response> {
  const { first_name: firstName, last_name: lastName, email, password } = req.body

  const userExists = await checkIfUserExists(email)
  if (userExists) {
    return sendErrorResponse(res, 'User already exists', 409)
  }

  const passwordHash = bcrypt.hashSync(password, 10)
  const newUser = await createUser(firstName, lastName, email, passwordHash)

  return sendSuccessResponse(res, { user: userResource(newUser) }, 'User created successfully', 201)
}

async function checkIfUserExists (email: string): Promise<boolean> {
  const userRepository = initializeUserRepository()
  return await userRepository.exists({ where: { email: Equal(email) } })
}

async function createUser (firstName: string, lastName: string, email: string, passwordHash: string): Promise<User> {
  return await saveUser(firstName, lastName, email, passwordHash)
}

const saveUser = async (firstName: string, lastName: string, email: string, password: string): Promise<User> => {
  const userRepository = initializeUserRepository()
  const newUser = new User()

  newUser.first_name = firstName
  newUser.last_name = lastName
  newUser.email = email
  newUser.password = password
  newUser.status = UserStatus.active

  return await userRepository.save(newUser)
}

export default {
  index,
  store,
  show
}
