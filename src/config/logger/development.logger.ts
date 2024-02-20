import winston from 'winston'
import { format } from 'winston'
import path from 'path'
import fs from 'fs'

// Create the logs directory if it doesn't exist
const logDirectory = path.join(__dirname, '../../../', 'logs')
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory)
}

// log format
const { combine, timestamp, printf, colorize } = format
const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}] ${message}`
})

const developmentLogger = (): winston.Logger => {
  const logger = winston.createLogger({
    level: 'debug',
    format: combine(timestamp({ format: 'HH:mm:ss' }), colorize(), myFormat),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({
        filename: path.join(logDirectory, 'dev-error.log'),
        level: 'error',
      }),
      new winston.transports.File({
        filename: path.join(logDirectory, 'dev-combined.log'),
      }),
    ],
  })
  return logger
}

export default developmentLogger
