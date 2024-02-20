import express from 'express'
import { createServer } from 'node:http'
import compression from 'compression'
import passport from 'passport'
import 'express-async-errors'
import cookieParser from 'cookie-parser'

// security
import helmet from 'helmet'
import cors from 'cors'

// logger
import { config } from './config'
const morgan = config.logs.morgan

// routes
import authRoutes from './routes/v1/auth.routes'
import userRoutes from './routes/v1/user.routes'
import tokenRoutes from './routes/v1/token.routes'
import adminRoutes from './routes/v1/admin.routes'
import transactionHashRoutes from './routes/v1/transactionHash.routes'

// middlewares
import errorHandlerMiddleware from './middlewares/errorHandler.middleware'
import notFoundMiddleware from './middlewares/notFound.middleware'

const app = express()

app.use(cookieParser())
app.set('trust proxy', 1)

app.use(
  cors({
    origin: '*',
  }),
)

app.use(helmet())
app.use(morgan)
app.use(compression())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

import './config/passport.config'
app.use(passport.initialize())

// routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/token', tokenRoutes)
app.use('/api/v1/admin', adminRoutes)
app.use('/api/v1/transaction-hash', transactionHashRoutes)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const httpServer = createServer(app)

export { app, httpServer }

export default app
