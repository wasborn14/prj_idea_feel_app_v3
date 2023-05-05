import { Color } from '@/const'
import { cn } from '@/utils/cn'
import styled, { css } from 'styled-components'

const ResizeSplitter = ({ id = 'drag-bar', dir, isDragging, ...props }: any) => {
  return (
    <Container
      id={id}
      data-testid={id}
      className={cn(
        'sample-drag-bar',
        dir === 'horizontal' && 'sample-drag-bar--horizontal',
        isDragging && 'sample-drag-bar--dragging'
      )}
      isDragging={isDragging}
      {...props}
    />
  )
}

export default ResizeSplitter

const Container = styled.div<{ isDragging: boolean; dir: boolean }>`
  width: 10px;
  min-height: 100vh;
  padding-left: 8px;
  background-clip: content-box;
  background-color: ${Color.DARK_BROWN1};
  cursor: col-resize;
  transition: padding 0.15s 0.15s ease-in-out;

  &:hover {
    background-color: ${Color.DARK_RED1};
    transition: background-color 0.15s 0.15s ease-in-out;
  }
  ${({ isDragging }) =>
    isDragging &&
    css`
      padding-left: 4px;
      background-color: ${Color.DARK_RED1};
      transition: padding 0.15s 0.15s ease-in-out;
      transition: background-color 0.15s 0.15s ease-in-out;
    `}
`
