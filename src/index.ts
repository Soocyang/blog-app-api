import "reflect-metadata"
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc';
import express from 'express'
import { json } from 'body-parser'

import routes from './routes'
import { errorHandler, logErrors } from './middleware'
import { Exception } from './config'
import { AppDataSource } from "./data-source";
import { swaggerOptions } from "./config/swagger/swagger";

(() => {
  const APP_PORT = process.env.PORT || 4000
  const app = express()
  app.use(json())
  app.use('/', routes)

  const swaggerSpec = swaggerJSDoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  app.all('*', (req, res, next) => next(new Exception('E0006', `Can't find ${req.originalUrl} on this service`, 404)))
  app.use(logErrors)
  app.use(errorHandler)

  app.listen(APP_PORT)
  console.info(`🚀 Blog api server started on \n\n  ✔ url: http://localhost:${APP_PORT} \n 📃 swaggerdoc: http://localhost:${APP_PORT}/api-docs/#/\n\n`)

  AppDataSource.initialize()
    .then(() => console.info('synced to sqlite db'))
    .catch((error) => console.error(error))
})()


