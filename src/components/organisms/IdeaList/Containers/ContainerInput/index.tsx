import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import React, { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { RESET_CATEGORY_ID } from '@/store/app/category'
import { actions as ideaListActions, ideaContainersDataSelector, ideaListDataSelector } from '@/store/domain/ideaList'
import { IdeaListModel } from '@/store/domain/ideaList/types'
import styled from 'styled-components'
import { Schema, schema } from './schema'
import { createNewTitle, createViewTitle } from '../../utilities'
import { Input } from '@/components/atoms/Forms/First/Input/Input'
import { usePutIdeaList } from '@/hooks/api/idea'

type Props = {
  isNew?: boolean
  label?: string
  onOutsideClick: () => void
}

export type FormProps = Schema & {}

export const ContainerInput = ({ isNew, label, onOutsideClick }: Props) => {
  const dispatch = useDispatch()
  const items = useSelector(ideaListDataSelector)
  const isFirstRender = useRef(true)
  const insideRef = useRef<HTMLDivElement>(null)
  const viewTitle = createViewTitle(label ?? '')
  const defaultValues: FormProps = {
    containerTitle: viewTitle
  }
  const router = useRouter()
  const categoryId = String(router.query['category-id'] ?? RESET_CATEGORY_ID)
  const containers = useSelector(ideaContainersDataSelector)
  const { mutate: putIdeaListMutate } = usePutIdeaList()

  const {
    getValues,
    handleSubmit,
    register
    // formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema)
  })

  // inputの開閉に関わるuseEffect
  useEffect(() => {
    const el = insideRef.current

    if (!el) return

    const hundleClickOutside = (e: MouseEvent) => {
      if (isFirstRender.current) {
        isFirstRender.current = false
        return
      }
      if (!el?.contains(e.target as Node)) {
        onOutsideClick()
      }
    }

    document.addEventListener('click', hundleClickOutside)

    return () => {
      document.removeEventListener('click', hundleClickOutside)
    }
  }, [insideRef, onOutsideClick])

  const createContainerTitle = () => {
    const inputTitle = getValues('containerTitle')
    if (inputTitle == '') {
      return
    }
    const newTitle = createNewTitle(inputTitle, items)

    const renamedItems = {
      ...items,
      [newTitle]: []
    }
    dispatch(ideaListActions.setIdeaContainersData({ ideaContainers: [...containers, newTitle] }))
    dispatch(ideaListActions.setIdeaListData({ ideaList: renamedItems }))
    putIdeaListMutate(
      { categoryId, items: renamedItems },
      {
        onSuccess: () => {
          onOutsideClick()
        },
        onError: () => console.error('put idea update error')
      }
    )
  }

  const updateContainerTitle = () => {
    const inputTitle = getValues('containerTitle')
    if (viewTitle == inputTitle) {
      onOutsideClick()
      return
    }
    const newTitle = createNewTitle(inputTitle, items)
    const renamedItems: IdeaListModel = {}
    const renamedContainers = []
    for (let id in items) {
      if (id !== label) {
        renamedItems[id] = items[id]
        renamedContainers.push(id)
      } else {
        renamedItems[newTitle] = items[id]
        renamedContainers.push(newTitle)
      }
    }
    dispatch(ideaListActions.setIdeaListData({ ideaList: renamedItems }))
    dispatch(ideaListActions.setIdeaContainersData({ ideaContainers: renamedContainers }))
    putIdeaListMutate(
      { categoryId, items: renamedItems },
      {
        onSuccess: () => {
          onOutsideClick()
        },
        onError: () => console.error('put idea update error')
      }
    )
  }

  return (
    <form
      onSubmit={handleSubmit(() => {
        isNew ? createContainerTitle() : updateContainerTitle()
      })}
    >
      <Wrapper className='inside' ref={insideRef}>
        <Input
          {...register('containerTitle', {
            onBlur: isNew ? createContainerTitle : updateContainerTitle
          })}
          autoComplete='text'
          placeholder='Enter List Title ...'
          autoFocus
        />
      </Wrapper>
    </form>
  )
}

const Wrapper = styled.div`
  height: 37px;
  display: flex;
  background-color: #fff;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
`
