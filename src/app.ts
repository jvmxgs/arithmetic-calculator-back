import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import appConfig from './config/app'
import routes from './routes'

const app = express()

app.use(cors(appConfig.cors))

app.use(helmet())
app.use(express.json())

app.use('/', routes)

export default app
