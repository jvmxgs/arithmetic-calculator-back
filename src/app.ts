import express, { Request, Response } from 'express'
import userRoutes from './routes/userRoutes'

const app = express()

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.use('/users', userRoutes)

export default app
