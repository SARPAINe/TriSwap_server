import { StatusCodes } from 'http-status-codes'
import { CustomAPIError } from './CustomError.error'

export class UnauthenticatedError extends CustomAPIError {
  statusCode: number
  name: string

  constructor(message: string) {
    super(message)
    this.statusCode = StatusCodes.UNAUTHORIZED
    this.name = 'UnauthenticatedError'
  }
}
