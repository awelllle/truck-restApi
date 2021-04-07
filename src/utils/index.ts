import request from 'request'

import createHandleToken, { IHandleToken } from './handleToken'
import createHandleNetwork, { IHandleNetwork } from './handleNetwork'
import createHandleStrings, { IHandleStrings } from './handleStrings'
import createHandleResult, { IHandleResult } from './handleResult'

const handleResult = createHandleResult()
const handleToken = createHandleToken({ handleResult })
const handleResponse = createHandleNetwork({ request })
const handleStrings = createHandleStrings()

interface Utils
  extends IHandleResult,
    IHandleToken,
    IHandleStrings,
    IHandleNetwork {}

const module: Utils = Object.freeze({
  ...handleToken,
  ...handleResponse,
  ...handleStrings,
  ...handleResult
})

export default module
