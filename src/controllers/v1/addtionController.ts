import { Request, RequestHandler, Response } from 'express'
import addition from '../../services/addition'
import { handleExceptions, performOperation } from '../../services/balanceManager'

const invoke = (async (req: Request, res: Response): Promise<Response> => {
  try {
    return await performOperation(req, res, 'addition', addition)
  } catch (err) {
    return handleExceptions(err, res)
  }
}) as RequestHandler

export default {
  invoke
}
