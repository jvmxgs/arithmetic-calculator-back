import { Request, RequestHandler, Response } from 'express'
import { handleExceptions, performOperation } from '../../services/balanceManager'
import division from '../../services/division'

const invoke = (async (req: Request, res: Response): Promise<Response> => {
  try {
    return await performOperation(req, res, 'addition', division)
  } catch (err) {
    return handleExceptions(err, res)
  }
}) as RequestHandler

export default {
  invoke
}
