import { Request, RequestHandler, Response } from 'express'
import { validationResult } from 'express-validator'
import addition from '../../services/addition'

const invoke = (async (req: Request, res: Response): Promise<Response> => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        errors: errors.array()
      })
    }

    const {
      first_number: firstNumber,
      second_number: secondNumber
    } = req.body

    const result = addition(firstNumber, secondNumber)
    return res.status(200).json({ status: 'success', result })
  } catch (err) {
    return res.status(500).json({ status: 'error', message: 'Internal server error' })
  }
}) as RequestHandler

export default {
  invoke
}
