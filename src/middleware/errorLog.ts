import { Request, Response, NextFunction } from "express"

export const logErrors = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)
  next(err)
}