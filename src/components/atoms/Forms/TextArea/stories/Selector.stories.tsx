import type { Meta, StoryObj } from '@storybook/react'
import { TextArea } from '..'

const meta: Meta<typeof TextArea> = {
  title: 'Atoms/Form/TextArea',
  component: TextArea,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof TextArea>

export const TextAreaForm: Story = {}
