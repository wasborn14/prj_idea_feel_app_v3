import { MarginSize } from '@/const/margin'
import { Children, cloneElement, ReactElement, ReactNode } from 'react'
import styled, { CSSObject } from 'styled-components'

type ContainerProps = {
  flexDirection: 'row' | 'column'
  spacing?: MarginSize
} & Pick<CSSObject, 'justifyContent' | 'alignItems' | 'flexWrap'>

const Container = styled.div<ContainerProps>(({ spacing, flexDirection, justifyContent, alignItems, flexWrap }) => {
  let alignItemsStyle: CSSObject['alignItems'] = flexDirection === 'row' ? 'center' : 'stretch'

  if (alignItems) {
    alignItemsStyle = alignItems
  }

  return {
    display: 'flex',
    flexDirection,
    alignItems: alignItemsStyle,
    justifyContent,
    flexWrap,
    '&& > * + * ': {
      marginLeft: flexDirection === 'row' ? `${spacing}px` : undefined,
      marginTop: flexDirection === 'column' ? `${spacing}px` : undefined
    }
  }
})

interface StackProps {
  children?: ReactNode
  divider?: ReactElement
  className?: string
  as?: any
}

export const Stack = ({ children, divider, className, ...rest }: StackProps & ContainerProps) => {
  let array = Children.toArray(children)

  if (divider) {
    array = array
      .map((child, index) => {
        return [child, cloneElement(divider, { key: `divider-${index}` })]
      })
      .flat(1)
      .slice(0, -1)
  }

  return (
    <Container className={className} {...rest}>
      {array}
    </Container>
  )
}
