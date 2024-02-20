import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { tokenServices } from '../services/token.services'
import {
  CreateTokenDTO,
  CreateTokenPairDTO,
  CreateRealTokenDTO,
  AddPriceDTO,
} from '../dto'
import User from '../models/user.models'
import { BadRequestError } from '../errors'

const createToken: RequestHandler = async (req, res) => {
  const { id: userId } = req.user as User
  const tokenObj: CreateTokenDTO = {
    userId,
    ...req.body,
  }
  const token = await tokenServices.createToken(tokenObj)

  const apiResponse = {
    success: true,
    message: `New ${req.body.name} token created`,
    data: token,
  }
  res.status(StatusCodes.CREATED).json(apiResponse)
}

const createRealToken: RequestHandler = async (req, res) => {
  const tokenObj: CreateRealTokenDTO = {
    ...req.body,
  }

  const token = await tokenServices.createRealToken(tokenObj)
  const apiResponse = {
    success: true,
    message: `New ${req.body.name} token created`,
    data: token,
  }
  res.status(StatusCodes.CREATED).json(apiResponse)
}

const addPrice: RequestHandler = async (req, res) => {
  const newPrices: AddPriceDTO = {
    ...req.body,
  }

  if (!Array.isArray(newPrices.price)) {
    return res
      .status(400)
      .json({ error: 'Invalid input. Please provide an array of prices.' })
  }

  const realToken = await tokenServices.addPrice(newPrices)
  const apiResponse = {
    success: true,
    message: `New prices added`,
    data: realToken,
  }
  res.status(StatusCodes.OK).json(apiResponse)
}

const getAllTokens: RequestHandler = async (req, res) => {
  const tokens = await tokenServices.getAllTokens()

  const apiResponse = {
    success: true,
    message: 'Get all tokens',
    data: tokens,
  }
  res.status(StatusCodes.OK).json(apiResponse)
}

const getRealToken: RequestHandler = async (req, res) => {
  const tokens = await tokenServices.getRealTokens()

  const apiResponse = {
    success: true,
    message: 'Get all real tokens',
    data: tokens,
  }
  res.status(StatusCodes.OK).json(apiResponse)
}

const getToken: RequestHandler = async (req, res) => {
  const { id: tokenId } = req.params
  const token = await tokenServices.getToken(tokenId.toUpperCase())

  const apiResponse = {
    success: true,
    message: 'Get single tokens',
    data: token,
  }
  res.status(StatusCodes.OK).json(apiResponse)
}

const getTokenByName: RequestHandler = async (req, res) => {
  const { name } = req.params
  const token = await tokenServices.getTokenByName(name.toUpperCase())

  const apiResponse = {
    success: true,
    message: 'Get single tokens',
    data: token,
  }
  res.status(StatusCodes.OK).json(apiResponse)
}

const checkTokenExistence: RequestHandler = async (req, res) => {
  const { name } = req.query as { name: string }

  if (!name) {
    throw new BadRequestError('Name has to be provided')
  }

  const tokenExists = await tokenServices.checkTokenExistence(
    name.toUpperCase(),
  )

  const apiResponse = {
    success: true,
    data: tokenExists,
  }
  res.status(StatusCodes.OK).json(apiResponse)
}

const createTokenPair: RequestHandler = async (req, res) => {
  const { id: userId } = req.user as User

  const tokenPairData: CreateTokenPairDTO = {
    userId,
    ...req.body,
  }
  const newPair = await tokenServices.createTokenPair(tokenPairData)
  const apiResponse = {
    success: true,
    message: 'New Token pair Created',
    data: newPair,
  }
  res.status(StatusCodes.CREATED).json(apiResponse)
}

const getTokenPair: RequestHandler = async (req, res) => {
  const { id: tokenId } = req.params
  const tokenPairData = await tokenServices.getTokenPair(tokenId)
  const apiResponse = {
    success: true,
    message: 'Get all token pairs',
    data: tokenPairData,
  }
  res.status(StatusCodes.OK).json(apiResponse)
}

const getTokenPairs: RequestHandler = async (req, res) => {
  const tokenPairs = await tokenServices.getAllTokenPairs()
  const apiResponse = {
    success: true,
    message: 'Get token pairs',
    data: tokenPairs,
  }
  res.status(StatusCodes.OK).json(apiResponse)
}

export {
  getAllTokens,
  getToken,
  getTokenPairs,
  getTokenPair,
  createTokenPair,
  createToken,
  getTokenByName,
  checkTokenExistence,
  createRealToken,
  addPrice,
  getRealToken,
}
