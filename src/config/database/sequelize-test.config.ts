import { Sequelize, type Options } from 'sequelize'

const database = process.env.DB_DATABASE!
const user = process.env.DB_USER!
const password = process.env.DB_PASSWORD!
const host = process.env.DB_HOST!

export const setupTestDB = () => {
  const sequelizeOptions: Options = {
    host: host,
    dialect: 'mysql',
    logging: false,
  }
  const sequelize = new Sequelize(database, user, password, sequelizeOptions)
  return sequelize
}

export const setupTestDBMemory = (): Sequelize => {
  const sequelizeOptions: Options = {
    dialect: 'sqlite',
    storage: ':memory:', // Use in-memory storage
    logging: false, // Disable logging to keep the console clean during tests
  }
  const sequelize = new Sequelize(sequelizeOptions)
  return sequelize
}

export const closeTestDB = (sequelize: Sequelize): Promise<void> => {
  return sequelize.close()
}
