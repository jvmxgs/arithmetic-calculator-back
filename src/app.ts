import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import appConfig from './config/app'
import routes from './routes'
import logErrors from './utils/logErrors'

const app = express()

app.use(cors(appConfig.cors))

app.use(helmet())
app.use(express.json())

app.use('/', routes)
app.use(logErrors)

export default app
