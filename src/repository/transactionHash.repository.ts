import { CreateTransactionHashDTO } from '../dto'
import TransactionHash from '../models/transactionHash.model'

const createTransaction = async (
  createTransactionHashDto: CreateTransactionHashDTO,
) => {
  const { userId, transactionHash } = createTransactionHashDto
  const newTransactionHash = await TransactionHash.create({
    userId,
    transactionHash,
  })
  return newTransactionHash
}

const getAllTransactions = async () => {
  return await TransactionHash.findAll()
}

const getMyTransactions = async (userId: string) => {
  return await TransactionHash.findAll({
    where: {
      userId: userId,
    },
  })
}

const countTransactions = async () => {
  return await TransactionHash.count()
}

export const transactionHashRepository = {
  getAllTransactions,
  getMyTransactions,
  createTransaction,
  countTransactions,
}
