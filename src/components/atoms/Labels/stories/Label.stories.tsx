import type { Meta, StoryObj } from '@storybook/react'
import { Label } from '../Label'

const meta: Meta<typeof Label> = {
  title: 'Atoms/Label',
  component: Label,
  tags: ['autodocs'],
  argTypes: {
    text: {
      name: 'something'
    }
  }
}

export default meta
type Story = StoryObj<typeof Label>

export const GeneralLabel: Story = {
  args: {
    text: 'テスト'
  }
}
