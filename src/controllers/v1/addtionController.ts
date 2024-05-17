import { Request, RequestHandler, Response } from 'express'

const sum = (async (req: Request, res: Response): Promise<Response> => {
  try {
    const { first_name: firstName, last_name: lastName, email, password } = req.body
  } catch (err) {
    return res.status(500).json({ status: 'error', message: 'Internal server error' })
  }
}) as RequestHandler

export default {
  sum
}
