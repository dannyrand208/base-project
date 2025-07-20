import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { languageApi } from '../api/languageApi'
import type {
  Language,
  CreateLanguageData,
  UpdateLanguageData,
  LanguagesPaginationParams,
} from '../types'

// Custom hooks
export const useLanguages = (params?: LanguagesPaginationParams) => {
  return useQuery({
    queryKey: ['languages', params],
    queryFn: () => languageApi.getLanguages(params),
    staleTime: 1000 * 60 * 5,
  })
}

export const useLanguage = (id: number) => {
  return useQuery({
    queryKey: ['languages', id],
    queryFn: () => languageApi.getLanguage(id),
    enabled: !!id,
  })
}

export const useCreateLanguage = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: languageApi.createLanguage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['languages'] })
    },
  })
}

export const useUpdateLanguage = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      languageData,
    }: {
      id: number
      languageData: UpdateLanguageData
    }) => languageApi.updateLanguage(id, languageData),
    onSuccess: (data, variables) => {
      // Update the language in the cache
      queryClient.setQueryData(['languages', variables.id], data)
      // Invalidate languages list
      queryClient.invalidateQueries({ queryKey: ['languages'] })
    },
  })
}

export const useDeleteLanguage = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: languageApi.deleteLanguage,
    onSuccess: (_, deletedId) => {
      queryClient.removeQueries({ queryKey: ['languages', deletedId] })
      queryClient.invalidateQueries({ queryKey: ['languages'] })
    },
  })
}
