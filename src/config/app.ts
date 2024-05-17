import dotenv from 'dotenv'

dotenv.config()

export default {
  key: process.env.APP_KEY ?? 'secretkey',

  jwt: {
    expiresIn: '1h'
  },

  cors: {
    origin: process.env.ALLOWED_ORIGIN,
    credentials: true
  }
}
