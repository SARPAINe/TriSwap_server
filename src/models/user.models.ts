import { DataTypes, Model } from 'sequelize'
import sequelize from './../config/sequelize.config'

class User extends Model {
  declare id: string
  declare role: string
  declare email: string
  declare image: string
  declare phone: string
  declare lastName: string
  declare firstName: string
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },

    firstName: {
      type: DataTypes.STRING,
    },

    lastName: {
      type: DataTypes.STRING,
    },

    image: {
      type: DataTypes.STRING,
    },

    phone: {
      type: DataTypes.STRING,
    },

    role: {
      type: DataTypes.ENUM('ADMIN', 'USER'),
      allowNull: false,
      defaultValue: 'USER',
    },
  },
  { tableName: 'users', sequelize },
)

export default User
