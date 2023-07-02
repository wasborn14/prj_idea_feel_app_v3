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
            <ItemWrapper>
              <TypeItem is_predict={feelItem.is_predict}>{feelItem.is_predict ? 'will' : 'record'}</TypeItem>
            </ItemWrapper>
            <Item>{feelItem.date}</Item>
            <ItemWrapper>
              <FeelItem color={feelColor[feelItem.value as FeelValue]}>
                {feelValue[feelItem.value as FeelValue]}
              </FeelItem>
            </ItemWrapper>
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
  border: 1px solid ${Color.DARK_RED1};
  border-radius: 5px;
`

const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${Color.DARK_RED1};
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
  border-bottom: 1px solid ${Color.DARK_RED1};
`

const Item = styled.div`
  width: 200px;
`

const ItemWrapper = styled.div`
  width: 150px;
`

const TypeItem = styled.div<{ is_predict: boolean }>`
  width: 70px;
  border-radius: 4px;
  text-align: center;
  color: white;
  ${({ is_predict }) => css`
    background-color: ${is_predict ? `${Color.PREDICT_COLOR}` : `${Color.RECORD_COLOR}`};
  `}
`

const FeelItem = styled.div<{ color: string }>`
  width: 100px;
  border-radius: 4px;
  text-align: center;
  color: white;
  ${({ color }) => css`
    background-color: ${color};
  `}
`

// const FeelItem = styled.div<{ color: string }>`
//   width: 200px;
//   ${({ color }) => css`
//     color: ${color};
//   `}
// `

const ReasonItem = styled.div`
  width: 200px;
  padding-left: 40px;
`

const MemoItem = styled.div`
  width: 600px;
`
