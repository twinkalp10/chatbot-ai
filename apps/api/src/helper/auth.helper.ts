import { User } from '@prisma/client'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const comparePassword = (password: string, hash: string): boolean => {
  return bcrypt.compareSync(password, hash)
}

export const hashPassword = (password: string): string => {
  return bcrypt.hashSync(password, 5)
}

export const createJWT = ({ id, name, email }: User): string => {
  const token = jwt.sign({ id, name, email }, process.env.JWT_TOKEN || 'change-log')
  return token
}
