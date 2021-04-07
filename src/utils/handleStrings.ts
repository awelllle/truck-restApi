export interface IHandleStrings {
  validParam: (
    obj: Record<string, unknown>,
    requiredParam: Array<ValidParam>
  ) => ValidParamsResult
  trimCollection: (data: Record<string, unknown>) => Record<string, unknown>
  capitalize: (str: string) => string
}

export interface ValidParamsResult {
  success: boolean
  message: Array<string>
}
interface ValidParam {
  name: string
  type: string
}

const createHandleStrings = (): IHandleStrings => {
  const validParam = (
    obj: Record<string, unknown>,
    requiredParam: Array<ValidParam>
  ): ValidParamsResult => {
    const objKeys = Object.keys(obj)
    const notFound: Array<string> = []
    let success = true

    requiredParam.forEach((param) => {
      const idx = objKeys.findIndex((k) => {
        return k === param.name
      })

      if (idx < 0) {
        notFound.push(`${param.name} is required`)
        success = false
      } else if (param.type && typeof obj[param.name] !== param.type) {
        notFound.push(`${param.name} should be ${param.type}`)
        success = false
      }
    })

    return {
      success,
      message: notFound
    }
  }

  const trimCollection = (
    data: Record<string, unknown>
  ): Record<string, unknown> => {
    const newData = { ...data }

    Object.keys(data).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const value = data[key]
        if (typeof value === 'string') {
          newData[key] = value.trim()
        }
      }
    })

    return newData
  }

  const capitalize = (str: string): string => {
    if (str.length > 0) {
      const temp = str.substr(1)

      return str.charAt(0).toUpperCase() + temp
    }

    return str
  }

  return {
    validParam,
    trimCollection,
    capitalize
  }
}

export default createHandleStrings
