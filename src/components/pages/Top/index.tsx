import { useGetTestQuery } from '@/hooks/api/test'
import styled from 'styled-components'

export const Top = () => {
  const { data, isLoading, isError, error, status } = useGetTestQuery()

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <Container>
      <h1>Ifee App</h1>
      <div>
        <h2>ユーザ一覧</h2>
        <div>
          {data.map((user) => (
            <div key={user.id}>{user.name}</div>
          ))}
        </div>
      </div>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
