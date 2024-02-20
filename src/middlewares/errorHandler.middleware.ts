import { type ErrorRequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { logger } from '../config/winston.config'

const errorHandlerMiddleware: ErrorRequestHandler = (err, req, res, _next) => {
  logger.error(err.message)
  const customError = {
    statusCode: err.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR,
    error: err.name ?? 'InternalServerError',
    message: err.message ?? 'Something went wrong try again later',
  }

  // check sequelize unique constraint error
  if (err.name === 'SequelizeUniqueConstraintError') {
    const { errors } = err
    const uniqueConstraintErrors = errors.map((error: Error) => error.message)
    customError.statusCode = StatusCodes.CONFLICT
    customError.message = uniqueConstraintErrors
  }

  if (err.isJoi) {
    customError.statusCode = StatusCodes.BAD_REQUEST
  }

  const apiResponse = {
    success: false,
    message: customError.error, // error name
    error: {
      status: customError.statusCode,
      error: customError.error, // name of error
      message: customError.message,
    },
  }

  res.status(customError.statusCode).json(apiResponse)
}

export default errorHandlerMiddleware
