import passport from 'passport'
import passportJwt from 'passport-jwt'
import { userRepository } from '../repository/user.repository'
import { config } from '.'
import { IUser } from '../interfaces'

const JwtStrategy = passportJwt.Strategy
const ExtractJwt = passportJwt.ExtractJwt

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwt.access_token.secret,
}

// handles the access token only
const strategy = new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
  try {
    const id = jwt_payload.sub
    const user = (await userRepository.findUserById(id)) as IUser

    if (!user) {
      return done(null, false, { message: 'Invalid token' })
    } else {
      return done(null, user) // attach user to request object
    }
  } catch (err) {
    done(err)
  }
})
passport.use(strategy)
