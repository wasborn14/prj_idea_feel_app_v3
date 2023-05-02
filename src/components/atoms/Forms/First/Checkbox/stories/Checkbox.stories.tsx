import type { Meta, StoryObj } from '@storybook/react'
import { CheckBox } from '..'
import { useForm } from 'react-hook-form'
import { GeneralButton } from '@/components/atoms/Buttons/First/Button'
import { VStack } from '@/components/atoms/Stack/VStack'
import { HStack } from '@/components/atoms/Stack/HStack'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof CheckBox> = {
  title: 'Atoms/Form/CheckBox',
  component: CheckBox,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof CheckBox>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

const CheckBoxWithHooks = () => {
  type FormProps = {
    check1: boolean
    check2: boolean
  }

  const { register, handleSubmit } = useForm<FormProps>({
    defaultValues: {
      check1: true,
      check2: false
    },
    mode: 'onChange'
  })

  return (
    <>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <VStack spacing={8}>
          <HStack spacing={16}>
            <VStack spacing={16}>
              <CheckBox {...register('check1')} text='check1' />
              <CheckBox {...register('check2')} text='check1' />
            </VStack>
          </HStack>
          <GeneralButton type='submit' width={180} height={36}>
            submit
          </GeneralButton>
        </VStack>
      </form>
    </>
  )
}

export const CheckboxForm: Story = {
  render: () => <CheckBoxWithHooks />
}
