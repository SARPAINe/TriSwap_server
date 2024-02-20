import bcrypt from 'bcrypt'

const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10)
}

const comparePassword = async (
  plaintextPassword: string,
  hashedPassword: string,
): Promise<boolean> => {
  return await bcrypt.compare(plaintextPassword, hashedPassword)
}

const cryptoServices = { hashPassword, comparePassword }
export { cryptoServices }
