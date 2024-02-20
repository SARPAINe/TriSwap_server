import express from 'express'
import { isAdmin, isAuthenticated } from '../../middlewares/auth.middlewares'
import {
  countTransactions,
  createTransaction,
  getAllTransactions,
  getMyTransactions,
} from '../../controllers/transactionHash.controller'

const router = express.Router()

router.use(isAuthenticated)
router.route('/').get([isAdmin], getAllTransactions)
router.route('/').post(createTransaction)
router.route('/my-transactions').get(getMyTransactions)
router.route('/count-transactions').get(countTransactions)

export default router
