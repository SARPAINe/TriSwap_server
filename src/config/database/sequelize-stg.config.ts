import { Sequelize, type Options } from 'sequelize'

const database = process.env.DB_STG_DATABASE!
const user = process.env.DB_STG_USER!
const password = process.env.DB_STG_PASSWORD!
const host = process.env.DB_STG_HOST!

export const setupStgDB = (): Sequelize => {
  const sequelizeOptions: Options = { host, dialect: 'mysql' }
  const sequelize = new Sequelize(database, user, password, sequelizeOptions)
  return sequelize
}

export const closeStgDB = (sequelize: Sequelize): Promise<void> => {
  return sequelize.close()
}
