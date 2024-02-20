export interface IAccessToken {
  access_token: string
  expires: string
}

export interface IRefreshToken {
  refresh_token: string
  expires: string
}

export interface ITokens {
  access: IAccessToken
  refresh: IRefreshToken
}
