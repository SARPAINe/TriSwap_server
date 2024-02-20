import { Sequelize, type Options } from 'sequelize'

const database = process.env.DB_DEV_DATABASE!
const user = process.env.DB_DEV_USER!
const password = process.env.DB_DEV_PASSWORD!
const host = process.env.DB_DEV_HOST!

export const setupDevDB = (): Sequelize => {
  const sequelizeOptions: Options = { host, dialect: 'mysql', logging: false }
  const sequelize = new Sequelize(database, user, password, sequelizeOptions)
  return sequelize
}

export const closeDevDB = (sequelize: Sequelize): Promise<void> => {
  return sequelize.close()
}
