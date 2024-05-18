import { Request, RequestHandler, Response } from 'express'
import { handleExceptions, performOperation } from '../../services/balanceManager'
import multiplication from '../../services/multiplication'

const invoke = (async (req: Request, res: Response): Promise<Response> => {
  try {
    return await performOperation(req, res, 'addition', multiplication)
  } catch (err) {
    return handleExceptions(err, res)
  }
}) as RequestHandler

export default {
  invoke
}
