import { useMutation, useQuery } from 'react-query'
import { api, gestApi } from '@/hooks/api'
import { AxiosResponse } from 'axios'
import { useDispatch } from 'react-redux'
import { actions as profileActions } from '@/store/domain/profile'

// Guest User

export const useSignUpMutation = () => {
  return useMutation((data: { name: string; email: string; password: string }) => {
    return gestApi.post('auth/register', { name: data.name, email: data.email, password: data.password })
  })
}

export const useLogin = () => {
  // Set Email Login: email, password
  // Set OAuth Login: email, name, provider
  return useMutation(
    (data: { email: string; password?: string; name?: string; provider?: string }): Promise<AxiosResponse> => {
      return gestApi.post('auth/login', {
        email: data.email,
        password: data.password,
        name: data.name,
        provider: data.provider
      })
    }
  )
}

export const useResendActivation = () => {
  return useMutation((data: { email: string }): Promise<AxiosResponse> => {
    return gestApi.post('auth/email/resend', { email: data.email })
  })
}

export const useResetPasswordRequest = () => {
  return useMutation((data: { email: string }): Promise<AxiosResponse> => {
    return gestApi.post('auth/password/request', { email: data.email })
  })
}

export const useResetPassword = () => {
  return useMutation(
    (data: {
      email: string
      token: string
      password: string
      password_confirmation: string
    }): Promise<AxiosResponse> => {
      return gestApi.post('auth/password/reset', {
        email: data.email,
        token: data.token,
        password: data.password,
        password_confirmation: data.password_confirmation
      })
    }
  )
}

// Login User

export const useGetUserStatus = () => {
  const dispatch = useDispatch()
  return useQuery(
    'userStatus',
    (): Promise<AxiosResponse> => {
      return api.get('auth/me')
    },
    {
      onSuccess: (res) =>
        dispatch(
          profileActions.setProfileData({ name: res.data.name, email: res.data.email, provider: res.data.provider })
        )
    }
  )
}

export const useUpdateName = () => {
  return useMutation((data: { name: string }): Promise<AxiosResponse> => {
    return api.post('user/name', { name: data.name })
  })
}

export const useSendChangeEmailUrl = () => {
  return useMutation((data: { new_email: string }): Promise<AxiosResponse> => {
    return api.post('auth/email', { new_email: data.new_email })
  })
}

export const useUpdatePassword = () => {
  return useMutation(
    (data: { current_password: string; new_password: string; re_new_password: string }): Promise<AxiosResponse> => {
      return api.post('user/password', {
        current_password: data.current_password,
        new_password: data.new_password,
        re_new_password: data.re_new_password
      })
    }
  )
}
