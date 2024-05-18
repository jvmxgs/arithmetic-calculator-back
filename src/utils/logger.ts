import fs from 'fs'
import path from 'path'
import pino from 'pino'
import pretty from 'pino-pretty'

const logDirectory = path.join(__dirname, '../logs')

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true })
}

const streams = [
  { stream: fs.createWriteStream(path.join(logDirectory, 'app.log')) },
  { stream: pretty() }
]

export default pino(
  {
    level: process.env.PINO_LOG_LEVEL ?? 'info',
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
