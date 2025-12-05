import { TUser } from './auth.interface'
import { User } from './auth.model'

const createUserIntoDB = async (userData: TUser): Promise<TUser> => {
  const result = await User.create(userData)
  return result
}

export const AuthService = {
  createUserIntoDB,
}
