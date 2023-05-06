import type { Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'
import { NormalButton } from '@/components/atoms/Buttons/First/Button'
import { VStack } from '@/components/atoms/Stack/VStack'
import { HStack } from '@/components/atoms/Stack/HStack'
import { Radio } from '..'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Radio> = {
  title: 'Atoms/Form/Radio',
  component: Radio,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof Radio>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

const RadioWithHooks = () => {
  type FormProps = {
    gender: 'male' | 'female'
    job: 'Warrior' | 'Thief' | 'Wizard'
  }

  const { register, handleSubmit } = useForm<FormProps>({
    defaultValues: {
      gender: 'male',
      job: 'Warrior'
    },
    mode: 'onChange'
  })

  return (
    <>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <VStack spacing={8}>
          <HStack spacing={16}>
            <Radio {...register('gender')} value='male' text='male' />
            <Radio {...register('gender')} value='female' text='female' />
          </HStack>
          <HStack spacing={16}>
            <Radio {...register('job')} value='Warrior' text='Warrior' />
            <Radio {...register('job')} value='Thief' text='Tief' />
            <Radio {...register('job')} value='Wizard' text='Wizard' />
          </HStack>
          <NormalButton type='submit'>submit</NormalButton>
        </VStack>
      </form>
    </>
  )
}

export const RadioForm: Story = {
  render: () => <RadioWithHooks />
}
