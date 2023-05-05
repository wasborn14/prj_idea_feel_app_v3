import { useMutation, useQuery } from 'react-query'
import { api, gestApi } from '@/hooks/api'
import { AxiosResponse } from 'axios'
import { useDispatch } from 'react-redux'
import { actions as profileActions } from '@/store/domain/profile'

// signup
export const useSignUpMutation = () => {
  return useMutation((data: { name: string; email: string; password: string }) => {
    return gestApi.post('auth/register', { name: data.name, email: data.email, password: data.password })
  })
}

// login
export const useLogin = () => {
  return useMutation((data: { email: string; password: string }): Promise<AxiosResponse> => {
    return gestApi.post('auth/login', { email: data.email, password: data.password })
  })
}

// get user status
export const useGetUserStatus = () => {
  const dispatch = useDispatch()
  return useQuery(
    'userStatus',
    (): Promise<AxiosResponse> => {
      return api.get('auth/me')
    },
    { onSuccess: (res) => dispatch(profileActions.setProfileData({ name: res.data.name, email: res.data.email })) }
  )
}

// resend activation email
export const useResendActivation = () => {
  return useMutation((data: { email: string }): Promise<AxiosResponse> => {
    return gestApi.post('auth/email/resend', { email: data.email })
  })
}

// send password reset mail
export const useResetPasswordRequest = () => {
  return useMutation((data: { email: string }): Promise<AxiosResponse> => {
    return gestApi.post('auth/password/request', { email: data.email })
  })
}

// password reset
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