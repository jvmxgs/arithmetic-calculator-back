import { User } from '../entities/User'
import { faker } from '@faker-js/faker'

export function createUser (): User {
  const user = new User()
  user.first_name = faker.person.firstName()
  user.last_name = faker.person.lastName()
  user.email = faker.internet.email()
  return user
}
