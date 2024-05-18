import { Request } from 'express'

export default async function (req: Request): Promise<string> {
  const apiUrl = process.env.RANDOM_API_URL ?? ''
  const apiKey = process.env.RANDOM_API_KEY

  /* const {
    first_number: firstNumber,
    second_number: secondNumber
  } = req.body */

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'generateStrings',
      params: {
        apiKey,
        n: 1,
        length: 20,
        characters: 'abcdefghijklmnopqrstuvwxyz1234567890',
        replacement: true
      },
      id: 42
    })
  })

  const data = await response.json()

  return Object(data).result.random.data[0]
}
