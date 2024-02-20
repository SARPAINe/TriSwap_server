import { Transaction } from 'sequelize'
import User from '../models/user.models'
import { UserRegisterUserDTO } from '../dto'

const createUser = async (
  user: UserRegisterUserDTO,
  transaction?: Transaction,
) => {
  const newUser = await User.create(
    {
      ...user,
    },
    { transaction },
  )
  return newUser
}

const findAllUsers = async (): Promise<User[]> => {
  const users = await User.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  })
  return users
}

const findUserByEmail = async (email: string) => {
  const user = await User.findOne({
    where: { email: email },
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  })
  return user
}

const findUserById = async (userId: string) => {
  const user = await User.findByPk(userId, {
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  })
  return user
}

const countUsers = async () => {
  const userCount = await User.count({
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  })

  return userCount
}

export const userRepository = {
  createUser,
  findAllUsers,
  findUserByEmail,
  findUserById,
  countUsers,
}
