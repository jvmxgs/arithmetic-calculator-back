import AppDataSource from '../data-source'
import Seeder from '../../interfaces/seederInterface'
import { User } from '../entities/User'
import { createUser } from '../factories/user.factory'

const userSeeder: Seeder = {
  async seed () {
    const userRepository = await AppDataSource.getRepository(User)
    const usersToCreate = 100

    const users = Array.from({ length: usersToCreate }, () => createUser())
    await userRepository.save(users)
  }
}

export default userSeeder
