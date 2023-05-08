import type { Meta, StoryObj } from '@storybook/react'
import { TextAnchor } from '../TextAnchor'

const meta: Meta<typeof TextAnchor> = {
  title: 'Atoms/Anchor',
  component: TextAnchor,
  tags: ['autodocs'],
  argTypes: {
    type: {
      options: ['normal', 'error']
    }
  }
}

export default meta
type Story = StoryObj<typeof TextAnchor>

export const Anchor: Story = {
  args: {
    label: 'Normal'
  },
  render: ({ label }) => <TextAnchor type='normal'>{label}</TextAnchor>
}

export const Primary: Story = {
  args: {
    label: 'Primary'
  },
  render: ({ label }) => <TextAnchor type='primary'>{label}</TextAnchor>
}

export const Error: Story = {
  args: {
    label: 'Error'
  },
  render: ({ label }) => <TextAnchor type='error'>{label}</TextAnchor>
}
