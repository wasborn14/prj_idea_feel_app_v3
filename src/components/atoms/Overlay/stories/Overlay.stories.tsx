import type { Meta, StoryObj } from '@storybook/react'
import { Overlay } from '..'

const meta: Meta<typeof Overlay> = {
  title: 'Atoms/Overlay',
  component: Overlay,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof Overlay>

export const OverlayStory: Story = {}
