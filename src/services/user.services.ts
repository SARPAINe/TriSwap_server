import type User from '../models/user.models'
import { userRepository } from '../repository/user.repository'

const getAllUsers = async () => {
  return userRepository.findAllUsers()
}

const getSingleUser = async (userId: string) => {
  return userRepository.findUserById(userId)
}

const getMe = async (userObj: User) => {
  return userObj
}

const countUsers = async () => {
  return await userRepository.countUsers()
}

export const userServices = {
  getAllUsers,
  getSingleUser,
  getMe,
  countUsers,
}
