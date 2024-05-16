import dotenv from 'dotenv'
import app from './app'
import AppDataSource from './database/data-source'

dotenv.config()

const port = process.env.PORT ?? 3001

AppDataSource.initialize()
  .then(() => {
    console.log('Example app connected to database')
  })
  .catch((error) => console.log(error))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
