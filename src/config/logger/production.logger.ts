import winston, { format } from 'winston'
const { combine, timestamp, json } = format
import path from 'path'
import fs from 'fs'

// Create the logs directory if it doesn't exist
const logDirectory = path.join(__dirname, '../../../', 'logs')
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory)
}

const productionLogger = (): winston.Logger => {
  const logger = winston.createLogger({
    level: 'info',
    format: combine(timestamp(), json()),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({
        filename: path.join(logDirectory, 'error.log'),
        level: 'error',
      }),
      new winston.transports.File({
        filename: path.join(logDirectory, 'combined.log'),
      }),
    ],
  })
  return logger
}

export default productionLogger
