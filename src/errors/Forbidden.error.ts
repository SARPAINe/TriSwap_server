import { StatusCodes } from 'http-status-codes'
import { CustomAPIError } from './CustomError.error'

export class ForbiddenError extends CustomAPIError {
  statusCode: number
  name: string

  constructor(message: string) {
    super(message)
    this.statusCode = StatusCodes.FORBIDDEN
    this.name = 'ForbiddenError'
  }
}
