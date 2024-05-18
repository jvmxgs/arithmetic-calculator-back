import { Request } from 'express'

export default function (req: Request): number {
  const {
    first_number: firstNumber
  } = req.body

  return Math.sqrt(parseFloat(firstNumber))
}
