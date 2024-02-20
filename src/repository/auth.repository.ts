import { Transaction } from 'sequelize'

import Auth from '../models/auth.models'
import { AuthRegisterUserDTO } from '../dto'

const createAuth = async (
  authObj: AuthRegisterUserDTO,
  transaction?: Transaction,
) => {
  const newAuth = await Auth.create(
    {
      ...authObj,
    },
    { transaction },
  )
  return newAuth
}

const findAuthByUserId = async (userId: string) => {
  const authData = await Auth.findOne({
    where: {
      userId: userId,
    },
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  })
  return authData
}

const findAuthByEmailVerificationToken = async (verificationToken: string) => {
  const authData = await Auth.findOne({
    where: { verificationToken },
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  })
  return authData
}

export const authRepository = {
  createAuth,
  findAuthByUserId,
  findAuthByEmailVerificationToken,
}
