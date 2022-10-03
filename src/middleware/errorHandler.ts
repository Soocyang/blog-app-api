import { ErrorRequestHandler, Request, Response, NextFunction } from "express"

export const catchAsync = (fn: ((req: Request, res: Response, next: NextFunction) => Promise<any>)) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next)
  }
}

export const errorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  // console.log(err.stack)
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'
  
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  })
}