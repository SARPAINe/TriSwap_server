import { RequestHandler } from 'express'
import { transactionHashServices } from '../services/transactionHash.services'
import { StatusCodes } from 'http-status-codes'
import User from '../models/user.models'
import { CreateTransactionHashDTO } from '../dto'

const createTransaction: RequestHandler = async (req, res) => {
  const { transactionHash } = req.body
  const user = req.user as User

  const createTransactionHashDto: CreateTransactionHashDTO = {
    userId: user.id,
    transactionHash,
  }
  const newTransactionHash = await transactionHashServices.createTransaction(
    createTransactionHashDto,
  )
  const apiResponse = {
    success: true,
    message: 'Transaction Hash Created',
    data: {
      transactionHash: newTransactionHash,
    },
  }
  res.status(StatusCodes.CREATED).json(apiResponse)
}

const getAllTransactions: RequestHandler = async (req, res) => {
  const transactions = await transactionHashServices.getAllTransactionHash()
  const apiResponse = {
    success: true,
    message: 'All transaction hashes retrieved.',
    data: transactions,
  }
  res.status(StatusCodes.OK).json(apiResponse)
}

const countTransactions: RequestHandler = async (req, res) => {
  const transactionCount = await transactionHashServices.countTransactions()
  const apiResponse = {
    success: true,
    message: 'Count of transactions retrieved.',
    data: {
      count: transactionCount,
    },
  }
  res.status(StatusCodes.OK).json(apiResponse)
}

const getMyTransactions: RequestHandler = async (req, res) => {
  const user = req.user as User
  const userId = user.id

  const transactions = await transactionHashServices.getMyTransactions(userId)
  const apiResponse = {
    success: true,
    message: 'All transaction hashes retrieved.',
    data: transactions,
  }
  res.status(StatusCodes.OK).json(apiResponse)
}

export {
  countTransactions,
  getAllTransactions,
  createTransaction,
  getMyTransactions,
}
