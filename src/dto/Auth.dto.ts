// register user
export interface RegisterUserDTO extends UserRegisterUserDTO {
  password: string
}

export interface UserRegisterUserDTO {
  email: string
  firstName?: string
  lastName?: string
  image?: string
  phone?: string
}

export interface AuthRegisterUserDTO {
  userId: string
  password: string
  verificationToken: string
}

// login user
export interface LoginUserDTO {
  email: string
  password: string
}

// change password
export interface ChangePasswordDTO {
  userId: string
  password: string
  newPassword: string
}
