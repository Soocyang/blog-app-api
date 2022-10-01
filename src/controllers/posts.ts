import { Request, Response, NextFunction, RequestHandler } from 'express'

export const getPosts: RequestHandler = (req, res, next) => {
  
  res.json('Hello')
}
