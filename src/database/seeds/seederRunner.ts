import fs from 'fs'
import path from 'path'
import Seeder from '../../interfaces/seederInterface'
import AppDataSource from '../data-source'

const seedersDir = path.join(__dirname)

async function runSeeders (): Promise<void> {
  AppDataSource.initialize()
    .then(async () => {
      await proccessFiles(seedersDir)

      await AppDataSource.destroy()
    })
    .catch(err => {
      console.error(err)
    })
}

async function proccessFiles (seedersDir: any): Promise<void> {
  const files = fs.readdirSync(seedersDir)

  for (const file of files) {
    if (file.endsWith('.seed.ts')) {
      const seederModule = await import(path.join(seedersDir, file))
      const seeder: Seeder = seederModule.default
      await seeder.seed()
    }
  }
}

runSeeders().catch(error => console.error('Error running seeders:', error))
