import { Request } from 'express'
export default function (req: Request): number {
  const {
    first_number: firstNumber,
    second_number: secondNumber
  } = req.body

  return parseFloat(firstNumber) - parseFloat(secondNumber)
}
