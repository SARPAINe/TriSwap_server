import { DataTypes, Model } from 'sequelize'
import sequelize from './../config/sequelize.config'

class RealToken extends Model {
  declare id: string
  declare name: string
  declare tokenName: string
  declare symbol: string
  declare icon: string
  declare description: string
  declare price: number[]
  static async addPrices(
    tokenName: string,
    newPrices: number[],
  ): Promise<void> {
    try {
      const token = await RealToken.findOne({ where: { name: tokenName } })

      if (token) {
        token.price = [...token.price, ...newPrices]
        await token.save()
      } else {
        throw new Error('Token not found')
      }
    } catch (error: any) {
      throw new Error(`Error adding prices: ${error.message}`)
    }
  }

  // Define the virtual field
  get latestPrice(): number {
    const prices = this.getDataValue('price')
    return prices.length > 0 ? prices[prices.length - 1] : 0
  }
}

RealToken.init(
  {
    // id: {
    //   type: DataTypes.UUID,
    //   defaultValue: DataTypes.UUIDV4,
    //   primaryKey: true,
    // },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      primaryKey: true,
    },
    tokenName: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: sequelize.literal('"name"'),
    },
    symbol: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: sequelize.literal('"name"'),
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: sequelize.literal('"name"'),
    },
    description: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.JSON, // Use JSON type instead of ARRAY
      defaultValue: [],
      get() {
        // Parse the stored JSON string to an array
        const rawValue = this.getDataValue('price')
        return rawValue ? JSON.parse(rawValue) : []
      },
      set(value: number[]) {
        // Store the array as a JSON string
        this.setDataValue('price', JSON.stringify(value))
      },
    },
    currentPrice: {
      type: DataTypes.VIRTUAL,
      get() {
        const prices = this.getDataValue('price')
        const priceArray = prices ? JSON.parse(prices) : []
        return priceArray.length > 0 ? priceArray[priceArray.length - 1] : 0
      },
    },
  },
  {
    sequelize,
    tableName: 'realToken',
  },
)

export default RealToken
