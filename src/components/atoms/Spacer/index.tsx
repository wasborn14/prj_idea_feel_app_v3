import { MarginSize } from '@/const/margin'
import { CSSProperties } from 'styled-components'

type Props = {
  x?: MarginSize
  y?: MarginSize
  flexBasis?: CSSProperties['flexBasis']
}

export const Spacer = ({ x, y, flexBasis }: Props) => {
  return (
    <span
      style={{
        display: 'block',
        width: x ? `${x}px` : undefined,
        height: y ? `${y}px` : undefined,
        flexBasis,
        flexGrow: 0,
        flexShrink: 0
      }}
    />
  )
}
