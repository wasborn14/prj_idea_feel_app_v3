import { TreeItems } from '@/components/organisms/CategoryList/types'
import { AxiosResponse } from 'axios'
import { useMutation, useQuery } from 'react-query'
import { api } from '..'

// fetch category
export const useGetCategory = () => {
  return useQuery('categories', (): Promise<AxiosResponse> => {
    return api.get('categories')
  })
}

// post category
export const usePostCategory = () => {
  return useMutation((data: { category_list: TreeItems }): Promise<AxiosResponse> => {
    return api.post('categories', { category_list: data.category_list })
  })
}

// put category
export const usePutCategory = () => {
  return useMutation((data: { category_list: TreeItems }): Promise<AxiosResponse> => {
    return api.put('categories', { category_list: data.category_list })
  })
}

// export const postCategoryList = async (category_list: TreeItems): Promise<AxiosResponse> => {
//   return await api.post('categories', { category_list })
// }

// export const fetchCategoryList = async (): Promise<AxiosResponse> => {
//   return await api.get('categories')
// }

// export const putCategoryList = async (category_list: TreeItems): Promise<AxiosResponse> => {
//   return await api.put('categories', { category_list })
// }
