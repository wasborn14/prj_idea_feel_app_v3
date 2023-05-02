import type { Meta, StoryObj } from '@storybook/react'
import {
  ContainedButton,
  OutlinedButton,
  ContainedAnchorButton,
  OutlinedAnchorButton,
  GeneralButton,
  OperateButton,
  DestroyOutlinedButton
} from '../Button'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ContainedButton> = {
  title: 'Atoms/Button',
  component: ContainedButton,
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
type Story = StoryObj<
  | typeof ContainedButton
  | typeof OutlinedButton
  | typeof ContainedAnchorButton
  | typeof OutlinedAnchorButton
  | typeof GeneralButton
  | typeof OperateButton
  | typeof DestroyOutlinedButton
>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

export const Contained: Story = {
  args: {
    label: 'Button',
    width: 160,
    height: 36
  },
  render: ({ label, width, height }) => (
    <ContainedButton width={width} height={height}>
      {label}
    </ContainedButton>
  )
}

export const Ountline: Story = {
  args: {
    label: 'Button',
    width: 160,
    height: 36
  },
  render: ({ label, width, height }) => (
    <OutlinedButton width={width} height={height}>
      {label}
    </OutlinedButton>
  )
}

export const ContainedAnchor: Story = {
  args: {
    label: 'Button',
    width: 160,
    height: 36
  },
  render: ({ label, width, height }) => (
    <ContainedAnchorButton width={width} height={height}>
      {label}
    </ContainedAnchorButton>
  )
}

export const OutlinedAnchor: Story = {
  args: {
    label: 'Button',
    width: 160,
    height: 36
  },
  render: ({ label, width, height }) => (
    <OutlinedAnchorButton width={width} height={height}>
      {label}
    </OutlinedAnchorButton>
  )
}

export const General: Story = {
  args: {
    label: 'Button',
    width: 160,
    height: 36
  },
  render: ({ label, width, height }) => (
    <GeneralButton width={width} height={height}>
      {label}
    </GeneralButton>
  )
}

export const Operate: Story = {
  args: {
    label: 'Button',
    width: 160,
    height: 36
  },
  render: ({ label, width, height }) => (
    <OperateButton width={width} height={height}>
      {label}
    </OperateButton>
  )
}

export const DestroyOutlined: Story = {
  args: {
    label: 'Button',
    width: 160,
    height: 36
  },
  render: ({ label, width, height }) => (
    <DestroyOutlinedButton width={width} height={height}>
      {label}
    </DestroyOutlinedButton>
  )
}
