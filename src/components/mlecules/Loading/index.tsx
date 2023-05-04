import Loading from '@/components/atoms/Loading'
import styled from 'styled-components'

interface Props {
  isLoading: boolean
}

export const LoadingCenter = ({ isLoading }: Props) => {
  return (
    <>
      {isLoading && (
        <Wrapper>
          <Loading />
        </Wrapper>
      )}
    </>
  )
}

const Wrapper = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`
