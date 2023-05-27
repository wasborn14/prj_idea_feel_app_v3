import type { AppProps } from 'next/app'
import { GlobalStyles } from '@/global-styles'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { PreventDoubleClick } from '@/components/organisms/Wrapper/PreventDoubleClick'
import { SessionProvider } from 'next-auth/react'
import CheckOAuthSessionWrapper from './wrapper/checkOAuthSessionWrapper'

const Providers = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <PreventDoubleClick>
        <Provider store={store}>{children}</Provider>
      </PreventDoubleClick>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <Providers>
      <SessionProvider session={session}>
        <CheckOAuthSessionWrapper>
          <Component {...pageProps} />
        </CheckOAuthSessionWrapper>
      </SessionProvider>
    </Providers>
  )
}

export default MyApp
