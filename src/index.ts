import express, { Application, Request, Response } from 'express'
import { createServer } from 'http'
import path from 'path'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import compression from 'compression'

const envPath: string = path.join(__dirname, '../.env')
dotenv.config({ path: envPath })

import config from './config'

import Routes from './routes'

class Server {
  private readonly app: Application = express()
  private readonly PORT: number = config.PORT
  private server: any

  constructor() {
    this.app.use(helmet({
      contentSecurityPolicy: false
    }))
    this.app.use(compression())
    this.app.use(express.json({ limit: '100kb' }))
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(cors({ origin: config.ORIGIN, credentials: config.CREDENTIALS }))

    if (config.NODE_ENV === 'production') {
      this.app.set('trust proxy', true)
    }

    this.server = createServer(this.app)
    this.app.use('/api', new Routes().getRouter())

    const root: string = path.join(__dirname, '../public/index.html')
    this.app.use(express.static(path.join(__dirname, '../public')))
    this.app.use('/', (req: Request, res: Response) => res.sendFile(root))

    this.listenServer()
  }

  private closeServer(): void {
    try {
      console.log('Server closed')
      this.server.close()
    } catch {
      process.exit()
    }
  }

  private listenServer(): void {
    this.server.listen(this.PORT, async (): Promise<void> => {
      console.log(`Server is running at http://localhost:${this.PORT}`)
      process.once('SIGINT', this.closeServer).once('SIGTERM', this.closeServer)
    })
  }
}

new Server()
