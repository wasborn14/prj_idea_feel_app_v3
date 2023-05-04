import { useMutation } from 'react-query'
import { gestApi } from '@/hooks/api'

export const useSignUpMutation = () => {
  return useMutation((data: { name: string; email: string; password: string }) => {
    return gestApi.post('auth/register', { name: data.name, email: data.email, password: data.password })
  })
}
