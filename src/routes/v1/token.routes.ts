import { Router } from 'express'
import {
  getToken,
  getAllTokens,
  getTokenPairs,
  getTokenPair,
  createTokenPair,
  createToken,
  createRealToken,
  getTokenByName,
  checkTokenExistence,
  addPrice,
  getRealToken,
} from '../../controllers/token.controllers'
import { isAdmin, isAuthenticated } from '../../middlewares/auth.middlewares'
import { validator } from '../../middlewares/validator.middleware'
import {
  createTokenPairSchema,
  createTokenSchema,
  createRealTokenSchema,
} from '../../validators/token.validators'

const router = Router()

// router.use([isAuthenticated])

router.route('/').get(getAllTokens)
router
  .route('/')
  .post(
    [isAuthenticated, isAdmin, validator('body', createTokenSchema)],
    createToken,
  )
router
  .route('/real-tokens')
  .post([validator('body', createRealTokenSchema)], createRealToken)
router.route('/real-tokens').get(getRealToken)
router.route('/real-tokens/add-price').post(addPrice)
router.route('/pair').get(getTokenPairs)
router.route('/pair/:id').get(getTokenPair)
router.route('/existence').get(checkTokenExistence)
router.route('/:id').get(getToken)
router.route('/name/:name').get(getTokenByName)
router
  .route('/pair')
  .post(
    [isAuthenticated, isAdmin, validator('body', createTokenPairSchema)],
    createTokenPair,
  )

export default router
