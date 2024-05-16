import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { Equal } from 'typeorm'
import appConfig from '../../../config/app'
import AppDataSource from '../../../database/data-source'
import { User } from '../../../database/entities/user'

const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body

    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOne({ where: { email: Equal(email) } })

    if (user === null) {
      return res.status(401).json({ error: 'User not found' })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const token = jwt.sign({ email }, appConfig.key, { expiresIn: '1h' })

    return res.json({ token })
  } catch (err) {
    return res.status(401).json({ error: 'Authentication failed' })
  }
}

export default {
  login
}
