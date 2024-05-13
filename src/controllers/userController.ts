import { Request, Response } from 'express'
import AppDataSource from '../database/data-source'
import { User } from '../database/entities/User'

const getUsers = (req: Request, res: Response): void => {
  console.log('getting users - - - - - - - - - - - - - - - - - - - -')
  AppDataSource.manager.find(User).then(data => {
    console.log(data)
    res.json({
      status: 'success',
      data
    })
  }).catch(err => {
    console.log(err)
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    })
  })
}

const getUserById = (req: Request, res: Response): void => {
  //
}

const addUser = (req: Request, res: Response): void => {
  //
}

export default {
  getUsers,
  getUserById,
  addUser
}
