import "reflect-metadata"
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc';
import express from 'express'
import { json } from 'body-parser'

import routes from './routes'
import { errorHandler, logErrors } from './middleware'
import { Exception } from './config'
import { AppDataSource } from "./data-source";

(() => {
  const APP_PORT = process.env.PORT || 4000
  const app = express()
  app.use(json())
  app.use('/', routes)

  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Blog API',
        description: 'This is a REST API application made with Express. It retrieves blog posts related data',
        version: '1.0.0',
      },
      servers: [
        {
          url: 'http://localhost:4000',
          description: 'Development server',
        },
      ],
    },
    apis: ['./src/routes/**.ts'],
  }
  const swaggerSpec = swaggerJSDoc(options);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  app.all('*', (req, res, next) => {
    next(new Exception('E0006', `Can't find ${req.originalUrl} on this service`, 404))
  })

  app.use(logErrors)
  app.use(errorHandler)

  app.listen(APP_PORT)
  console.info(`Blog api server started on port ${APP_PORT}`)

  AppDataSource.initialize()
    .then(() => console.info('connected to sqlite db'))
    .catch((error) => console.error(error))

})()


