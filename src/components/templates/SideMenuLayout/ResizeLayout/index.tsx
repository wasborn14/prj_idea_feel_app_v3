import { useResizable } from 'react-resizable-layout'
import styled, { css } from 'styled-components'
import ResizeSplitter from '@/components/atoms/ResizeSplitter'
import { ReactNode, useEffect } from 'react'
import { useWindowSize } from '@/hooks/util/useWindowSize'
import { useDispatch } from 'react-redux'
import { actions } from '@/store/app/window'
import { Header } from './Header'
import { Spacer } from '@/components/atoms/Spacer'

interface Props {
  sideNavContents: ReactNode
  children: ReactNode
}

const ResizeLayout = ({ sideNavContents, children }: Props): JSX.Element => {
  const {
    isDragging: isFileDragging,
    position: sideWidth,
    separatorProps: fileDragBarProps
  } = useResizable({
    axis: 'x',
    initial: 250,
    min: 200,
    max: 480
  })

  const dispatch = useDispatch()
  const [width] = useWindowSize()

  useEffect(() => {
    dispatch(actions.setWidth({ sideWidth: sideWidth, mainContentsWidth: width - sideWidth }))
  }, [dispatch, width, sideWidth])

  return (
    <Container>
      <SideNavWrapper width={sideWidth}>{sideNavContents}</SideNavWrapper>
      <ResizeSplitter isDragging={isFileDragging} {...fileDragBarProps} />
      <MainContents>
        <Header onClick={() => {}} />
        <Spacer y={24} />
        {children}
      </MainContents>
    </Container>
  )
}

export default ResizeLayout

const Container = styled.div`
  display: flex;
  flex-direction: row;
`
type SideNavWrapperProps = {
  width: number
}

const SideNavWrapper = styled.div<SideNavWrapperProps>`
  ${({ width }) => css`
    width: ${width}px;
  `}
`

const MainContents = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
`
