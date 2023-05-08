import { UniqueIdentifier } from '@dnd-kit/core'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import React, { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { RESET_CATEGORY_ID } from '@/store/app/category'
import { actions as ideaListActions, ideaListDataSelector } from '@/store/domain/ideaList'
import styled from 'styled-components'
import { createNewTitle, createViewTitle } from '../../utilities'
import { schema, Schema } from './schema'
import { Input } from '@/components/atoms/Forms/Input/Input'
import { usePutIdeaList } from '@/hooks/api/idea'
import { Color } from '@/const'

type Props = {
  isNew?: boolean
  value?: UniqueIdentifier
  containerId: UniqueIdentifier
  onInputClose: () => void
}

export type FormProps = Schema & {}

export const ItemInput = ({ isNew, value, containerId, onInputClose }: Props) => {
  const dispatch = useDispatch()
  const items = useSelector(ideaListDataSelector)
  const isFirstRender = useRef(true)
  const insideRef = useRef<HTMLDivElement>(null)
  const prevItemTitle = value?.toString() ?? ''
  const viewTitle = createViewTitle(prevItemTitle)
  const defaultValues: FormProps = {
    itemTitle: viewTitle
  }

  const router = useRouter()
  const categoryId = String(router.query['category-id'] ?? RESET_CATEGORY_ID)
  const { mutate: putIdeaListMutate } = usePutIdeaList()

  const {
    getValues,
    handleSubmit,
    register,
    reset
    // formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    const el = insideRef.current

    if (!el) return

    const hundleClickOutside = (e: MouseEvent) => {
      if (isFirstRender.current) {
        isFirstRender.current = false
        return
      }
      if (!el?.contains(e.target as Node)) {
        onInputClose()
      }
    }

    document.addEventListener('click', hundleClickOutside)

    return () => {
      document.removeEventListener('click', hundleClickOutside)
    }
  }, [insideRef, onInputClose])

  const createItemTitle = () => {
    const inputTitle = getValues('itemTitle')
    if (inputTitle === '') {
      return
    }
    const newTitle = createNewTitle(inputTitle, items)

    const renamedItems = {
      ...items,
      [containerId]: [...items[containerId], newTitle]
    }
    putIdeaListMutate(
      { categoryId, items: renamedItems },
      {
        onSuccess: () => {
          dispatch(ideaListActions.setIdeaListData({ ideaList: renamedItems }))
          reset()
        },
        onError: () => console.error('put idea update error')
      }
    )
  }

  const updateItemTitle = () => {
    const inputTitle = getValues('itemTitle')
    if (viewTitle == inputTitle) {
      onInputClose()
      return
    }
    const newTitle = createNewTitle(inputTitle, items)

    const currentItems = items[containerId]
    const itemIndex = currentItems.indexOf(prevItemTitle)
    const renamedItems = {
      ...items,
      [containerId]: [
        ...items[containerId].slice(0, itemIndex),
        newTitle,
        ...items[containerId].slice(itemIndex + 1, items[containerId].length)
      ]
    }
    dispatch(ideaListActions.setIdeaListData({ ideaList: renamedItems }))
    putIdeaListMutate(
      { categoryId, items: renamedItems },
      {
        onSuccess: () => {
          onInputClose()
        },
        onError: () => console.error('put idea update error')
      }
    )
  }

  return (
    <Wrapper>
      <form
        onSubmit={handleSubmit(() => {
          isNew ? createItemTitle() : updateItemTitle()
        })}
      >
        <InputWrapper className='inside' ref={insideRef}>
          <Input
            {...register('itemTitle', {
              onBlur: isNew ? createItemTitle : updateItemTitle
            })}
            autoComplete='text'
            placeholder='Enter Title ...'
            autoFocus
            paddingHorizontal={8}
          />
        </InputWrapper>
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
`

const InputWrapper = styled.div`
  height: 37px;
  width: 100%;
  display: flex;
  background-color: ${Color.WHITE};
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom: 1px solid ${Color.TRANSPARENT_BLACK_10};
`
