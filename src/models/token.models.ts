import { DataTypes, Model } from 'sequelize'
import sequelize from './../config/sequelize.config'
import User from './user.models'

class Token extends Model {
  declare id: string
  declare name: string
  declare description: string
  declare address: string
  declare decimals: number
}

Token.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false, // for mandatory associations
      references: {
        model: User,
        key: 'id',
      },
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    systemGenerated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    decimals: {
      type: DataTypes.TINYINT,
      defaultValue: 18,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'token',
  },
)

export default Token
