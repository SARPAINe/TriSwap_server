import { StatusCodes } from 'http-status-codes'
import { CustomAPIError } from './CustomError.error'

export class BadRequestError extends CustomAPIError {
  statusCode: number
  name: string

  constructor(message: string) {
    super(message)
    this.statusCode = StatusCodes.BAD_REQUEST
    this.name = 'BadRequestError'
  }
}
