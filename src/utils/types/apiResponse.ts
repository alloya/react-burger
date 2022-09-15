interface TSuccessResponse {
  success: boolean
}

export interface TApiResponse extends TSuccessResponse {
  [name: string]: any
}