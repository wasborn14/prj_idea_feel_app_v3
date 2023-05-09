import styled, { css } from 'styled-components'
import { SelectItem } from './SelectItem'
import { SideProfile } from './SideProfile'
import { useSelector } from 'react-redux'
import { sideWidthSelector } from '@/store/app/window'

export const SideMainMenu = () => {
  const width = useSelector(sideWidthSelector)

  return (
    <Container width={width}>
      <SideProfile />
      <SelectItem />
    </Container>
  )
}

const Container = styled.div<{ width: number }>`
  // TODO:　position:fixedではなく、スクロール禁止にする
  position: fixed;
  ${({ width }) =>
    width &&
    css`
      width: ${width}px;
    `}
`
