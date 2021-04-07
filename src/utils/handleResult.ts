export interface IHandleResult {
  newServiceResponse: <T>(
    result?: T,
    error?: Error | string
  ) => IServiceResponse<T>
}

export interface IServiceResponse<T> {
  result?: T
  error?: Error | string
}

const createHandleResult = (): IHandleResult => {
  const newServiceResponse = <T>(
    result?: T,
    error?: Error | string
  ): IServiceResponse<T> => {
    return {
      result,
      error
    }
  }

  return {
    newServiceResponse
  }
}

export default createHandleResult
