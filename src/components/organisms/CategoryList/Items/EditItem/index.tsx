import { yupResolver } from '@hookform/resolvers/yup'
import React, { forwardRef, HTMLAttributes } from 'react'
import { useForm } from 'react-hook-form'
import { pc } from '@/media'
import styled from 'styled-components'
import { schema, Schema } from '../../schema'
import { CategoryInput } from '@/components/atoms/Forms/CategoryInput'
import { Color } from '@/const'

export interface Props extends Omit<HTMLAttributes<HTMLLIElement>, 'id'> {
  id: string
  value: string
  depth: number
  indentationWidth: number
  handleEditItem?: (id: string, title: string) => void
  handleCloseInput: () => void
}

export type FormProps = Schema & {}

export const EditItem = forwardRef<HTMLDivElement, Props>(
  ({ id, value, depth, indentationWidth, handleEditItem, handleCloseInput, style, ...props }, ref) => {
    const defaultValues: FormProps = {
      itemTitle: value
    }

    const {
      getValues,
      handleSubmit,
      register
      // formState: { errors },
    } = useForm({
      defaultValues: defaultValues,
      resolver: yupResolver(schema)
    })

    const editItemTitle = () => {
      if (getValues('itemTitle') === '') {
        handleCloseInput()
        return
      }
      handleEditItem && handleEditItem(id, getValues('itemTitle'))
      handleCloseInput()
    }

    return (
      <Wrapper
        style={
          {
            '--spacing': `${indentationWidth * depth}px`
          } as React.CSSProperties
        }
        {...props}
      >
        <form
          onSubmit={handleSubmit(() => {
            editItemTitle()
          })}
        >
          <InputWrapper className='TreeItem' ref={ref} style={style}>
            <CategoryInput
              {...register('itemTitle', {
                onBlur: editItemTitle
              })}
              autoComplete='text'
              placeholder='Enter Title ...'
              autoFocus
            />
          </InputWrapper>
        </form>
      </Wrapper>
    )
  }
)

const Wrapper = styled.li`
  list-style: none;
  box-sizing: border-box;
  padding-left: var(--spacing);
  margin-bottom: -1px;
  overflow: hidden;
`

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 7px 5px;
  ${pc`
    padding: 2px 14px;
  `}
  color: ${Color.BLACK};
  box-sizing: border-box;
  overflow: hidden;
`
