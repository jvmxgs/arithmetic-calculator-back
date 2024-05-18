import dotenv from 'dotenv'

dotenv.config()

export default {
  key: process.env.APP_KEY ?? 'secretkey',
  logs: {
    path: process.env.LOG_DIRECTORY ?? 'logs',
    level: process.env.LOG_LEVEL ?? 'debug'
  },

  jwt: {
    expiresIn: '1h'
  },

  cors: {
    origin: process.env.ALLOWED_ORIGIN,
    credentials: true
  }
}
