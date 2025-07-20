export interface Language {
  id: number
  name: string
  code?: string
  description?: string
  status?: string
  createdAt?: string
  updatedAt?: string
}

export interface CreateLanguageData {
  name: string
  code?: string
  description?: string
  status?: string
}

export interface UpdateLanguageData extends Partial<CreateLanguageData> {}

export interface LanguagesResponse {
  results: Language[]
  total: number
  page: number
  limit: number
}

export interface LanguagesPaginationParams {
  page?: number
  number?: number
  limit?: number
}
