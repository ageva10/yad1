import { Request, Response, NextFunction } from 'express'

export default (err: any, req: Request, res: Response, next: NextFunction): void => {
  console.error(err)
  next()
}
