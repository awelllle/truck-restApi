import createError from 'http-errors'
import express, { NextFunction, Request, Response } from 'express'

const createErrorHandler = (app: express.Express): void => {
  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(createError(404))
  })

  // Catch unauthorised errors
  app.use(function (err: Error, {}, res: Response, {}) {
    if (err.name === 'UnauthorizedError') {
      res.status(401)
      res.json({ message: err.name + ': ' + err.message })
    } else {
      throw err
    }
  })

  // error handler
  app.use(function (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    res.status(500).send('Internal server error!')
    next()
  })
}

export default createErrorHandler
