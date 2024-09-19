import type { IErrorResponse, IFetchError } from "./types"

export const errorMessageHandling = (
    payload: IFetchError | IErrorResponse
  ): string => {
    if (payload?.status === 'FETCH_ERROR') return 'Server is unreachable.'
    else if (payload?.data?.statusCode) return payload?.data?.response.message
    return 'Something went wrong.'
  }