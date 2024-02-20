import { type Server } from 'http'
import { httpServer } from './app'
import { config } from './config'
import sequelize from './config/sequelize.config'
import { logger } from './config/winston.config'
import defineAssociations from './models/models.associations'
import setupSocket from './socket'
import cronJobs from './cron'

// interface DbOptions {
//   alter?: boolean
//   force?: boolean
// }

const startServer = async () => {
  try {
    setupSocket() // initialize socket io
    cronJobs()
    httpServer.listen(config.app.port, () => {
      logger.info(`server running on port ${config.app.port}`)
    })
    return httpServer
  } catch (err) {
    logger.error(err)
    process.exit(1)
  }
}

const closeServer = async (server: Server) => {
  try {
    await new Promise(resolve => server.close(resolve)) // why promisified?
    logger.info('Server closed.')
  } catch (err) {
    logger.error('Error closing server:', err)
  }
}

const startDB = async (opt: object = {}) => {
  try {
    await sequelize.authenticate() // for checking connection to db
    if (Object.keys(opt).length === 0) {
      logger.info('DB ran with no sync')
      await sequelize.sync()
    } else {
      sequelize.sync(opt)
    }
    // how the models will be synced

    defineAssociations()
    logger.info('Connection to the database has been established successfully.')
  } catch (err) {
    logger.error(err)
    process.exit(1)
  }
}

const closeDB = async () => {
  await sequelize.close()
  logger.info('Database connection has been closed.')
}

export { startDB, closeDB, startServer, closeServer }
