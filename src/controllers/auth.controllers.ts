import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { authServices } from '../services/auth.services'
import { BadRequestError } from '../errors'
import { ChangePasswordDTO, LoginUserDTO, RegisterUserDTO } from '../dto'
import { IUser } from '../interfaces'

const registerUser: RequestHandler = async (req, res) => {
  const userObj = req.body as RegisterUserDTO
  const { user, verificationToken, tokens } =
    await authServices.registerUser(userObj)
  const apiResponse = {
    success: true,
    message: 'User has been successfully registered. Please verify your email.',
    data: { user, verificationToken, tokens },
  }
  res.status(StatusCodes.CREATED).json(apiResponse)
}

const loginUser: RequestHandler = async (req, res) => {
  const loginObj: LoginUserDTO = req.body as LoginUserDTO
  const { user, tokens } = await authServices.loginUser(loginObj)
  const apiResponse = {
    success: true,
    message: 'user has been successfully registered',
    data: { user, tokens },
  }
  res.status(StatusCodes.OK).json(apiResponse)
}

const verifyUserEmail: RequestHandler = async (req, res) => {
  const verificationToken = req.query.token as string
  if (!verificationToken) {
    throw new BadRequestError('Token not provided')
  }

  await authServices.verifyEmail(verificationToken)

  const apiResponse = {
    success: true,
    message: 'Email verified successfully',
  }
  res.status(StatusCodes.OK).json(apiResponse)
}

const forgotUserPassword: RequestHandler = async (req, res) => {
  const { email } = req.body
  if (!email) {
    throw new BadRequestError('Please provide email')
  }

  const passwordResetToken = await authServices.forgotPassword(email)

  const apiResponse = {
    success: true,
    message: 'Password rest token has been sent to email',
    passwordResetToken,
  }
  res.status(StatusCodes.OK).json(apiResponse)
}

const resetUserPassword: RequestHandler = async (req, res) => {
  const passwordResetToken = req.query.token as string
  const { newPassword } = req.body

  await authServices.resetPassword(passwordResetToken, newPassword as string)

  const apiResponse = {
    success: true,
    message: 'Password reset successful. Please log in with new password',
  }
  res.status(StatusCodes.OK).json(apiResponse)
}

const changeUserPassword: RequestHandler = async (req, res) => {
  const { password, newPassword } = req.body
  if (!password || !newPassword) {
    throw new BadRequestError('Please provide password and new password')
  }
  const user = req.user as IUser
  const changePasswordObj: ChangePasswordDTO = {
    userId: user.id,
    password,
    newPassword,
  }
  await authServices.changePassword(changePasswordObj)
  const apiResponse = {
    success: true,
    message: 'Password changed, please login with new password.',
  }
  res.status(StatusCodes.OK).json(apiResponse)
}

const refresh: RequestHandler = async (req, res) => {
  const { refresh_token } = req.body // here extract from cookie

  if (!refresh_token) {
    throw new BadRequestError('Please provide refresh token')
  }
  const tokens = await authServices.refresh(refresh_token as string)

  const apiResponse = {
    success: true,
    message: 'token refreshed',
    data: tokens,
  }
  res.status(StatusCodes.OK).json(apiResponse)
}

const logoutUser: RequestHandler = async (req, res) => {
  const user = req.user as IUser
  await authServices.logoutUser(user)

  const apiResponse = {
    success: true,
    message: 'User logged out successfully',
  }
  res.status(StatusCodes.OK).json(apiResponse)
}

export {
  registerUser,
  loginUser,
  verifyUserEmail,
  forgotUserPassword,
  resetUserPassword,
  changeUserPassword,
  refresh,
  logoutUser,
}
