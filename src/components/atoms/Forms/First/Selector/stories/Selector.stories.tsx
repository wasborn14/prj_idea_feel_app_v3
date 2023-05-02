import type { Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'
import { Option, Selector } from '..'
import { ComponentProps } from 'react'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Selector> = {
  title: 'Atoms/Form/Selector',
  component: Selector,
  tags: ['autodocs']
}

const options = [
  { value: '0', text: '選択してください' },
  { value: '1', text: 'ナイト' },
  { value: '2', text: '戦士' },
  { value: '3', text: '竜騎士' },
  { value: '4', text: '黒魔道士' },
  { value: '5', text: '召喚士' },
  { value: '6', text: '白魔道士' }
]

export default meta
type Story = StoryObj<typeof Selector>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

const SelectorWithHooks = (props: ComponentProps<typeof Selector>) => {
  const { watch, setValue } = useForm<{ category: string }>({
    defaultValues: {
      category: options[0].value
    }
  })

  const selectedValue = watch('category')

  const onClick = (option: Option) => {
    setValue('category', option.value)
  }

  return (
    <Selector
      {...props}
      options={options}
      selectedValue={selectedValue}
      onClick={onClick}
      width={200}
      height={36}
      placeholder='選択してください'
    />
  )
}

export const SelectorForm: Story = {
  render: (props: ComponentProps<typeof Selector>) => <SelectorWithHooks {...props} />
}
