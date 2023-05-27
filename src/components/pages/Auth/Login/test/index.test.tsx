import { fireEvent, render, screen, within } from '@testing-library/react'
import { Login } from '..'
import { QueryClient, QueryClientProvider } from 'react-query'
import mockRouter from 'next-router-mock'
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider'
import userEvent from '@testing-library/user-event'

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

jest.mock('next-auth/react', () => {
  const originalModule = jest.requireActual('next-auth/react')
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: { username: 'admin' }
  }
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return { data: mockSession, status: 'authenticated' } // return type is [] in v3 but changed to {} in v4
    })
  }
})

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      //※refetchが走らないように
      staleTime: Infinity
    }
  }
})

describe('Login Page Test:', () => {
  beforeEach(() => {
    render(
      <QueryClientProvider client={client}>
        <Login />
      </QueryClientProvider>,
      { wrapper: MemoryRouterProvider }
    )

    // check render HTML
    // screen.debug()
  })
  describe('View:', () => {
    it('Title', () => {
      const heading = screen.getByRole('heading', { level: 1 })
      expect(within(heading).getByText('Login')).toBeInTheDocument()
    })

    it('Input Email', () => {
      expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
    })

    it('Input Password', () => {
      expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
    })

    it('Button Login', () => {
      expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument()
    })

    it('Button Sign in with Google', () => {
      const buttons = screen.getAllByRole('button')
      expect(within(buttons[1]).getByText('Sign in with Google')).toBeInTheDocument()
    })

    it('Create Account', () => {
      const links = screen.getAllByRole('link')
      expect(within(links[0]).getByText('Create Account')).toBeInTheDocument()
    })

    it('Forgot Password?', () => {
      const links = screen.getAllByRole('link')
      expect(within(links[1]).getByText('Forgot Password?')).toBeInTheDocument()
    })

    it('Return Top', () => {
      const links = screen.getAllByRole('link')
      expect(within(links[2]).getByText('Return Top')).toBeInTheDocument()
    })
    it('Guest Login', () => {
      expect(screen.getByText('Guest Login')).toBeInTheDocument()
    })
  })

  describe('Router:', () => {
    it('Create Account (Sign Up)', () => {
      const links = screen.getAllByRole('link')
      fireEvent.click(within(links[0]).getByText('Create Account'))
      expect(mockRouter.asPath).toEqual('/auth/signUp')
    })
    it('Forgot Password', () => {
      const links = screen.getAllByRole('link')
      fireEvent.click(within(links[1]).getByText('Forgot Password?'))
      expect(mockRouter.asPath).toEqual('/auth/forgotPassword')
    })
    it('Return Top', () => {
      const links = screen.getAllByRole('link')
      fireEvent.click(within(links[2]).getByText('Return Top'))
      expect(mockRouter.asPath).toEqual('/top')
    })
  })

  describe('Form:', () => {
    const user = userEvent.setup()
    it('Input Email', async () => {
      const textbox = screen.getByPlaceholderText('Email')
      const value = 'idea.app@gmail.com'
      await user.type(textbox, value)
      expect(screen.getByDisplayValue(value)).toBeInTheDocument()
    })

    it('Input Password', async () => {
      const textbox = screen.getByPlaceholderText('Password')
      const value = 'password'
      await user.type(textbox, value)
      expect(screen.getByDisplayValue(value)).toBeInTheDocument()
    })
  })
})
