import { yupResolver } from '@hookform/resolvers/yup'
import React, { forwardRef, HTMLAttributes, useState } from 'react'
import { useForm } from 'react-hook-form'
import { pc } from '@/media'
import styled from 'styled-components'
import { schema, Schema } from './schema'
import { CategoryInput } from '@/components/atoms/Forms/Second/CategoryInput'

export interface Props extends Omit<HTMLAttributes<HTMLLIElement>, 'id'> {
  depth: number
  indentationWidth: number
  handleCreateItem: (title: string) => void
}

export type FormProps = Schema & {}

export const InputItem = forwardRef<HTMLDivElement, Props>(
  ({ depth, indentationWidth, handleCreateItem, style, ...props }, ref) => {
    const [isInput, setIsInput] = useState(false)

    const defaultValues: FormProps = {
      itemTitle: ''
    }

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

    const createItemTitle = () => {
      if (getValues('itemTitle') === '') {
        setIsInput(false)
        return
      }
      handleCreateItem(getValues('itemTitle'))
      reset()
      setIsInput(false)
    }

    return (
      <>
        {isInput ? (
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
                createItemTitle()
              })}
            >
              <InputWrapper className='TreeItem' ref={ref} style={style}>
                <CategoryInput
                  {...register('itemTitle', {
                    onBlur: createItemTitle
                  })}
                  autoComplete='text'
                  placeholder='Enter Title ...'
                  autoFocus
                />
              </InputWrapper>
            </form>
          </Wrapper>
        ) : (
          <Wrapper
            style={
              {
                '--spacing': `${indentationWidth * depth}px`
              } as React.CSSProperties
            }
            {...props}
            onClick={() => {
              setIsInput(!isInput)
            }}
          >
            <TreeItem className='TreeItem' ref={ref} style={style}>
              <Text>+ Add</Text>
            </TreeItem>
          </Wrapper>
        )}
      </>
    )
  }
)

const Wrapper = styled.li`
  list-style: none;
  box-sizing: border-box;
  padding-left: var(--spacing);
  margin-bottom: -1px;
`

const TreeItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 12px 10px;
  ${pc`
    padding: 6px 10px; 
  `}
  background-color: transparent;
  color: #222;
  box-sizing: border-box;
`

const Text = styled.span`
  flex-grow: 1;
  padding-left: 0.5rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  user-select: none;
`

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 7px 5px;
  ${pc`
    padding: 2px 14px;
  `}
  color: #222;
  box-sizing: border-box;
  overflow: hidden;
`
