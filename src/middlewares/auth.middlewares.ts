import { RequestHandler } from 'express'
import {
  BadRequestError,
  ForbiddenError,
  // UnauthenticatedError,
} from '../errors'
import User from '../models/user.models'
import passport from 'passport'
import { authRepository } from '../repository/auth.repository'
import { IUser } from '../interfaces'

const isAuthenticated = passport.authenticate('jwt', { session: false }) // in routes

// const isAuthenticatedLocal: RequestHandler = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     return next()
//   }
//   throw new UnauthenticatedError('User not authorized to view this resource')
// }

const isAdmin: RequestHandler = (req, res, next) => {
  // assuming passport has attached user
  const { role } = req.user as User
  if (role === 'ADMIN') {
    return next()
  }
  throw new ForbiddenError('Forbidden - Insufficient privileges')
}

const isEmailVerified: RequestHandler = async (req, res, next) => {
  // assuming passport has attached user
  const user = req.user as IUser
  const userId = user.id

  const authData = await authRepository.findAuthByUserId(userId)
  if (!authData) {
    throw new BadRequestError('Auth data not found')
  }

  if (authData.isVerified) {
    return next()
  }
  throw new ForbiddenError('Forbidden - Email not verified')
}

export { isAuthenticated, isAdmin, isEmailVerified }
