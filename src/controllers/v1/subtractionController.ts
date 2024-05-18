import { Request, RequestHandler, Response } from 'express'
import { handleExceptions, performOperation } from '../../services/balanceManager'
import subtraction from '../../services/subtraction'

const invoke = (async (req: Request, res: Response): Promise<Response> => {
  try {
    return await performOperation(req, res, 'addition', subtraction)
  } catch (err) {
    return handleExceptions(err, res)
  }
}) as RequestHandler

export default {
  invoke
}
