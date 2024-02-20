/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/sequelize.config'
import Token from './token.models'
import User from './user.models'
import { ConflictError } from '../errors'

class TokenPair extends Model {
  declare id: string
  declare tokenAId: string
  declare tokenBId: string
  declare pairAddress: string

  // Defined in associations
  declare tokenA: Token
  declare tokenB: Token
}

TokenPair.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    tokenAId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Token,
        key: 'id',
      },
    },
    tokenBId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Token,
        key: 'id',
      },
    },
    pairAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
  },

  {
    sequelize,
    tableName: 'token_pair',
  },
)

TokenPair.addHook('beforeValidate', async (tokenPair: any) => {
  const reversedPairExists = await TokenPair.findOne({
    where: {
      tokenAId: tokenPair.tokenBId,
      tokenBId: tokenPair.tokenAId,
    },
  })

  if (reversedPairExists) {
    throw new ConflictError('the pair with reversed token already exists')
  }
})

export default TokenPair
