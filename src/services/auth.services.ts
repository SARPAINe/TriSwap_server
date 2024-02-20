import { cryptoServices } from './crypto.services'
import { userRepository } from '../repository/user.repository'
import { authRepository } from '../repository/auth.repository'
import {
  BadRequestError,
  ForbiddenError,
  UnauthenticatedError,
  CustomAPIError,
} from '../errors'
import type User from '../models/user.models'
import { emailServices } from './email.services'
import { authTokenServices } from './authToken.services'
import {
  AuthRegisterUserDTO,
  ChangePasswordDTO,
  LoginUserDTO,
  RegisterUserDTO,
} from '../dto'

import { ITokens, IUser } from '../interfaces'

const registerUser = async (
  userObj: RegisterUserDTO,
): Promise<{
  user: IUser
  verificationToken: string
  tokens: ITokens
}> => {
  const { password, ...userData } = userObj
  const hashedPassword = await cryptoServices.hashPassword(password)
  const verificationToken = authTokenServices.generateUuid()
  const newUser = await userRepository.createUser(userData)
  const authObj: AuthRegisterUserDTO = {
    userId: newUser.id,
    password: hashedPassword,
    verificationToken,
  }
  const authData = await authRepository.createAuth(authObj)
  const tokens = authTokenServices.generateTokens(newUser)
  authData.refreshToken = tokens.refresh.refresh_token
  await authData.save()

  emailServices.sendVerificationEmail(newUser.email, verificationToken)

  const user = {
    id: newUser.id,
    email: newUser.email,
    role: newUser.role,
  }

  return { user, verificationToken, tokens }
}

const loginUser = async (
  loginObj: LoginUserDTO,
): Promise<{ user: User; tokens: ITokens }> => {
  const { email, password } = loginObj
  const user = await userRepository.findUserByEmail(email)
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials')
  }

  const authData = await authRepository.findAuthByUserId(user.id)
  if (!authData) {
    throw new CustomAPIError(
      'something terrible happened. user data exists but no auth data',
    )
  }

  const isPasswordCorrect = await cryptoServices.comparePassword(
    password,
    authData.password,
  )
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials')
  }

  const tokens = authTokenServices.generateTokens(user)
  authData.refreshToken = tokens.refresh.refresh_token
  await authData.save()

  return { user, tokens }
}

const verifyEmail = async (verificationToken: string) => {
  const authData =
    await authRepository.findAuthByEmailVerificationToken(verificationToken)
  if (!authData) {
    throw new BadRequestError('Email already verified')
  }
  authData.verificationToken = null
  authData.isVerified = true

  await authData.save()
}

const changePassword = async (changePasswordObj: ChangePasswordDTO) => {
  const { userId, password, newPassword } = changePasswordObj

  const authData = await authRepository.findAuthByUserId(userId)
  if (!authData) {
    throw new BadRequestError('Auth data not found')
  }
  const isPasswordCorrect = await cryptoServices.comparePassword(
    password,
    authData.password,
  )
  if (!isPasswordCorrect) {
    throw new BadRequestError('Invalid credentials, password did not match')
  }

  const newPasswordHash = await cryptoServices.hashPassword(newPassword)
  authData.password = newPasswordHash
  authData.refreshToken = null
  await authData.save()
}

const forgotPassword = async (email: string) => {
  const user = await userRepository.findUserByEmail(email)
  if (!user) {
    throw new BadRequestError('Invalid email')
  }

  const authData = await authRepository.findAuthByUserId(user.id)

  if (!authData) {
    throw new CustomAPIError(
      'something terrible happened. user data exists but no auth data',
    )
  }
  const passwordResetToken = authTokenServices.generatePasswordResetToken(
    user.id,
  )
  authData.passwordResetToken = passwordResetToken
  await authData.save()
  emailServices.sendForgotPasswordEmail(user.email, passwordResetToken)
  return passwordResetToken
}

const resetPassword = async (
  passwordResetToken: string,
  newPassword: string,
) => {
  const { userId } =
    await authTokenServices.verifyPasswordResetToken(passwordResetToken)

  const user = await userRepository.findUserById(userId)

  if (!user) {
    throw new BadRequestError('user not found from auth service')
  }
  // get auth data check if the user has a password reset token, check and delete
  const authData = await authRepository.findAuthByUserId(user.id)

  if (!authData) {
    throw new CustomAPIError('Auth data does not exist')
  }

  if (
    !authData.passwordResetToken ||
    !(authData.passwordResetToken === passwordResetToken)
  ) {
    throw new ForbiddenError('Password reset token has already been used')
  }
  authData.passwordResetToken = null
  authData.password = await cryptoServices.hashPassword(newPassword)
  await authData.save()
  emailServices.sendResetPasswordSuccessfulEmail(user.email)
}

const refresh = async (refreshToken: string) => {
  const { userId } = await authTokenServices.verifyRefreshToken(refreshToken) // token is verified

  const user = await userRepository.findUserById(userId)
  if (!user) {
    throw new BadRequestError('user not found')
  }
  const authData = await authRepository.findAuthByUserId(userId)
  if (!authData) {
    throw new BadRequestError('Auth data not found')
  }

  if (refreshToken !== authData.refreshToken) {
    throw new BadRequestError('Old refresh token reuse')
  }

  const tokens = authTokenServices.generateTokens(user)
  authData.refreshToken = tokens.refresh.refresh_token
  await authData.save()

  return tokens
}

const logoutUser = async (user: IUser) => {
  const authData = await authRepository.findAuthByUserId(user.id)
  if (!authData) {
    throw new BadRequestError('Auth data not found')
  }

  if (authData.refreshToken === null) {
    throw new BadRequestError('User already logged out')
  }
  authData.refreshToken = null
  await authData.save()
}

export const authServices = {
  registerUser,
  loginUser,
  verifyEmail,
  changePassword,
  forgotPassword,
  resetPassword,
  refresh,
  logoutUser,
}
