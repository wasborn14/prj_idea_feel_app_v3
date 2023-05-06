import { AxiosResponse } from 'axios'
import { useMutation, useQuery } from 'react-query'
import { api } from '..'
import { IdeaListModel } from '@/store/domain/ideaList/types'
import { convertToArray, convertToObject } from '@/utils/dnd/convert'
import { useDispatch } from 'react-redux'
import { actions as ideaListActions } from '@/store/domain/ideaList'
import { UniqueIdentifier } from '@dnd-kit/core'

export const usePostIdeaList = () => {
  return useMutation((): Promise<AxiosResponse> => {
    return api.post('ideas')
  })
}

export const useGetIdeaList = (categoryId: string) => {
  const dispatch = useDispatch()

  return useQuery(
    [categoryId],
    (): Promise<AxiosResponse> => {
      return api.get(`ideas/${categoryId}`)
    },
    {
      enabled: categoryId !== '',
      onSuccess: (res) => {
        const resData = convertToObject(res.data)
        dispatch(ideaListActions.setIdeaListData({ ideaList: resData }))
        dispatch(ideaListActions.setIdeaContainersData({ ideaContainers: Object.keys(resData) as UniqueIdentifier[] }))
      }
    }
  )
}

export const usePutIdeaList = () => {
  return useMutation((data: { categoryId: string; items: IdeaListModel }): Promise<AxiosResponse> => {
    const idea_list = convertToArray(data.items)
    return api.put(`ideas/${data.categoryId}`, { idea_list })
  })
}

export const useDeleteIdeaList = () => {
  return useMutation((data: { categoryId: string }): Promise<AxiosResponse> => {
    return api.put(`ideas/${data.categoryId}`)
  })
}
