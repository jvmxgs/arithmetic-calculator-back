import { faker } from '@faker-js/faker'
import { UserStatus } from '../../enums/userStatus'
import { User as UserType } from '../../types/user'
import { User } from '../entities/user'

export function createUser ({ firstName, lastName, email, password, status, credits }: UserType = {}): User {
  const user = new User()
  user.first_name = firstName ?? faker.person.firstName()
  user.last_name = lastName ?? faker.person.lastName()
  user.email = email ?? faker.internet.email()
  user.password = password ?? '$2a$10$duFDFKEGmdxOcv2bLiQsquB4Uhacdv.XmsBQzRDa0bP0jf7PQD33W' // secret
  user.status = status ?? UserStatus.active
  user.credits = credits ?? faker.number.int(20)
  return user
}
