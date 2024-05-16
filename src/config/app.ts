import dotenv from 'dotenv'

dotenv.config()

export default {
  key: process.env.APP_KEY ?? 'secretkey',

  jwt: {
    expiresIn: '1h'
  }
}
