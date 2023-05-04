import type { Meta, StoryObj } from '@storybook/react'
import { ErrorMessage } from '..'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ErrorMessage> = {
  title: 'Atoms/Form/ErrorMessage',
  component: ErrorMessage,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof ErrorMessage>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const General: Story = {
  args: {
    errorMessage: 'Error'
  }
}
