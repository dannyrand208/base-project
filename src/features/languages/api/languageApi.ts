import { api } from '../../../shared/lib/api'
import type {
  Language,
  CreateLanguageData,
  UpdateLanguageData,
  LanguagesResponse,
  LanguagesPaginationParams,
} from '../types'

export const languageApi = {
  getLanguages: async (
    params?: LanguagesPaginationParams,
  ): Promise<LanguagesResponse> => {
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.number) queryParams.append('number', params.number.toString())
    if (params?.limit) queryParams.append('limit', params.limit.toString())

    const { data } = await api.get(
      `/languages/detail?${queryParams.toString()}`,
    )
    return data
  },

  getLanguage: async (id: number): Promise<Language> => {
    const { data } = await api.get(`/languages/${id}`)
    return data
  },

  createLanguage: async (
    languageData: CreateLanguageData,
  ): Promise<Language> => {
    const { data } = await api.post('/languages/create', languageData)
    return data
  },

  updateLanguage: async (
    id: number,
    languageData: UpdateLanguageData,
  ): Promise<Language> => {
    const { data } = await api.put(`/languages/${id}`, languageData)
    return data
  },

  deleteLanguage: async (id: number): Promise<void> => {
    await api.delete(`/languages/delete/${id}`)
  },
}
