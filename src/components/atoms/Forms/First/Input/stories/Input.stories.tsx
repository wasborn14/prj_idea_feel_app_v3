import type { Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'
import { NormalButton } from '@/components/atoms/Buttons/First/Button'
import { VStack } from '@/components/atoms/Stack/VStack'
import { HStack } from '@/components/atoms/Stack/HStack'
import { Input } from '../Input'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Input> = {
  title: 'Atoms/Form/Input',
  component: Input,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof Input>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

const InputWithHooks = () => {
  type FormProps = {
    name: string
    email: string
  }

  const { register, handleSubmit } = useForm<FormProps>({
    defaultValues: {
      name: 'test',
      email: 'test@test.com'
    },
    mode: 'onChange'
  })

  return (
    <>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <VStack spacing={8}>
          <HStack spacing={16}>
            <span>名前</span>
            <Input type='text' {...register('name')} width={180} />
          </HStack>
          <HStack spacing={16}>
            <span>Email</span>
            <Input type='text' {...register('email')} width={180} />
          </HStack>
          <NormalButton type='submit' width={180} height={36}>
            submit
          </NormalButton>
        </VStack>
      </form>
    </>
  )
}

export const InputForm: Story = {
  render: () => <InputWithHooks />
}
