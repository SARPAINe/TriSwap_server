import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { userServices } from '../services/user.services'
import { NotFoundError } from '../errors'
import type User from '../models/user.models'
import { IApiResponse, IUser } from '../interfaces'

const getAllUsers: RequestHandler = async (req, res) => {
  const users = await userServices.getAllUsers()

  const apiResponse: IApiResponse<User[]> = {
    success: true,
    message: 'All user data retrieved',
    count: users.length,
    data: users,
  }
  res.status(StatusCodes.OK).json(apiResponse)
}

const getUser: RequestHandler = async (req, res) => {
  const { id: userId } = req.params
  const user = await userServices.getSingleUser(userId)

  if (!user) {
    throw new NotFoundError('User not found')
  }

  const apiResponse: IApiResponse<User> = {
    success: true,
    message: 'User data retrieved',
    data: user,
  }
  res.status(StatusCodes.OK).json(apiResponse)
}

const getMe: RequestHandler = async (req, res) => {
  const user = await userServices.getMe(req.user as User)
  const apiResponse: IApiResponse<IUser> = {
    success: true,
    message: 'User data retrieved',
    data: user,
  }
  res.status(StatusCodes.OK).json(apiResponse)
}

const updateMe: RequestHandler = async (req, res) => {
  const apiResponse: IApiResponse<IUser> = {
    success: true,
    message: 'User data updated',
    // data: user,
  }
  res.status(StatusCodes.OK).json(apiResponse)
}

const countUsers: RequestHandler = async (req, res) => {
  const userCount = await userServices.countUsers()
  const apiResponse = {
    success: true,
    message: 'Count of registered users retrieved.',
    data: {
      count: userCount,
    },
  }
  res.status(StatusCodes.OK).json(apiResponse)
}

// const deleteUser
export { getAllUsers, getUser, getMe, updateMe, countUsers }
