import { yupResolver } from '@hookform/resolvers/yup'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import Divider from '@/components/atoms/Divider'
import { Spacer } from '@/components/atoms/Spacer'
import { VStack } from '@/components/atoms/Stack/VStack'
import { Color } from '@/const'
import { fontStyles } from '@/const/font'
import { feelReasonListDataSelector } from '@/store/domain/feelReasonList'
import styled from 'styled-components'
import { FeelReasonInput } from './FeelReasonInput'
import { schema, Schema } from './schema'
import { BaseModal } from '@/components/mlecules/BaseModal'
import { SuccessModal } from '@/components/mlecules/BaseModal/SuccessModal'
import { Input } from '@/components/atoms/Forms/First/Input/Input'
import { GeneralButton } from '@/components/atoms/Buttons/First/Button'
import { useGetFeelReasonList, usePostFeelReason } from '@/hooks/api/feel'
import { LoadingCenter } from '@/components/mlecules/Loading'

type Props = {
  onClick: () => void
}

export type FormProps = Schema & {}

export const FeelReasonModal = ({ onClick }: Props) => {
  const feelReasonList = useSelector(feelReasonListDataSelector)
  const [changeEmailError, setChangeEmailError] = useState('')
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false)
  const isInnerClick = useRef(false)
  const defaultValues: FormProps = {
    title: ''
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
  const { mutate: postFeelReason, isLoading } = usePostFeelReason()

  const handleClickPostFeelReason = () => {
    // const getFeelReasonList = () => {
    //   fetchFeelReasonList()
    //     .then((res) => {
    //       dispatch(feelReasonListActions.setFeelReasonListData(res.data))
    //     })
    //     .catch((err) => {
    //       console.error(err.message)
    //     })
    // }

    postFeelReason(
      { title: getValues('title') },
      {
        onSuccess: () => refetch(),
        onError: () => setChangeEmailError('保存できませんでした。')
      }
    )
    // postFeelReason(getValues('title'))
    //   .then(() => {
    //     getFeelReasonList()
    //     dispatch(dataActions.setIsLoading({ isLoading: false }))
    //   })
    //   .catch(() => {
    //     dispatch(dataActions.setIsLoading({ isLoading: false }))
    //     setChangeEmailError('保存できませんでした。')
    //   })
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
    onClick()
  }

  // useEffect(() => {
  //   const getFeelReasonList = () => {
  //     fetchFeelReasonList()
  //       .then((res) => {
  //         dispatch(feelReasonListActions.setFeelReasonListData(res.data))
  //       })
  //       .catch((err) => {
  //         console.error(err.message)
  //       })
  //   }

  //   getFeelReasonList()
  // }, [dispatch])

  return (
    <BaseModal width={1000} color='white' isRadius onClick={onClose}>
      {isSuccessModalVisible && (
        <SuccessModal onClick={handleClickCloseSuccessModal} description='Your Email Changed' />
      )}
      <LoadingCenter isLoading={isLoading} />
      <Container onClick={onInnerClick}>
        <TitleContainer>
          <Title>Setting Feel Reason</Title>
        </TitleContainer>
        <Divider color={`${Color.DARK_RED2}`} />
        <Spacer y={8} />
        <MenuContainer>
          <VStack>
            <form onSubmit={handleSubmit(handleClickPostFeelReason)}>
              <FeelReasonNewInputContainer>
                {changeEmailError !== '' && <ErrorMessage>{changeEmailError}</ErrorMessage>}
                <InputWrapper>
                  {hasFormError && <ErrorMessage>{errors.title?.message}</ErrorMessage>}
                  <Input
                    {...register('title', {
                      onChange: () => setChangeEmailError('')
                    })}
                    placeholder='New Reason'
                    type='text'
                    error={errors.title?.message !== undefined}
                  />
                </InputWrapper>
                <Spacer x={24} />
                <GeneralButton width={200} type='submit'>
                  Create
                </GeneralButton>
              </FeelReasonNewInputContainer>
            </form>
            <Spacer y={24} />
            <FeelReasonListContainer>
              {feelReasonList && feelReasonList.length > 0 && (
                <>
                  {feelReasonList.map((data) => (
                    <FeelReasonInput key={`feel_reason_${data.id}`} id={data.id} title={data.title} />
                  ))}
                </>
              )}
            </FeelReasonListContainer>
          </VStack>
        </MenuContainer>
      </Container>
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

const InputWrapper = styled.div`
  width: auto;
  margin: 10px;
`

const ErrorMessage = styled.p`
  ${fontStyles['14px']}
  color: red;
`

const FeelReasonListContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  flex-grow: 1;
`

const FeelReasonNewInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
