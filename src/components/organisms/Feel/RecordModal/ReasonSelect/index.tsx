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
import { VeryShortButton } from '@/components/atoms/Buttons/Button'
import { FormDropdown } from '@/components/atoms/Forms/FormDropdown'
import { useGetFeelReasonSelectList } from '@/hooks/api/feel'
import { pc, sp } from '@/media'
import { useIsSp } from '@/hooks/util/useIsSp'

type Props = {
  selectReason: Option
  setSelectReason: Dispatch<SetStateAction<Option>>
}

export const ReasonSelect = ({ selectReason, setSelectReason }: Props) => {
  const feelReasonList = useSelector(feelReasonSelectListDataSelector)
  const [isFeelReasonModalVisible, setIsFeelReasonModalVisible] = useState(false)
  const { refetch } = useGetFeelReasonSelectList()
  const isSp = useIsSp()

  const openFeelReasonModal = () => {
    setIsFeelReasonModalVisible(true)
  }

  const closeFeelReasonModal = () => {
    setIsFeelReasonModalVisible(false)
    refetch()
  }

  return (
    <Container>
      {isFeelReasonModalVisible && <FeelReasonModal onClick={closeFeelReasonModal} />}
      <ReasonWrapper>
        <DescriptionWrapper>
          <Description>Reason</Description>
        </DescriptionWrapper>
        <VeryShortButton onClick={openFeelReasonModal}>Create</VeryShortButton>
      </ReasonWrapper>
      <FormDropdown
        width={isSp ? 280 : 300}
        options={feelReasonList}
        selectReason={selectReason}
        onChange={setSelectReason}
      />
    </Container>
  )
}

const Container = styled.div`
  ${pc`
      margin-top: 12px;
      margin-left: 24px;
  `}
  ${sp`
    margin-top: 24px;
  `}
`

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
