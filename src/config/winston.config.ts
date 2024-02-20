import developmentLogger from './logger/development.logger'
import productionLogger from './logger/production.logger'

let logger = productionLogger()

if (process.env.NODE_ENV !== 'production') {
  logger = developmentLogger()
}

export { logger }
