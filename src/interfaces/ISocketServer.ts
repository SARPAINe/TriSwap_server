interface CryptoData {
  tokenName: string
  symbol: string
  icon: string
  name: string
  price: number[]
  currentPrice: number
}
// updates.push({
//   tokenName,
//   symbol: realToken.symbol, // Adjust according to your model structure
//   icon: realToken.icon, // Adjust according to your model structure
//   price: realToken.price,
//   currentPrice,
// })

// Define the interface for the entire object
interface CryptoPrices {
  aave: CryptoData
  bitcoin: CryptoData
  chainlink: CryptoData
  dai: CryptoData
  dogecoin: CryptoData
  ethereum: CryptoData
  maker: CryptoData
  'matic-network': CryptoData
  solana: CryptoData
  tether: CryptoData
}

export interface ServerToClientEvents {
  message: (message: string) => void
  noArg: () => void
  basicEmit: (a: number, b: string, c: Buffer) => void
  withAck: (d: string, callback: (e: number) => void) => void
  updateAnalytics: (data: CryptoData[]) => void
}

export interface ClientToServerEvents {
  message: () => void
}

export interface InterServerEvents {
  ping: () => void
}

export interface SocketData {
  name: string
  age: number
}
