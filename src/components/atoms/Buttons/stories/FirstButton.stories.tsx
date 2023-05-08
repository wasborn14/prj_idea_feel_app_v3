import type { Meta, StoryObj } from '@storybook/react'
import { ColorShortButton, LargeButton, NormalButton, SelectShortButton, ShortButton } from '../Button'

const meta: Meta<typeof NormalButton> = {
  title: 'Atoms/Button',
  component: NormalButton,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<
  typeof NormalButton | typeof ShortButton | typeof LargeButton | typeof ColorShortButton | typeof SelectShortButton
>

export const Normal: Story = {
  args: {
    label: 'NormalButton'
  },
  render: ({ label }) => <NormalButton>{label}</NormalButton>
}

export const Short: Story = {
  args: {
    label: 'ShortButton'
  },
  render: ({ label }) => <ShortButton>{label}</ShortButton>
}

export const ContainedAnchor: Story = {
  args: {
    label: 'LargeButton'
  },
  render: ({ label }) => <LargeButton>{label}</LargeButton>
}

export const ColorShort: Story = {
  args: {
    label: 'ColorShortButton'
  },
  render: ({ label }) => <ColorShortButton>{label}</ColorShortButton>
}

export const SelectShort: Story = {
  args: {
    label: 'SelectShortButton'
  },
  render: ({ label }) => <SelectShortButton>{label}</SelectShortButton>
}
