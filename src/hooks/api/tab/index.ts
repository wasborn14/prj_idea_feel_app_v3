import { AxiosResponse } from 'axios'
import { useMutation, useQuery } from 'react-query'
import { api } from '..'
import { useDispatch } from 'react-redux'
import { actions } from '@/store/domain/tabList'
import { TabList } from '@/store/domain/tabList/types'

export const useGetTabList = () => {
  const dispatch = useDispatch()

  return useQuery(
    'tabs',
    (): Promise<AxiosResponse> => {
      return api.get('tabs')
    },
    {
      onSuccess: (res) => {
        dispatch(actions.setTabListData({ tabList: res.data }))
      }
    }
  )
}

export const usePutTabList = () => {
  const dispatch = useDispatch()

  return useMutation(
    (data: { tab_list: TabList }): Promise<AxiosResponse> => {
      return api.put('tabs', { tab_list: data.tab_list })
    },
    {
      onSuccess: (res) => {
        dispatch(actions.setTabListData({ tabList: res.data }))
      }
    }
  )
}
