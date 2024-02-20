import jwt, { JwtPayload } from 'jsonwebtoken'
import { v4 as uuidV4 } from 'uuid'
import { config } from '../config'
import { BadRequestError } from '../errors'
import { ITokens } from '../interfaces'
import User from '../models/user.models'

const generateTokens = (user: User): ITokens => {
  const accessToken = generateAccessToken(user)
  const refreshToken = generateRefreshToken(user)
  const tokens: ITokens = {
    access: {
      ...accessToken,
    },
    refresh: {
      ...refreshToken,
    },
  }
  return tokens
}

const generateRefreshToken = (user: User) => {
  const payload = {
    sub: user.id,
    role: user.role,
  }

  const expiresIn = config.jwt.refresh_token.expiresIn
  const signedToken = jwt.sign(payload, config.jwt.refresh_token.secret, {
    expiresIn,
  })

  return {
    refresh_token: signedToken,
    expires: new Date(
      (Math.floor(Date.now() / 1000) + expiresIn) * 1000,
    ).toISOString(),
  }
}

const generateAccessToken = (user: User) => {
  const payload = {
    sub: user.id,
    role: user.role,
  }
  const expiresIn = config.jwt.access_token.expiresIn
  const signedToken = jwt.sign(payload, config.jwt.access_token.secret, {
    expiresIn,
  })
  return {
    access_token: signedToken,
    expires: new Date(
      (Math.floor(Date.now() / 1000) + expiresIn) * 1000,
    ).toISOString(),
  }
}

const generatePasswordResetToken = (userId: string) => {
  const payload = {
    sub: userId,
  }
  const expiresIn = config.jwt.passwordResetTokenExpiresIn
  const signedToken = jwt.sign(payload, config.jwt.secret, {
    expiresIn,
  })
  return signedToken
}

const verifyPasswordResetToken = async (passwordResetToken: string) => {
  const { sub } = jwt.verify(
    passwordResetToken,
    config.jwt.secret,
  ) as JwtPayload

  if (!sub) {
    throw new BadRequestError('Invalid payload for jwt')
  }
  return { userId: sub }
}

const generateUuid = () => {
  return uuidV4()
}

const verifyRefreshToken = async (refreshToken: string) => {
  const { sub } = jwt.verify(
    refreshToken,
    config.jwt.refresh_token.secret,
  ) as JwtPayload
  if (!sub) {
    throw new BadRequestError('Invalid payload for jwt')
  }
  return { userId: sub }
}

export const authTokenServices = {
  generateTokens,
  generateAccessToken,
  generateRefreshToken,
  generatePasswordResetToken,
  verifyPasswordResetToken,
  verifyRefreshToken,
  generateUuid,
}
