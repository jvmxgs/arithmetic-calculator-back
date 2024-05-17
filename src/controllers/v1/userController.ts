import bcrypt from 'bcrypt'
import { Request, RequestHandler, Response } from 'express'
import { validationResult } from 'express-validator'
import { Equal, Repository } from 'typeorm'
import AppDataSource from '../../database/data-source'
import { User } from '../../database/entities/user'
import { userResource } from '../../resources/user'

const index = (async (req: Request, res: Response): Promise<Response> => {
  try {
    const users = await AppDataSource.manager.find(User)

    return res.json({
      status: 'success',
      users
    })
  } catch (err) {
    return res.status(500).json({ status: 'error', message: 'Internal server error' })
  }
}) as RequestHandler

const show = (req: Request, res: Response): void => {
  //
}

export const store = (async (req: Request, res: Response): Promise<Response> => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        errors: errors.array()
      })
    }

    return await handleUserCreation(req, res)
  } catch (err) {
    return res.status(500).json({ status: 'error', message: 'Internal server error' })
  }
}) as RequestHandler

const initializeUserRepository = (): Repository<User> => {
  return AppDataSource.getRepository(User)
}
async function handleUserCreation (req: Request, res: Response): Promise<Response> {
  const { first_name: firstName, last_name: lastName, email, password } = req.body

  const userExists = await checkIfUserExists(email)
  if (userExists) {
    return res.status(409).json({ status: 'error', message: 'User already exists' })
  }

  const passwordHash = bcrypt.hashSync(password, 10)
  const newUser = await createUser(firstName, lastName, email, passwordHash)

  return res.status(201).json({ status: 'success', message: 'User created successfully', user: userResource(newUser) })
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

  return await userRepository.save(newUser)
}

export default {
  index,
  store,
  show
}
