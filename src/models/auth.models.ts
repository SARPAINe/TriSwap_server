import { DataTypes, Model } from 'sequelize'
import sequelize from './../config/sequelize.config'
import User from './user.models'

class Auth extends Model {
  declare id: string
  declare userId: string
  declare password: string
  declare isVerified: boolean
  declare verificationToken: string | null
  declare passwordResetToken: string | null
  declare refreshToken: string | null
}

Auth.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    userId: {
      type: DataTypes.UUID,
      allowNull: false, // for mandatory associations
      unique: true,
      references: {
        model: User,
        key: 'id',
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },

    verificationToken: {
      type: DataTypes.STRING,
    },
    passwordResetToken: {
      type: DataTypes.STRING,
    },

    refreshToken: {
      type: DataTypes.STRING,
    },
  },
  { tableName: 'auth', sequelize },
)

export default Auth
