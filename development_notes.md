# passport local strategy with session and sequelize

For configuring passport-local strategy we need to enable session store of sequelize to store user sessions

changes to `app.ts`

```nodejs
import session from 'express-session'
import connectSession from 'connect-session-sequelize'

import { sequelize } from './config/sequelize.config'

const SequelizeStore = connectSession(session.Store)
const sessionStore = new SequelizeStore({ db: sequelize })
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  }),
)

sessionStore.sync()


import './config/passport.config'

app.use(passport.initialize())
app.use(passport.session())
```

`passport-local.config.ts`

```nodejs

import passport from 'passport'
import LocalStrategy from 'passport-local'
import { authDbServices } from '../services/authDb.services'
import { cryptoServices } from '../services/crypto.services'
import User from '../models/user.models'

const customFields = {
  usernameField: 'email',
  passwordField: 'password',
}

const verifyCallback: LocalStrategy.VerifyFunction = async (
  email,
  password,
  cb,
) => {
  try {
    // get user by email
    console.log('passport_config: this is called')
    const user = await authDbServices.findUserByEmail(email)

    // if no user found
    if (!user) {
      return cb(null, false, { message: 'Incorrect email or password.' })
    }

    // if user's password is matched
    const isValidPassword = await cryptoServices.comparePassword(
      password,
      user.password,
    )
    if (isValidPassword) {
      cb(null, user) // send user to the req
    } else {
      cb(null, false, { message: 'Incorrect email or password.' })
    }
  } catch (err) {
    cb(err)
  }
}

const strategy = new LocalStrategy.Strategy(customFields, verifyCallback)

passport.use(strategy)

// need to comeback
passport.serializeUser((user, done) => {
  done(null, (user as User).id)
})

// populates req.user
passport.deserializeUser(async (userId: string, done) => {
  try {
    const user = await authDbServices.findUserById(userId)
    done(null, user)
  } catch (err) {
    done(err)
  }
})
```

`auth.middleware.ts`

```nodejs
const isAuthenticated: RequestHandler = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  throw new UnauthenticatedError('User not authorized to view this resource')
}
```

`auth.routes.ts`

```nodejs

import express from 'express'
import {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
} from '../../controllers/auth.controllers'
import passport from 'passport'
import { isAuthenticated, isAdmin } from '../../middlewares/auth.middlewares'

const router = express.Router()

router.route('/register').post(registerUser)
router.route('/user/:userId').get([isAuthenticated, isAdmin], getUser) // this is protected
router
  .route('/login')
  .post(
    passport.authenticate('local', { failureRedirect: '/login-failure' }),
    loginUser,
  )

// this is not needed
router.route('/login-failure').get((req, res) => {
  res.send('log in failed')
})

router.route('/logout').get(logoutUser)

export default router
```
