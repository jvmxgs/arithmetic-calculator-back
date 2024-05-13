import express, { Request, Response } from 'express'
import bookRoutes from './routes/bookRoutes'

const app = express()

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.use('/books', bookRoutes)

export default app
