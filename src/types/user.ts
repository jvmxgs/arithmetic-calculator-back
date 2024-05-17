import { UserStatus } from '../enums/userStatus'

export interface User {
  firstName?: string
  lastName?: string
  email?: string
  password?: string
  status?: UserStatus
  credits?: number
}
