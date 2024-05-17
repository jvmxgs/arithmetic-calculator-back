import bcrypt from 'bcrypt'
import Seeder from '../../interfaces/seederInterface'
import AppDataSource from '../data-source'
import { User } from '../entities/user'
import { createUser } from '../factories/user.factory'

const userSeeder: Seeder = {
  async seed () {
    const userRepository = await AppDataSource.getRepository(User)
    const usersToCreate = 100

    const users = Array.from({ length: usersToCreate }, () => createUser())

    users.unshift(createUser({
      firstName: 'Jhon',
      lastName: 'Doe',
      email: 'admin@example.com',
      password: bcrypt.hashSync('secret', 10),
      credits: 500
    }))

    await userRepository.save(users)
  }
}

export default userSeeder
