import React from 'react'
import { Sortable } from './Sortable'
import styled from 'styled-components'

export const TabList = () => {
  return (
    <Container>
      <Sortable />
    </Container>
  )
}

const Container = styled.div`
  margin-left: 10px;
`
