import { Request, RequestHandler, Response } from 'express'
import { handleExceptions, performOperation } from '../../services/balanceManager'
import randomString from '../../services/randomString'

const invoke = (async (req: Request, res: Response): Promise<Response> => {
  try {
    return await performOperation(req, res, 'random_string', randomString)
  } catch (err) {
    return handleExceptions(err, res)
  }
}) as RequestHandler

export default {
  invoke
}
