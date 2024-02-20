import { type RequestHandler } from 'express'
import { NotFoundError } from '../errors'

const notFound: RequestHandler = async () => {
  throw new NotFoundError('Route does not exist.')
}

export default notFound
