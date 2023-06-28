import React from 'react'
import styled from 'styled-components'

export const FeelList = () => {
  const items = [
    { date: '2023/06/21', value: 'normal', reason: '--', memo: '特別に嬉しいことがあった' },
    { date: '2023/06/22', value: 'normal', reason: '--', memo: '楽しみにしていたゲームの発売日' },
    { date: '2023/06/23', value: 'very happy', reason: '--', memo: '789 Oak St' },
    { date: '2023/06/21', value: 'normal', reason: '--', memo: '特別に嬉しいことがあった' },
    { date: '2023/06/22', value: 'normal', reason: '--', memo: '楽しみにしていたゲームの発売日' },
    { date: '2023/06/23', value: 'very happy', reason: '--', memo: '789 Oak St' },
    { date: '2023/06/21', value: 'normal', reason: '--', memo: '特別に嬉しいことがあった' },
    { date: '2023/06/22', value: 'normal', reason: '--', memo: '楽しみにしていたゲームの発売日' },
    { date: '2023/06/23', value: 'very happy', reason: '--', memo: '789 Oak St' },
    { date: '2023/06/21', value: 'normal', reason: '--', memo: '特別に嬉しいことがあった' },
    { date: '2023/06/22', value: 'normal', reason: '--', memo: '楽しみにしていたゲームの発売日' },
    { date: '2023/06/23', value: 'very happy', reason: '--', memo: '789 Oak St' }
  ]

  return (
    <ListContainer>
      <ListHeader>
        <HeaderItem>Date</HeaderItem>
        <HeaderItem>Feel</HeaderItem>
        <HeaderItem>Reason</HeaderItem>
        <HeaderMemoItem>Memo</HeaderMemoItem>
      </ListHeader>
      {items.map((item, index) => (
        <ListItem key={index}>
          <Item>{item.date}</Item>
          <Item>{item.value}</Item>
          <Item>{item.reason}</Item>
          <MemoItem>{item.memo}</MemoItem>
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

const MemoItem = styled.div`
  width: 600px;
`
