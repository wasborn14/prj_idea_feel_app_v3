import { ReactNode } from 'react'
import styled from 'styled-components'
import { Head, HeadProps } from './Head'

interface Props {
  children: ReactNode
  meta: HeadProps
  //   headerType?:
}

export const Layout = ({ children, meta }: Props) => {
  return (
    <Container>
      <Head {...meta} />
      {/* <Header headerType={}/> */}
      <>{children}</>
      {/* <Footer /> */}
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
`
