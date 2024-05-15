import AppDataSource from '../data-source'
import Seeder from '../../interfaces/seederInterface'
import { User } from '../entities/user'
import { createUser } from '../factories/user.factory'
import bcrypt from 'bcrypt'

const userSeeder: Seeder = {
  async seed () {
    const userRepository = await AppDataSource.getRepository(User)
    const usersToCreate = 100

    const users = Array.from({ length: usersToCreate }, () => createUser())

    users.unshift(createUser({
      firstName: 'Jhon',
      lastName: 'Doe',
      email: 'admin',
      password: bcrypt.hashSync('secret', 10)
    }))

    await userRepository.save(users)
  }
}

export default userSeeder
