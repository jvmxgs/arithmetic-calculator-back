import * as dotenv from 'dotenv'
import path from 'path'
import 'reflect-metadata'
import { DataSource } from 'typeorm'

dotenv.config()

const AppTestDataSource = new DataSource({
  type: 'postgres',
  host: process.env.TEST_DB_HOST,
  port: Number(process.env.TEST_DB_PORT),
  username: process.env.TEST_DB_USERNAME,
  password: process.env.TEST_DB_PASSWORD,
  database: process.env.TEST_DB_NAME,
  synchronize: true,
  logging: false,
  entities: [path.join(__dirname, 'entities/*{.ts,.js}')],
  migrations: [path.join(__dirname, 'migrations/*{.ts,.js}')],
  subscribers: []
})

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: [path.join(__dirname, 'entities/*{.ts,.js}')],
  migrations: [path.join(__dirname, 'migrations/*{.ts,.js}')],
  subscribers: []
})

const currentDataSource = process.env.NODE_ENV === 'test' ? AppTestDataSource : AppDataSource

export default currentDataSource
