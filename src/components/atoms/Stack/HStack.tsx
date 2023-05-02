import { ComponentProps } from 'react'

import { Stack } from '.'

export const HStack = (props: Omit<ComponentProps<typeof Stack>, 'flexDirection'>) => (
  <Stack {...{ ...props, flexDirection: 'row' }} />
)
