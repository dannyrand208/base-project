import { createFileRoute } from '@tanstack/react-router'
import { LanguagesList } from '../../features/languages'

export const Route = createFileRoute('/_app/languages')({
  component: () => <LanguagesList />,
})
