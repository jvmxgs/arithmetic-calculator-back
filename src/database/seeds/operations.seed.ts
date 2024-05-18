import Seeder from '../../interfaces/seederInterface'
import AppDataSource from '../data-source'
import { Operation } from '../entities/operation'
import { createOperation } from '../factories/operation.factory'

const userSeeder: Seeder = {
  async seed () {
    const operationRepository = await AppDataSource.getRepository(Operation)

    const users = []

    users.push(createOperation({
      type: 'addition',
      cost: 3
    }))

    users.push(createOperation({
      type: 'subtraction',
      cost: 2
    }))

    users.push(createOperation({
      type: 'multiplication',
      cost: 4
    }))

    users.push(createOperation({
      type: 'division',
      cost: 3
    }))

    users.push(createOperation({
      type: 'sqrt',
      cost: 4
    }))

    users.push(createOperation({
      type: 'random_string',
      cost: 7
    }))

    await operationRepository.save(users)
  }
}

export default userSeeder
