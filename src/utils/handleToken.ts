import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { IHandleResult, IServiceResponse } from './handleResult'

export interface IHandleToken {
  authenticate: (
    token: string
  ) => Promise<IServiceResponse<Record<string, unknown> | string | null>>
  generateCode: (length: number) => string

  hashPassword: (password: string) => Promise<string>
  normalizeEmail: (emailString: string) => string
}

interface Dependencies {
  handleResult: IHandleResult
}

const createHandleToken = ({ handleResult }: Dependencies): IHandleToken => {
  // Using any due to jwt using object
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const authenticate = async (
    token: string
  ): Promise<IServiceResponse<any>> => {
    if (token !== '') {
      // Token shouldn't be empty, but just incase it is
      const jwtSecret = process.env.JWT_SECRET || ''
      try {
        const decoded = await jwt.verify(token, jwtSecret)
        return handleResult.newServiceResponse(decoded)
      } catch (e) {
        return handleResult.newServiceResponse(
          null,
          new Error('Token is either Invalid or has expired')
        )
      }
    }
    return handleResult.newServiceResponse(
      null,
      new Error('No Authorisation header')
    )
  }

  const getRandomInt = function (min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const generateCode = (length: number) => {
    const timestamp = Date.now().toString()

    const parts = timestamp.split('').reverse()
    let id = ''

    for (let i = 0; i < length; ++i) {
      const index = getRandomInt(0, parts.length - 1)

      id += parts[index]
    }

    return id
  }

  const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = bcrypt.hash(password, salt)

    return hashedPassword
  }

  const normalizeEmail = (emailString: string) => {
    // '.' characters and uppercase letters must be ignored,
    // so that, e.g., "John.Smith@gmail" is rejected if "johnsmith@gmail"
    // already exists in DB.
    const emailStringLower = emailString.toLowerCase()
    const split = emailStringLower.split('@')

    return `${split[0].replace('.', '')}@${split[1]}`
  }

  return {
    authenticate,
    generateCode,
    hashPassword,
    normalizeEmail
  }
}

export default createHandleToken
