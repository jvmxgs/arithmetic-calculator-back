import { User } from '../database/entities/user'

export const userResource = (user: User): Object => {
  return {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    status: user.status,
    created_at: user.created_at,
    updated_at: user.updated_at
  }
}
