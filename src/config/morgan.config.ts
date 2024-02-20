import morgan from 'morgan'
import path from 'path'
import fs from 'fs'

const logDirectory = path.join(__dirname, '../../logs')
const logFilePath = path.join(logDirectory, 'access.log')

// Create the logs directory if it doesn't exist
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory)
}

const accessLogStream = fs.createWriteStream(logFilePath, { flags: 'a' })

const morganConfig =
  process.env.NODE_ENV === 'staging'
    ? morgan('combined', { stream: accessLogStream })
    : morgan(
        ':date[web] :method :url :status :response-time ms - :res[content-length]',
      )

export default morganConfig
