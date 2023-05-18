import { ReactNode, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useCheckOAuthUser } from '@/hooks/util/useCheckOAuthUser'

export const CheckOAuthSessionWrapper = ({ children }: { children: ReactNode }) => {
  const { status } = useSession()
  const router = useRouter()
  const isOAuthUser = useCheckOAuthUser()

  useEffect(() => {
    // check session when OAuth Login
    if (isOAuthUser && status === 'unauthenticated') {
      router.push('/error')
    }
  }, [isOAuthUser, status, router])

  return <>{children}</>
}
