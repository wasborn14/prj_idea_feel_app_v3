import { ComponentProps } from 'react'

import { Stack } from '.'

export const VStack = (props: Omit<ComponentProps<typeof Stack>, 'flexDirection'>) => (
  <Stack {...{ ...props, flexDirection: 'column' }} />
)
