import { CreateTransactionHashDTO } from '../dto'
import { transactionHashRepository } from '../repository/transactionHash.repository'

const createTransaction = async (
  createTransactionHashDto: CreateTransactionHashDTO,
) => {
  return await transactionHashRepository.createTransaction(
    createTransactionHashDto,
  )
}

const getAllTransactionHash = async () => {
  return await transactionHashRepository.getAllTransactions()
}

const countTransactions = async () => {
  return await transactionHashRepository.countTransactions()
}

const getMyTransactions = async (userId: string) => {
  return await transactionHashRepository.getMyTransactions(userId)
}
export const transactionHashServices = {
  createTransaction,
  getAllTransactionHash,
  countTransactions,
  getMyTransactions,
}
