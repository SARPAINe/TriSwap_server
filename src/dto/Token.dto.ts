// change token to name
export interface CreateTokenDTO {
  name: string
  description?: string
  address: string
  userId: string
  systemGenerated?: boolean
  decimals?: number
}

export interface CreateTokenPairDTO {
  userId: string
  pairAddress: string
  tokenAId: string
  tokenBId: string
}

export interface CreateRealTokenDTO {
  userId: string
  price: number[]
}

export interface AddPriceDTO {
  name: string
  price: number[]
}
