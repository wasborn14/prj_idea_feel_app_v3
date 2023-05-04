// // パスワードリセットメール送信

// import { useMutation } from 'react-query'
// import { gestApi } from '@/hooks/api'
// import { AxiosResponse } from 'axios'

// export const useResetPassword = () => {
//   return useMutation((data: { email: string }): Promise<AxiosResponse> => {
//     return gestApi.post('auth/password/request', { email: data.email })
//   })
// }
