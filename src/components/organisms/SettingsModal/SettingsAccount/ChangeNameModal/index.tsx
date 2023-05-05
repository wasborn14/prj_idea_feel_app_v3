import { yupResolver } from '@hookform/resolvers/yup'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import Divider from '@/components/atoms/Divider'
import { VStack } from '@/components/atoms/Stack/VStack'
import { Color } from '@/const'
import { fontStyles } from '@/const/font'
import { actions as profileActions } from '@/store/domain/profile'
import styled from 'styled-components'
import { schema, Schema } from './schema'
import { useIsSp } from '@/hooks/util/useIsSp'
import { SuccessModal } from '@/components/mlecules/BaseModal/SuccessModal'
import { BaseModal } from '@/components/mlecules/BaseModal'
import { ErrorMessage } from '@/components/atoms/Forms/First/ErrorMessage'
import { Input } from '@/components/atoms/Forms/First/Input/Input'
import { GeneralButton } from '@/components/atoms/Buttons/First/Button'
import { useUpdateName } from '@/hooks/api/auth'
import { LoadingCenter } from '@/components/mlecules/Loading'

type Props = {
  onClick: () => void
}

export type FormProps = Schema & {}

export const ChangeNameModal = ({ onClick }: Props) => {
  const isSp = useIsSp()
  const dispatch = useDispatch()
  const [changeNameError, setChangeNameError] = useState('')
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false)

  const isInnerClick = useRef(false)
  const defaultValues: FormProps = {
    name: ''
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

  const { mutate: updateNameMutate, isLoading } = useUpdateName()

  const handleClickChangeName = () => {
    updateNameMutate(
      { name: getValues('name') },
      { onSuccess: () => setIsSuccessModalVisible(true), onError: () => setChangeNameError('変更に失敗しました。') }
    )
  }

  // モーダル開閉処理関連
  const onInnerClick = () => {
    isInnerClick.current = true
  }
  const onClose = () => {
    // Modalの中をクリックした際は閉じないようにする
    if (!isInnerClick.current) {
      onClick()
    }
    isInnerClick.current = false
  }

  const handleClickCloseSuccessModal = () => {
    setIsSuccessModalVisible(false)
    dispatch(profileActions.setUserNameData({ name: getValues('name') }))
    onClick()
  }

  return (
    <BaseModal width={isSp ? 350 : 400} color='white' isRadius onClick={onClose} wrapperId='change-name-modal'>
      {isSuccessModalVisible && <SuccessModal onClick={handleClickCloseSuccessModal} description='Your Name Changed' />}
      <LoadingCenter isLoading={isLoading} />
      <form onSubmit={handleSubmit(handleClickChangeName)}>
        <Container onClick={onInnerClick}>
          <TitleContainer>
            <Title>Change Name</Title>
          </TitleContainer>
          <Divider color={`${Color.DARK_RED2}`} />
          <MenuContainer>
            <VStack>
              <Description>Enter New Name</Description>
              <ErrorMessage errorMessage={errors.name?.message ?? changeNameError} />
              <InputWrapper>
                <Input
                  {...register('name', {
                    onChange: () => setChangeNameError('')
                  })}
                  autoComplete='name'
                  placeholder='New Name'
                  type='name'
                  error={errors.name?.message !== undefined}
                />{' '}
              </InputWrapper>
              <ButtonWrapper>
                <GeneralButton width={280} height={40} type='submit'>
                  Change Name
                </GeneralButton>
              </ButtonWrapper>
            </VStack>
          </MenuContainer>
        </Container>
      </form>
    </BaseModal>
  )
}

const Container = styled.div`
  padding: 16px 16px 32px;
`

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const MenuContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 16px;
`

const Title = styled.p`
  ${fontStyles['24px']}
`

const Description = styled.p`
  color: ${Color.LIGHT_GRAY2};
  ${fontStyles['16px']}
`

const InputWrapper = styled.div`
  width: 300px;
`

const ButtonWrapper = styled.div`
  margin-top: 32px;
  display: flex;
  justify-content: center;
`
