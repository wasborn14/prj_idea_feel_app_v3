import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from '../Badge'
import { Color } from '@/const'

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    height: {
      control: { type: 'range' }
    },
    width: {
      control: { type: 'range' }
    }
  }
}

export default meta
type Story = StoryObj<typeof Badge>

export const GeneralBadge: Story = {
  args: {
    text: 'test',
    bgColor: `${Color.BLUE}`,
    width: 80,
    height: 24
  },
  render: ({ text, bgColor, width, height }) => <Badge text={text} bgColor={bgColor} width={width} height={height} />
}
