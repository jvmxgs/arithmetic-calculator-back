import { User } from '../entities/user'
import { faker } from '@faker-js/faker'
import { User as UserType } from '../../types/user'
import { UserStatus } from '../../enums/userStatus'

export function createUser ({ firstName, lastName, email, password, status }: UserType = {}): User {
  const user = new User()
  user.first_name = firstName ?? faker.person.firstName()
  user.last_name = lastName ?? faker.person.lastName()
  user.email = email ?? faker.internet.email()
  user.password = password ?? '$2a$10$duFDFKEGmdxOcv2bLiQsquB4Uhacdv.XmsBQzRDa0bP0jf7PQD33W' // secret
  user.status = status ?? UserStatus.active
  return user
}
