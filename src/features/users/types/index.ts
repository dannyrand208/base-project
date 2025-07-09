export interface User {
  id: number
  name: string
  email: string
  phone?: string
  website?: string
}

export interface CreateUserData {
  name: string
  email: string
  phone?: string
  website?: string
}

export interface UpdateUserData extends Partial<CreateUserData> {}
