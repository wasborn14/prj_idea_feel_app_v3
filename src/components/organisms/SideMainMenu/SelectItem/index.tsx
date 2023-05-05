import Link from 'next/link'
import React from 'react'
import { useDispatch } from 'react-redux'
import { sp } from '@/media'
import styled from 'styled-components'
import { actions as pageTitleActions } from '@/store/app/page'
import { actions as categoryActions, RESET_CATEGORY_ID } from '@/store/app/category'

export const SelectItem = () => {
  const dispatch = useDispatch()
  const handleClickPageTitle = () => {
    dispatch(categoryActions.setSelectCategoryId({ selectCategoryId: RESET_CATEGORY_ID }))
    dispatch(pageTitleActions.setPageTitle({ title: 'Feel' }))
  }

  return (
    <Link href='/idea/feel' onClick={handleClickPageTitle} passHref>
      <Wrapper>
        <Text>Feel</Text>
      </Wrapper>
    </Link>
  )
}

const Wrapper = styled.div`
  padding: 6px 10px;
  ${sp`
    padding: 12px 10px;
  `}
  &:hover {
    background-color: #a0540e13;
  }
`

const Text = styled.span`
  color: #222;
  padding-left: 0.5rem;
  user-select: none;
`
