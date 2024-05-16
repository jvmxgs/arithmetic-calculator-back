import express from 'express'
import routes from './routes/v1'

const app = express()

app.use(express.json())

app.use('/', routes)

export default app
