import express from 'express'
import { json } from 'body-parser'

import routes from './routes'
import { errorHandler, logErrors } from './middleware'
import { Exception } from './config'

(() => {

  const app = express()
  app.use(json())
  app.use('/', routes)
  app.all('*', (req, res, next) => {
    next(new Exception('E0006', `Can't find ${req.originalUrl} on this service`, 404))
  })

  app.use(logErrors)
  app.use(errorHandler)

  app.listen(3000)
  console.info('Express app started on port 3000')
})()


