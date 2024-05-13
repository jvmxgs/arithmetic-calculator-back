import 'reflect-metadata'
import { DataSource } from 'typeorm'
import * as dotenv from 'dotenv'

dotenv.config()

const AppTestDataSource = new DataSource({
  type: 'sqlite',
  database: ':memory:',
  synchronize: true,
  logging: false,
  dropSchema: true,
  entities: ['src/database/entities/*.ts'],
  migrations: ['src/database/migrations/*.ts'],
  subscribers: []
})

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: ['src/database/entities/*.ts'],
  migrations: ['src/database/migrations/*.ts'],
  subscribers: []
})

const currentDataSource = process.env.NODE_ENV === 'test' ? AppTestDataSource : AppDataSource

export default currentDataSource
