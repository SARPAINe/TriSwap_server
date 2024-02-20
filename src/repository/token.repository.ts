import {
  AddPriceDTO,
  CreateRealTokenDTO,
  CreateTokenDTO,
  CreateTokenPairDTO,
} from '../dto'
import Token from '../models/token.models'
import TokenPair from '../models/tokenPair.models'
import { BadRequestError } from '../errors'
import { Op } from 'sequelize'
import sequelize from '../config/sequelize.config'
import RealToken from '../models/real_token.models'
import { token } from 'morgan'

const createToken = async (tokenObj: CreateTokenDTO) => {
  const newToken = await Token.create({
    ...tokenObj,
  })
  return newToken
}

const createRealToken = async (tokenObj: CreateRealTokenDTO) => {
  const newToken = await RealToken.create({
    ...tokenObj,
  })
  return newToken
}

const addPrice = async (tokenObj: AddPriceDTO) => {
  // const tokenData = await findTokenByName(tokenObj.name)
  // if (!tokenData) {
  //   throw new BadRequestError('Token not found')
  // }
  const tokenData = await RealToken.addPrices(tokenObj.name, tokenObj.price)
  return tokenData
}

const createTokenPair = async (tokenPairObj: CreateTokenPairDTO) => {
  const { userId, pairAddress, tokenAId, tokenBId } = tokenPairObj
  const transaction = await sequelize.transaction()
  try {
    const newTokenPair = await TokenPair.create(
      { userId, pairAddress, tokenAId, tokenBId },
      { transaction },
    )
    transaction.commit()
    return newTokenPair
  } catch (err) {
    await transaction.rollback()
    throw err
  }
}

const getTokenPairs = async () => {
  const tokenPairData = await TokenPair.findAll({
    attributes: ['id', 'tokenAId', 'tokenBId', 'pairAddress', 'userId'],
    include: [
      {
        model: Token,
        as: 'tokenA',
        attributes: ['name', 'address'],
      },
      {
        model: Token,
        as: 'tokenB',
        attributes: ['name', 'address'],
      },
    ],
  })

  const formattedTokenPairs = tokenPairData.map(pair => ({
    id: pair.id,
    tokenA: { name: pair.tokenA.name, address: pair.tokenA.address },
    tokenB: { name: pair.tokenB.name, address: pair.tokenB.address },
    pairAddress: pair.pairAddress,
  }))

  return formattedTokenPairs
}

const getTokenPair = async (tokenName: string) => {
  const tokenData = await findTokenByName(tokenName)
  if (!tokenData) {
    throw new BadRequestError('Token not found')
  }
  const tokenPairData = await TokenPair.findAll({
    where: {
      [Op.or]: [{ tokenAId: tokenData.id }, { tokenBId: tokenData.id }],
    },
    include: [
      {
        model: Token,
        as: 'tokenA',
        attributes: ['name', 'address'],
      },
      {
        model: Token,
        as: 'tokenB',
        attributes: ['name', 'address'],
      },
    ],
    attributes: {
      exclude: ['tokenAId', 'tokenBId', 'createdAt', 'updatedAt'],
    },
  })

  const formattedTokenPairs = tokenPairData.map(pair => {
    const isTokenNameInTokenA =
      pair.tokenA.name.toUpperCase() === tokenName.toUpperCase()
    return {
      id: pair.id,
      pairAddress: pair.pairAddress,
      token: isTokenNameInTokenA ? pair.tokenB : pair.tokenA,
    }
  })

  return {
    tokenAddress: tokenData.address,
    tokenPairs: formattedTokenPairs,
  }
}

const findAllTokens = async () => {
  const tokens = await Token.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  })
  return tokens
}

const findAllRealTokens = async () => {
  const tokens = await RealToken.findAll()
  return tokens
}

const findTokenById = async (tokenId: string) => {
  const token = await Token.findByPk(tokenId, {
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  })
  return token
}

const findTokenByName = async (tokenName: string) => {
  const token = await Token.findOne({
    where: {
      name: tokenName,
    },
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  })
  return token
}

const findRealTokenByName = async (tokenName: string) => {
  const token = await RealToken.findOne({
    where: {
      name: tokenName,
    },
  })
  return token
}

export const tokenRepository = {
  findAllTokens,
  findTokenById,
  findTokenByName,
  createTokenPair,
  getTokenPairs,
  getTokenPair,
  createToken,
  createRealToken,
  addPrice,
  findAllRealTokens,
}
