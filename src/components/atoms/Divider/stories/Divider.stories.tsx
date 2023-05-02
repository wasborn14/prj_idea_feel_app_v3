import type { Meta, StoryObj } from '@storybook/react'
import Divider from '..'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Divider> = {
  title: 'Atoms/Divider',
  component: Divider,
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
type Story = StoryObj<typeof Divider>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const Horizontal: Story = {
  args: {
    color: '#ccc',
    dashed: false,
    height: undefined,
    width: undefined
  },
  render: ({ color, dashed, height, width }) => (
    <div
      style={{
        width: '400px',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <>First</>
      <Divider direction='horizontal' color={color} dashed={dashed} height={height} width={width} />
      <>Second</>
    </div>
  )
}

export const Vertical: Story = {
  args: {
    color: '#ccc',
    dashed: false,
    height: undefined,
    width: undefined
  },
  render: ({ color, dashed, height, width }) => (
    <div
      style={{
        width: '400px',
        display: 'flex',
        flexDirection: 'row'
      }}
    >
      <>First</>
      <Divider direction='vertical' color={color} dashed={dashed} height={height} width={width} />
      <>Second</>
    </div>
  )
}
