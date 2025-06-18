import { IRouter, Router } from 'express'
import { errorHandler } from './middlewares'
import { ProjectController } from './controllers'

export default class Routes {
  router: IRouter

  constructor() {
    this.router = Router()
    this.router.use(errorHandler)
    this.router.use('/projects', new ProjectController().getRouter())
  }

  getRouter(): IRouter {
    return this.router
  }
}
