export interface IApiResponse<T> {
  success: boolean
  message: string
  count?: number
  data?: T
}
