import { AxiosResponse } from 'axios'
import { useMutation, useQuery } from 'react-query'
import { api } from '..'
import { useDispatch } from 'react-redux'
import { actions as feelReasonSelectListActions } from '@/store/domain/feelReasonSelectList'
import { actions as feelListActions } from '@/store/domain/feelList'
import { getStartAndEndDate } from '@/utils/diffDate'
import { actions as feelReasonListActions } from '@/store/domain/feelReasonList'

// -------------------- feel list ----------------------

export const useGetFeelList = (baseDate: Date, isSelectWeek: boolean) => {
  const dates = getStartAndEndDate(baseDate, isSelectWeek)
  const dispatch = useDispatch()
  return useQuery(
    // refetch when baseDate or isSelectWeek change
    [baseDate, isSelectWeek],
    (): Promise<AxiosResponse> => {
      return api.get(`feels/${dates.startDate}/${dates.endDate}`)
    },
    {
      enabled: dates !== undefined,
      onSuccess: (res) => {
        dispatch(feelListActions.setFeelListData(res.data))
      },
      onError: (err: any) => console.error(err.message)
    }
  )
}

export const usePostFeel = () => {
  return useMutation(
    (data: {
      date: string
      start_date: string
      end_date: string
      value: number
      reason: number
      memo: string
      is_predict: boolean
    }): Promise<AxiosResponse> => {
      return api.post('feel', {
        date: data.date,
        start_date: data.start_date,
        end_date: data.end_date,
        value: data.value,
        reason: data.reason,
        memo: data.memo,
        is_predict: data.is_predict
      })
    }
  )
}

// ------------------- feel reason list ----------------------

export const useGetFeelReasonList = () => {
  const dispatch = useDispatch()
  return useQuery(
    `feelReasonList`,
    (): Promise<AxiosResponse> => {
      return api.get('feel/reasons')
    },
    {
      onSuccess: (res) => {
        dispatch(feelReasonListActions.setFeelReasonListData(res.data))
      },
      onError: (err: any) => console.error(err.message)
    }
  )
}

export const useGetFeelReasonSelectList = () => {
  const dispatch = useDispatch()
  return useQuery(
    `feelReasonSelectList`,
    (): Promise<AxiosResponse> => {
      return api.get('feel/reasons/select')
    },
    {
      onSuccess: (res) => {
        dispatch(feelReasonSelectListActions.setFeelReasonSelectListData(res.data))
      },
      onError: (err: any) => console.error(err.message)
    }
  )
}

export const usePostFeelReason = () => {
  return useMutation((data: { title: string }): Promise<AxiosResponse> => {
    return api.post('feel/reason', { title: data.title })
  })
}

export const usePutFeelReason = () => {
  return useMutation((data: { id: number; title: string }): Promise<AxiosResponse> => {
    return api.put(`feel/reason/${data.id}`, { title: data.title })
  })
}

export const useDeleteFeelReason = () => {
  return useMutation((data: { id: number }): Promise<AxiosResponse> => {
    return api.delete(`feel/reason/${data.id}`)
  })
}
