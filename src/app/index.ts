import express from 'express'
import createAppApi from 'app/routeHandler'
import createErrorHandler from './errorHandler'
import createConfigHandler from './configHandler'

const app = express()

/**
 * App config
 */
createConfigHandler(app)

/**
 * Api routing section
 */
createAppApi(app)

/**
 * Global Error handler
 */
createErrorHandler(app)

export default app
