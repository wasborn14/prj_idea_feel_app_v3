import { Color } from '@/const'
import { fontStyles } from '@/const/font'
import styled from 'styled-components'
import { Dispatch, SetStateAction, useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import 'rc-slider/assets/index.css'
import { Option } from 'react-dropdown'
import 'react-dropdown/style.css'
import { useSelector } from 'react-redux'
import { feelReasonSelectListDataSelector } from '@/store/domain/feelReasonSelectList'
import { FeelReasonModal } from '../FeelReasonModal'
import { ShortButton } from '@/components/atoms/Buttons/First/Button'
import { FormDropdown } from '@/components/atoms/Forms/Second/FormDropdown'
import { useGetFeelReasonSelectList } from '@/hooks/api/feel'

type Props = {
  selectReason: Option
  setSelectReason: Dispatch<SetStateAction<Option>>
}

export const ReasonSelect = ({ selectReason, setSelectReason }: Props) => {
  const feelReasonList = useSelector(feelReasonSelectListDataSelector)
  const [isFeelReasonModalVisible, setIsFeelReasonModalVisible] = useState(false)
  const { refetch } = useGetFeelReasonSelectList()

  const openFeelReasonModal = () => {
    setIsFeelReasonModalVisible(true)
  }

  const closeFeelReasonModal = () => {
    setIsFeelReasonModalVisible(false)
    refetch()
    // fetchFeelReasonSelectList()
    //   .then((res) => {
    //     dispatch(feelReasonSelectListActions.setFeelReasonSelectListData(res.data))
    //   })
    //   .catch((err) => {
    //     console.error(err.message)
    //   })
  }

  return (
    <Container>
      {isFeelReasonModalVisible && <FeelReasonModal onClick={closeFeelReasonModal} />}
      <ReasonWrapper>
        <DescriptionWrapper>
          <Description>Reason</Description>
        </DescriptionWrapper>
        <ShortButton onClick={openFeelReasonModal}>Create</ShortButton>
      </ReasonWrapper>
      <FormDropdown width={300} options={feelReasonList} selectReason={selectReason} onChange={setSelectReason} />
    </Container>
  )
}

const DescriptionWrapper = styled.div`
  margin-top: 4px;
`

const Description = styled.p`
  color: ${Color.LIGHT_GRAY2};
  ${fontStyles['16px']}
  margin-left: 4px;
  margin-bottom: 4px;
`

const ReasonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`

const Container = styled.div`
  margin-top: 12px;
  margin-left: 24px;
  align-items: center;
`
