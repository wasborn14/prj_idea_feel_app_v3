import { ReactNode } from 'react'
import { Layout } from '../Layout'
import ResizeLayout from './ResizeLayout'
import styled from 'styled-components'
import { useIsSp } from '@/hooks/util/useIsSp'
import { SpSideMenuLayout } from './SpSideMenuLayout'

type Props = {
  children: ReactNode
}

export const SideMenuLayout = ({ children }: Props) => {
  const isSp = useIsSp()

  return (
    <Layout meta={{ pageTitle: 'Ifee - MyPage' }}>
      {isSp ? (
        <SpSideMenuLayout
          sideNavContents={
            <>
              <Container>sidenav</Container>
              <Container>sidenav</Container>
              <Container>sidenav</Container>
              <Container>sidenav</Container>
              <Container>sidenav</Container>
              <Container>sidenav</Container>
            </>
          }
        >
          {children}
        </SpSideMenuLayout>
      ) : (
        <ResizeLayout
          sideNavContents={
            <>
              <Container>sidenav</Container>
              <Container>sidenav</Container>
              <Container>sidenav</Container>
              <Container>sidenav</Container>
              <Container>sidenav</Container>
              <Container>sidenav</Container>
            </>
          }
        >
          {children}
        </ResizeLayout>
      )}
    </Layout>
  )
}

const Container = styled.div`
  padding: 100px;
`
