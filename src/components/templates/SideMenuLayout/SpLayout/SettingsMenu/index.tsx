import { ReactNode } from 'react'
import { Color, ZIndex } from '@/const'
import styled, { css } from 'styled-components'

type Props = {
  isMenuActive: boolean
  onOverLayClick: () => void
  children: ReactNode
}

export const SettingsMenu = ({ isMenuActive, onOverLayClick, children }: Props) => {
  return (
    <Container isMenuActive={isMenuActive}>
      <SideMenuOverlay isMenuActive={isMenuActive} onClick={onOverLayClick} />
      <SideMenuContent isMenuActive={isMenuActive}>
        <SideMenuColorOverWrite>{children}</SideMenuColorOverWrite>
      </SideMenuContent>
    </Container>
  )
}

const Container = styled.aside<{ isMenuActive: boolean }>`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: ${ZIndex.SideMenu};

  ${({ isMenuActive }) =>
    isMenuActive &&
    css`
      pointer-events: auto;
    `}
`

const SideMenuOverlay = styled.div<{ isMenuActive: boolean }>`
  position: absolute;
  display: block;
  height: 100%;
  width: 100%;
  background-color: black;
  opacity: 0;
  transition: opacity 300ms linear;

  ${({ isMenuActive }) =>
    isMenuActive &&
    css`
      opacity: 0.3;
    `}
`

const SideMenuContent = styled.div<{ isMenuActive: boolean }>`
  box-sizing: border-box;
  position: relative;
  top: 0;
  left: 15%;
  z-index: ${ZIndex.SideMenuContent};
  height: 100%;
  width: 85%;

  background-color: ${Color.WHITE};
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.1);
  transform: translateX(203%);
  transition: transform 300ms linear;

  ${({ isMenuActive }) =>
    isMenuActive &&
    css`
      transform: none;
    `}
`

const SideMenuColorOverWrite = styled.div`
  height: 100%;
  width: 100%;
  overflow: scroll;
  background-color: ${Color.BACKGROUND_COLOR1};
`
