import { Color } from '@/const'
import { FeelValue, feelColor, feelValue } from '@/const/feel'
import { useGetFeelListData } from '@/hooks/api/feel'
import React from 'react'
import styled, { css } from 'styled-components'

type FeelItem = {
  date: string
  value: number
  reason: string
  is_predict: boolean
  memo: string
}

export const FeelList = () => {
  const { data: feelListData, status } = useGetFeelListData()
  const feelListItems: FeelItem[] = feelListData?.data ?? []

  return (
    <ListContainer>
      <ListHeader>
        <HeaderTypeItem>Type</HeaderTypeItem>
        <HeaderItem>Date</HeaderItem>
        <HeaderItem>Feel</HeaderItem>
        <HeaderItem>Reason</HeaderItem>
        <HeaderMemoItem>Diary</HeaderMemoItem>
      </ListHeader>
      {status === 'success' &&
        feelListItems.map((feelItem, index) => (
          <ListItem key={index}>
            <TypeItem is_predict={feelItem.is_predict}>{feelItem.is_predict ? 'will' : 'record'}</TypeItem>
            <Item>{feelItem.date}</Item>
            <FeelItem color={feelColor[feelItem.value as FeelValue]}>{feelValue[feelItem.value as FeelValue]}</FeelItem>
            <ReasonItem>{feelItem.reason.length > 0 ? feelItem.reason : '-'}</ReasonItem>
            <MemoItem>{feelItem.memo}</MemoItem>
          </ListItem>
        ))}
    </ListContainer>
  )
}

const ListContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f8f8f8;
`

const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #eee;
  border-bottom: 1px solid #ccc;
`

const HeaderItem = styled.div`
  width: 200px;
  padding: 10px;
`

const HeaderTypeItem = styled.div`
  width: 150px;
  padding: 10px;
`

const HeaderMemoItem = styled.div`
  width: 600px;
  padding: 10px;
`

const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ccc;
`

const Item = styled.div`
  width: 200px;
`

const TypeItem = styled.div<{ is_predict: boolean }>`
  width: 150px;
  ${({ is_predict }) => css`
    color: ${is_predict ? `${Color.PREDICT_COLOR}` : `${Color.RECORD_COLOR}`};
  `}
`

const FeelItem = styled.div<{ color: string }>`
  width: 200px;
  ${({ color }) => css`
    color: ${color};
  `}
`

const ReasonItem = styled.div`
  width: 200px;
  padding-left: 30px;
`

const MemoItem = styled.div`
  width: 600px;
`
