import { Request, RequestHandler, Response } from 'express'
import AppDataSource from '../../database/data-source'
import { User } from '../../database/entities/user'
import { userResource } from '../../resources/user'
import { sendErrorResponse, sendSuccessResponse } from '../../utils/responses'

const index = (async (req: Request, res: Response): Promise<Response> => {
  try {
    const userRepository = AppDataSource.getRepository(User)

    const { email } = req.body.user

    const user = await userRepository.createQueryBuilder('user')
      .leftJoinAndSelect('user.records', 'record')
      .leftJoinAndSelect('record.operation', 'operation')
      .where('user.email = :email', { email })
      .orderBy('record.created_at', 'DESC')
      .getOne()

    if (user === null) {
      return sendErrorResponse(res, 'Invalid token', 401)
    }

    return sendSuccessResponse(res, { records: user?.records, user: userResource(user) }, 'Records retrived successfully!')
  } catch (err) {
    console.log(err)
    return sendErrorResponse(res, 'Internal Server Error')
  }
}) as RequestHandler

export default {
  index
}
