import { useMutation } from 'react-query'
import { gestApi } from '@/hooks/api'

// export const useSignUp = (name: string, email: string, password: string) => {
//   const requestSignUp = async (): Promise<AxiosResponse> => {
//     return await gestApi.post('auth/register', { name, email, password })
//   }
//   return useMutation(requestSignUp)
// }

export const useSignUpMutation = () => {
  return useMutation((data: { name: string; email: string; password: string }) => {
    return gestApi.post('auth/register', { name: data.name, email: data.email, password: data.password })
  })
}

// サインイン
// export const requestSignUp = async (name: string, email: string, password: string): Promise<AxiosResponse> => {
//   return await gestApi.post('auth/register', { name, email, password })
// }

// export const useGetTestQuery = () => {
//     const fetchUsers = async () => {
//       const res = await fetch('https://jsonplaceholder.typicode.com/users')
//       return res.json()
//     }

//     // ここで同時にreducerへ登録

//     return useQuery('users', fetchUsers, { retry: 5 })
//   }
