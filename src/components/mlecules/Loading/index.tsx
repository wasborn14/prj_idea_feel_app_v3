import Loading from '@/components/atoms/Loading'
import styled from 'styled-components'

interface Props {
  loading: boolean
}

export const LoadingCenter = ({ loading }: Props) => {
  return (
    <>
      {loading && (
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
