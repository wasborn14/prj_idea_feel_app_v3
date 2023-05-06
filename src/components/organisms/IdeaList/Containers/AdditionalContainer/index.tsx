import React, { useState } from 'react'
import { Color } from '@/const'

import styled from 'styled-components'
import { ContainerInput } from '../ContainerInput'

export const AdditionalContainer = () => {
  const [isContainerAdd, setIsContainerAdd] = useState(false)
  return (
    <Component>
      {isContainerAdd ? (
        <ContainerInput isNew onOutsideClick={() => setIsContainerAdd(false)} />
      ) : (
        <AdditionalButton onClick={() => setIsContainerAdd(true)}>Add List</AdditionalButton>
      )}
    </Component>
  )
}

const Component = styled.div`
  display: flex;
  flex-direction: column;
  grid-auto-rows: max-content;
  overflow: hidden;
  box-sizing: border-box;
  appearance: none;
  outline: none;
  min-width: 340px;
  margin: 10px;
  border-radius: 5px;
  transition: background-color 350ms ease;
  background-color: ${Color.BACKGROUND_COLOR2};
  border: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 1em;
  box-shadow: 0 1px 10px 0 rgba(34, 33, 81, 0.1);
`

const AdditionalButton = styled.button`
  height: 37px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
`
