/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/sequelize.config'
import User from './user.models'

class TransactionHash extends Model {
  declare id: string
  declare userId: string
  declare transactionHash: string
}

TransactionHash.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    transactionHash: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: 'transaction_hash',
  },
)

export default TransactionHash
