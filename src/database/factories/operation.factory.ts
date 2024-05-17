import { faker } from '@faker-js/faker'
import { Operation as OperationType } from '../../types/operation'
import { Operation } from '../entities/operation'

export function createOperation ({ type, cost }: OperationType = {}): Operation {
  const user = new Operation()
  user.type = type ?? faker.word.verb()
  user.cost = cost ?? faker.number.int(20)
  return user
}
