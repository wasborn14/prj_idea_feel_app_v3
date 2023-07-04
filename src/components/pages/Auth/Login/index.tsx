import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { Layout } from '@/components/templates/Layout'
import { Color } from '@/const'
import styled from 'styled-components'
import { schema, Schema } from './schema'
import Cookie from 'universal-cookie'
import { yupResolver } from '@hookform/resolvers/yup'
import { fontStyles } from '@/const/font'
import { Spacer } from '@/components/atoms/Spacer'
import { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import { ERROR_AUTH_EMAIL_OR_PASSWORD_IS_WRONG } from '@/const/errorMessages'
import { API_ERROR_EMAIL_NOT_VERIFIED } from '@/const/apiErrorMessages'
import { sp } from '@/media'
import { Input } from '@/components/atoms/Forms/Input/Input'
import { LargeButton } from '@/components/atoms/Buttons/Button'
import { ErrorMessage } from '@/components/atoms/Forms/ErrorMessage'
import { useLogin } from '@/hooks/api/auth'
import { TextAnchor } from '@/components/atoms/Anchors/TextAnchor'
import { LoadingCenter } from '@/components/mlecules/Loading'
import { signIn, useSession } from 'next-auth/react'
import { GoogleSignInButton } from '@/components/atoms/Buttons/GoogleSignInButton'

// TODO:ローカルストレージに変えることも検討
const cookie = new Cookie()

export type FormProps = Schema & {}

const GUEST_EMAIL = 'ideafeel.app+1@gmail.com'
const GUEST_PASSWORD = 'LQVhRB7jGqLg2m'

export const Login = () => {
  const router = useRouter()
  const [loginError, setLoginError] = useState('')
  const defaultValues: FormProps = {
    email: '',
    password: ''
  }
  const { data: session, status } = useSession()

  const {
    getValues,
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema)
  })

  const setAccessStatus = (res: AxiosResponse) => {
    const options = { path: '/' }
    cookie.set('access_token', res.data.token.access_token, options)
    cookie.set('refresh_token', res.data.token.refresh_token, options)
  }

  const { mutate: loginMutate, isLoading } = useLogin()

  const handleClickLogin = () => {
    loginMutate(
      { email: getValues('email'), password: getValues('password') },
      {
        onSuccess: (res) => {
          setAccessStatus(res)
          router.push('/category/feel')
        },
        onError: (error: any) => {
          if (error.response.data.error === API_ERROR_EMAIL_NOT_VERIFIED) {
            router.push({
              pathname: '/auth/verifyEmail',
              query: {
                email: getValues('email')
              }
            })
          }
          setLoginError(ERROR_AUTH_EMAIL_OR_PASSWORD_IS_WRONG)
        }
      }
    )
  }

  const handleClickGuestLogin = () => {
    loginMutate(
      { email: GUEST_EMAIL, password: GUEST_PASSWORD },
      {
        onSuccess: (res) => {
          setAccessStatus(res)
          router.push('/category/feel')
        },
        onError: (error: any) => {
          if (error.response.data.error === API_ERROR_EMAIL_NOT_VERIFIED) {
            router.push({
              pathname: '/auth/verifyEmail',
              query: {
                email: getValues('email')
              }
            })
          }
          setLoginError(ERROR_AUTH_EMAIL_OR_PASSWORD_IS_WRONG)
        }
      }
    )
  }

  useEffect(() => {
    if (status && status === 'authenticated') {
      const email = session.user?.email
      const name = session.user?.name
      if (!(typeof email === 'string') || !(typeof name === 'string')) {
        return
      }
      loginMutate(
        { email: email, name: name, provider: 'google' },
        {
          onSuccess: (res) => {
            setAccessStatus(res)
            router.push('/category/feel')
          },
          onError: (error: any) => {
            setLoginError(error.response.data.error)
          }
        }
      )
    }
  }, [status, session, loginMutate, router])

  return (
    <Layout meta={{ pageTitle: 'Ifee - Login' }}>
      <Container>
        <LoadingCenter isLoading={isLoading} />
        <MainContents>
          <Title>Login</Title>
          <form onSubmit={handleSubmit(handleClickLogin)}>
            <FormWrapper>
              <InputWrapper>
                <ErrorMessage errorMessage={errors.email?.message ?? loginError} />
                <Input
                  {...register('email', {
                    onChange: () => {
                      setLoginError('')
                    }
                  })}
                  autoComplete='email'
                  placeholder='Email'
                  error={errors.email?.message !== undefined}
                />
              </InputWrapper>
              <InputWrapper>
                <ErrorMessage errorMessage={errors.password?.message} />
                <Input
                  {...register('password', {
                    onChange: () => setLoginError('')
                  })}
                  autoComplete='current-password'
                  placeholder='Password'
                  type='password'
                  error={errors.password?.message !== undefined}
                />
              </InputWrapper>
              <Spacer y={32} />
              <LargeButton type='submit'>Login</LargeButton>
            </FormWrapper>
          </form>
          <Spacer y={20} />
          <GoogleSignInButton onClick={() => signIn('google')} />
          <Spacer y={12} />
          <LinkContainer>
            <Link href='/auth/signUp' passHref>
              <TextAnchor type='normal' size={18}>
                Create Account
              </TextAnchor>
            </Link>
            <Spacer y={4} />
            <Link href='/auth/forgotPassword' passHref>
              <TextAnchor type='normal' size={18}>
                Forgot Password?
              </TextAnchor>
            </Link>
            <Spacer y={4} />
            <Link href='/top' passHref>
              <TextAnchor type='normal' size={18}>
                Return Top
              </TextAnchor>
            </Link>
            <Spacer y={4} />
            <GuestTextWrapper onClick={handleClickGuestLogin}>
              <TextAnchor type='red' size={18}>
                Guest Login
              </TextAnchor>
            </GuestTextWrapper>
          </LinkContainer>
        </MainContents>
      </Container>
    </Layout>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const MainContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${sp`
    width: 350px;
  `}
`

const Title = styled.h1`
  ${fontStyles['42px']}
  color: ${Color.DARK_BROWN2};
`

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const InputWrapper = styled.div`
  width: 320px;
  ${sp`
    width: 280px;
  `}
`

const LinkContainer = styled.div`
  margin-top: 16px;
  margin-left: 200px;
  ${sp`
    margin-left: 160px;
  `}
`

const GuestTextWrapper = styled.div`
  cursor: pointer;
`
