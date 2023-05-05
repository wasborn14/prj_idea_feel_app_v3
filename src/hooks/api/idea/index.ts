import { AxiosResponse } from 'axios'
import { useMutation } from 'react-query'
import { api } from '..'

export const usePostIdeaList = () => {
  return useMutation((): Promise<AxiosResponse> => {
    return api.post('ideas')
  })
}
