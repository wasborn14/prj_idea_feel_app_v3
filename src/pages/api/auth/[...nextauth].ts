import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

type ClientType = {
  clientId: string
  clientSecret: string
}

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_ID,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET
    } as ClientType),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET
    } as ClientType)
  ],
  callbacks: {
    async jwt({ token, user, account }: any) {
      if (account) {
        token.accessToken = account.access_token
      }
      return { ...token, user }
    },
    // session call after jwt
    async session({ session, token, user }: any) {
      session.user.accessToken = token.accessToken
      session.user.id = user
      return session
    }
  }
}
export default NextAuth(authOptions)
