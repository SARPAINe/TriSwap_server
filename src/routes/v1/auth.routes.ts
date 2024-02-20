import express from 'express'
import {
  registerUser,
  loginUser,
  logoutUser,
  verifyUserEmail,
  forgotUserPassword,
  resetUserPassword,
  changeUserPassword,
  refresh,
} from '../../controllers/auth.controllers'
import { isAuthenticated } from '../../middlewares/auth.middlewares'
import { validator } from '../../middlewares/validator.middleware'
import {
  changePasswordSchema,
  forgotPasswordSchema,
  loginUserSchema,
  registerUserSchema,
  resetPasswordSchema,
  resetPasswordTokenSchema,
  verifyEmailSchema,
} from '../../validators/auth.validators'
const router = express.Router()

router
  .route('/register')
  .post([validator('body', registerUserSchema)], registerUser)
router
  .route('/verify')
  .get([validator('query', verifyEmailSchema)], verifyUserEmail)
router.route('/login').post([validator('body', loginUserSchema)], loginUser)
router
  .route('/forgot-password')
  .post([validator('body', forgotPasswordSchema)], forgotUserPassword)
router
  .route('/reset-password')
  .post(
    [
      validator('body', resetPasswordSchema),
      validator('query', resetPasswordTokenSchema),
    ],
    resetUserPassword,
  )
router
  .route('/change-password')
  .post(
    [isAuthenticated, validator('body', changePasswordSchema)],
    changeUserPassword,
  )
router.route('/refresh').post(refresh)
router.route('/logout').post([isAuthenticated], logoutUser)

export default router
