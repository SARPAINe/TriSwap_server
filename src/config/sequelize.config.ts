import { type Sequelize } from 'sequelize'
import { setupTestDBMemory } from './database/sequelize-test.config'
import { setupDevDB } from './database/sequelize-dev.config'
import { setupStgDB } from './database/sequelize-stg.config'
import { setupDB, closeDB } from './database/sequelize-prod.config'
import { logger } from './winston.config'

let sequelize: Sequelize = setupDevDB()

if (process.env.NODE_ENV === 'development') {
  logger.info('Running development db')
  sequelize = setupDevDB()
} else if (process.env.NODE_ENV === 'staging') {
  logger.info('Running staging db')
  sequelize = setupStgDB()
} else if (process.env.NODE_ENV === 'test') {
  logger.info('Running test db')
  sequelize = setupTestDBMemory()
} else if (process.env.NODE_ENV === 'production') {
  logger.info('Running production db')
  sequelize = setupDB()
}
export default sequelize
