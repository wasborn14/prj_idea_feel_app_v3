import type { Meta, StoryObj } from '@storybook/react'
import { Clip } from '..'

const meta: Meta<typeof Clip> = {
  title: 'Atoms/Clip',
  component: Clip,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof Clip>

export const General: Story = {
  args: {
    color: 'primary',
    outlined: false,
    shape: 'rounded',
    width: 200,
    label: 'clip'
  },
  render: ({ color, outlined, shape, width, label }) => (
    <Clip color={color} outlined={outlined} shape={shape} width={width}>
      {label}
    </Clip>
  )
}
