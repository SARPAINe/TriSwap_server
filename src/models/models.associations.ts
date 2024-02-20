import User from './user.models'
import Auth from './auth.models'
import Token from './token.models'
import TokenPair from './tokenPair.models'
import TransactionHash from './transactionHash.model'

const defineAssociations = () => {
  // user-auth association one-to-one
  User.hasOne(Auth, { foreignKey: 'userId', onDelete: 'CASCADE' })
  Auth.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' })

  // user-token association one-to-many
  User.hasMany(Token, { foreignKey: 'userId' })
  Token.belongsTo(User, { foreignKey: 'userId' })

  // user-transaction_hash association one-to-many
  User.hasMany(TransactionHash, { foreignKey: 'userId' })
  TransactionHash.belongsTo(User, { foreignKey: 'userId' })

  // token-tokenPair association many-to-many (as 'tokenA' and 'tokenB')
  Token.hasMany(TokenPair, { foreignKey: 'tokenAId', as: 'tokenA' })
  TokenPair.belongsTo(Token, { foreignKey: 'tokenAId', as: 'tokenA' })

  Token.hasMany(TokenPair, { foreignKey: 'tokenBId', as: 'tokenB' })
  TokenPair.belongsTo(Token, { foreignKey: 'tokenBId', as: 'tokenB' })
}

export default defineAssociations
