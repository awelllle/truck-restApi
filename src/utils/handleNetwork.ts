// For the network call, there are too many unknown factor
// TO-DO: remove this eslint rule
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Response } from 'express'
import { Request, RequestAPI, CoreOptions } from 'request'

type DynamicContent = string | Record<string, unknown> | null | undefined

export interface IHandleNetwork {
  sendErrorResponse: (
    res: Response,
    content: DynamicContent,
    message: string | Error | undefined | null,
    status?: number
  ) => void
  sendSuccessResponse: (
    res: Response,
    content: DynamicContent,
    message: string,
    status?: number
  ) => void
  sendGetRequest: (
    data: DynamicContent,
    token: string,
    path: string,
    cb: (error: any, data: any) => void
  ) => void
  sendPutRequest: (
    data: DynamicContent,
    token: string,
    path: string,
    cb: (error: any, data: any) => void
  ) => void
  sendPostRequest: (
    data: DynamicContent,
    token: string,
    path: string,
    cb: () => void
  ) => void
}

interface RequestHeader {
  'Content-Type': string
  Authorization: string
}

interface RequestOptions {
  url: string
  body?: string | Record<string, unknown> | null | undefined
  json?: boolean
  headers?: RequestHeader
}

interface Dependencies {
  request: RequestAPI<Request, CoreOptions, RequestOptions>
}

const createHandleResponse = ({ request }: Dependencies): IHandleNetwork => {
  const sendErrorResponse = function (
    res: Response,
    content: DynamicContent,
    message: string | Error | undefined | null,
    status?: number
  ) {
    const data = {
      success: false,
      message:
        message && typeof message !== 'string' ? message?.message : message,
      data: content
    }

    res.status(!status ? 500 : status).json(data)
  }
  const sendSuccessResponse = function (
    res: Response,
    content: DynamicContent,
    message: string,
    status?: number
  ) {
    const data = {
      success: true,
      message,
      data: content
    }

    res.status(!status ? 200 : status).json(data)
  }

  const sendPostRequest = (
    data: DynamicContent,
    token: string,
    path: string,
    cb: (error: any, data: any) => void
  ) => {
    const appUrl = process.env.APP_URL
    let response = ''

    const authRequest = request.post(
      {
        url: `${appUrl}${path}`,
        body: data,
        json: true,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer  ${token}`
        }
      },
      function (error, res, body) {
        if (error) {
          console.log(error)
          cb(error, body)
        }
      }
    )

    authRequest.on('data', (_data) => {
      response += _data
    })

    authRequest.on('end', () => {
      try {
        const dataRsp = JSON.parse(response)

        if (dataRsp.success) {
          cb(null, dataRsp.data)
        }
      } catch (e) {
        console.log(e)
      }
      cb(true, data)
    })
  }

  const sendPutRequest = (
    data: DynamicContent,
    token: string,
    path: string,
    cb: (error: any, data: any) => void
  ) => {
    const authUrl = process.env.AUTH_URL
    let response = ''

    const authRequest = request.put(
      {
        url: `${authUrl}${path}`,
        body: data,
        json: true,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      },
      function (error, res, body) {
        if (error) {
          console.log(error)
          cb(error, body)
        }
      }
    )

    authRequest.on('data', (_data) => {
      response += _data
    })

    authRequest.on('end', () => {
      try {
        const dataRsp = JSON.parse(response)

        if (dataRsp.success) {
          return cb(null, dataRsp.data)
        }
      } catch (e) {
        console.log(e)
      }

      return cb(true, data)
    })
  }

  const sendGetRequest = (
    data: DynamicContent,
    token: string,
    path: string,
    cb: (error: any, data: any) => void
  ) => {
    const authUrl = process.env.AUTH_URL
    let response = ''

    const authRequest = request.get(
      {
        url: `${authUrl}${path}`,
        qs: data,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      },
      function (error, res, body) {
        if (error) {
          console.log(error)
          cb(error, body)
        }
      }
    )

    authRequest.on('data', (_data) => {
      response += _data
    })

    authRequest.on('end', () => {
      try {
        const dataRsp = JSON.parse(response)

        if (dataRsp.success) {
          return cb(null, dataRsp.data)
        }
      } catch (e) {
        console.log(e)
      }

      return cb(true, data)
    })
  }

  return {
    sendErrorResponse,
    sendSuccessResponse,
    sendGetRequest,
    sendPutRequest,
    sendPostRequest
  }
}

export default createHandleResponse
