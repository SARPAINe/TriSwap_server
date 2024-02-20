import { StatusCodes } from 'http-status-codes'
import { CustomAPIError } from './CustomError.error'

export class NotFoundError extends CustomAPIError {
  statusCode: number
  name: string

  constructor(message: string) {
    super(message)
    this.statusCode = StatusCodes.NOT_FOUND
    this.name = 'NotFoundError'
  }
}

export default NotFoundError
