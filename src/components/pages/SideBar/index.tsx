import { SideMenuLayout } from '@/components/templates/SideMenuLayout'
import React from 'react'
import styled from 'styled-components'

export const Sidebar = () => {
  return (
    <SideMenuLayout>
      {/* <>side</> */}
      <Container>
        <>test</>
      </Container>
      <Container>
        <>test</>
      </Container>
      <Container>
        <>test</>
      </Container>
      <Container>
        <>test</>
      </Container>
      <Container>
        <>test</>
      </Container>
    </SideMenuLayout>
  )
}

const Container = styled.div`
  padding: 100px;
`
