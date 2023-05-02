import type { Meta, StoryObj } from '@storybook/react'
import { TextAnchor } from '../TextAnchor'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof TextAnchor> = {
  title: 'Atoms/Anchor',
  component: TextAnchor,
  tags: ['autodocs']
  // argTypes: {
  //   // backgroundColor: {
  //   //   control: 'color'
  //   // }
  //   type: {
  //     options: ['button', 'submit']
  //   },
  //   width: {
  //     control: 100
  //   }
  // }
}

export default meta
type Story = StoryObj<typeof TextAnchor>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

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
