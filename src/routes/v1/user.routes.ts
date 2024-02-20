import { Router } from 'express'
import {
  getAllUsers,
  getUser,
  getMe,
  updateMe,
  countUsers,
} from '../../controllers/user.controllers'
import {
  isAdmin,
  isAuthenticated,
  isEmailVerified,
} from '../../middlewares/auth.middlewares'

const router = Router()

router.use(isAuthenticated)
// router.route('/').get([isEmailVerified, isAdmin], getAllUsers)
router.route('/').get(isAdmin, getAllUsers)
router.route('/get-me').get(getMe)
router.route('/update-me').get([isEmailVerified], updateMe)
router.route('/count-users').get([isAdmin], countUsers)
router.route('/:id').get([isEmailVerified, isAdmin], getUser) // should be at the end or matches other routes

export default router
