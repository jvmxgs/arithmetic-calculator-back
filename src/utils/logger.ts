import fs from 'fs'
import path from 'path'
import pino from 'pino'
import pretty from 'pino-pretty'
import appConfig from '../config/app'

const logDirectory = path.resolve(__dirname, '..', appConfig.logs.path)

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true })
}

const streams = [
  { stream: fs.createWriteStream(path.join(logDirectory, 'app.log')) },
  { stream: pretty() }
]

export default pino(
  {
    level: appConfig.logs.level,
    formatters: {
      level: (label) => {
        return {
          level: label.toUpperCase()
        }
      }
    },
    timestamp: pino.stdTimeFunctions.isoTime
  },
  pino.multistream(streams)
)
