import path from 'path'
import dotEnv from 'dotenv'
dotEnv.config({ path: path.join(__dirname, './../../.env') })
import morgan from './morgan.config'

export const config = {
  app: {
    port: process.env.PORT!,
    baseURL: `http://localhost:3000/api/v1`,
    nodeEnv: process.env.NODE_ENV,
  },
  logs: {
    morgan,
  },
  jwt: {
    secret: process.env.JWT_SECRET!,
    access_token: {
      secret: process.env.ACCESS_TOKEN_JWT_SECRET!,
      expiresIn: 60 * 10,
    },
    refresh_token: {
      secret: process.env.REFRESH_TOKEN_JWT_SECRET!,
      expiresIn: 60 * 60 * 24 * 7,
    },
    passwordResetTokenExpiresIn: 60 * 10,
  },
  email: {
    adminEmailAddress: 'admin@bjitcs.com',
  },
}
