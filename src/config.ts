export interface Config {
  NODE_ENV: string,
  PORT: number,
  ORIGIN: string,
  CREDENTIALS: boolean,
  MONGODB_URI: string,
}

const config: Config = {
  NODE_ENV: process.env.NODE_ENV!,
  PORT: Number(process.env.PORT),
  ORIGIN: process.env.ORIGIN!,
  CREDENTIALS: process.env.CREDENTIALS === 'true',
  MONGODB_URI: process.env.MONGODB_URI!,
}

export default config
