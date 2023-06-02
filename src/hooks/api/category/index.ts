import { TreeItems } from '@/components/organisms/CategoryList/types'
import { AxiosResponse } from 'axios'
import { useMutation, useQuery } from 'react-query'
import { api } from '..'

export const useGetCategory = () => {
  return useQuery('categories', (): Promise<AxiosResponse> => {
    return api.get('categories')
  })
}

export const usePutCategory = () => {
  return useMutation((data: { category_list: TreeItems }): Promise<AxiosResponse> => {
    return api.put('categories', { category_list: data.category_list })
  })
}
