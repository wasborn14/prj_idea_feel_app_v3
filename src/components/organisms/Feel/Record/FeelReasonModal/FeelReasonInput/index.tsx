import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { DeleteIcon } from '@/components/atoms/Icons/Shared/DeleteIcon'
import { HStack } from '@/components/atoms/Stack/HStack'
import { fontStyles } from '@/const/font'
import styled from 'styled-components'
import { schema, Schema } from '../schema'
import { Input } from '@/components/atoms/Forms/First/Input/Input'
import { useDeleteFeelReason, useGetFeelReasonList, usePutFeelReason } from '@/hooks/api/feel'
import { LoadingCenter } from '@/components/mlecules/Loading'

type Props = {
  id: number
  title: string
}

export type FormProps = Schema & {}

export const FeelReasonInput = ({ id, title }: Props) => {
  const [changeEmailError, setChangeEmailError] = useState('')
  const defaultValues: FormProps = {
    title: title
  }

  const {
    getValues,
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema)
  })
  const hasFormError = Object.keys(errors).length !== 0
  const { refetch } = useGetFeelReasonList()
  const { mutate: putFeelReasonMutate, isLoading: loadingPutFeelReason } = usePutFeelReason()
  const { mutate: deleteFeelReasonMutate, isLoading: loadingDeleteFeelReason } = useDeleteFeelReason()

  const handleClickPutFeelReason = () => {
    putFeelReasonMutate(
      { id, title: getValues('title') },
      {
        onSuccess: () => refetch(),
        onError: (err: any) => console.error({ err })
      }
    )
  }

  const handleClickDeleteFeelReason = () => {
    deleteFeelReasonMutate(
      { id },
      {
        onSuccess: () => refetch(),
        onError: (err: any) => console.error({ err })
      }
    )
  }

  return (
    <form onSubmit={handleSubmit(handleClickPutFeelReason)}>
      <LoadingCenter isLoading={loadingPutFeelReason || loadingDeleteFeelReason} />
      <HStack>
        {changeEmailError !== '' && <ErrorMessage>{changeEmailError}</ErrorMessage>}
        <InputWrapper>
          {hasFormError && <ErrorMessage>{errors.title?.message}</ErrorMessage>}
          <Input
            {...register('title', {
              onChange: () => setChangeEmailError(''),
              onBlur: handleClickPutFeelReason
            })}
            placeholder='New Reason'
            type='text'
            error={errors.title?.message !== undefined}
          />
        </InputWrapper>
        <IconWrapper onClick={handleClickDeleteFeelReason}>
          <DeleteIcon size={12} />
        </IconWrapper>
      </HStack>
    </form>
  )
}

const InputWrapper = styled.div`
  width: 250px;
  margin: 10px;
`

const ErrorMessage = styled.p`
  ${fontStyles['14px']}
  color: red;
`

const IconWrapper = styled.div``
