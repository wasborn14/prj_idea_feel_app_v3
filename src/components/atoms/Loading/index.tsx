import { ZIndex } from '@/const'
import styled, { keyframes } from 'styled-components'

const lineSpinFadeLoader = keyframes`
    50%{
        opacity: 0.3;
    }
    100%{
        opacity: 1;
    }
`

const Wrapper = styled.div`
  z-index: ${ZIndex.Loading};
  flex: 0 1 auto;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 25%;
  min-height: 80px;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  display: flex;
`

const Container = styled.div`
  position: relative;
  top: -10px;
  left: -4px;
  div {
    animation-fill-mode: both;
    position: absolute;
    width: 5px;
    height: 15px;
    border-radius: 2px;
    margin: 2px;
    background-color: #666666;
  }
  & > div:nth-child(1) {
    top: 20px;
    left: 0;
    animation: ${lineSpinFadeLoader} 1.2s -0.08s infinite ease-in-out;
  }

  & > div:nth-child(2) {
    top: 17px;
    left: 10px;
    transform: rotate(-40deg);
    animation: ${lineSpinFadeLoader} 1.2s -0.16s infinite ease-in-out;
  }

  & > div:nth-child(3) {
    top: 10px;
    left: 17px;
    transform: rotate(-60deg);
    animation: ${lineSpinFadeLoader} 1.2s -0.24s infinite ease-in-out;
  }

  & > div:nth-child(4) {
    top: 0;
    left: 20px;
    transform: rotate(90deg);
    animation: ${lineSpinFadeLoader} 1.2s -0.32s infinite ease-in-out;
  }

  & > div:nth-child(5) {
    top: -10px;
    left: 17px;
    transform: rotate(60deg);
    animation: ${lineSpinFadeLoader} 1.2s -0.4s infinite ease-in-out;
  }

  & > div:nth-child(6) {
    top: -17px;
    left: 10px;
    transform: rotate(40deg);
    animation: ${lineSpinFadeLoader} 1.2s -0.48s infinite ease-in-out;
  }

  & > div:nth-child(7) {
    top: -20px;
    left: 0;
    animation: ${lineSpinFadeLoader} 1.2s -0.56s infinite ease-in-out;
  }

  & > div:nth-child(8) {
    top: -17px;
    left: -10px;
    transform: rotate(-40deg);
    animation: ${lineSpinFadeLoader} 1.2s -0.64s infinite ease-in-out;
  }

  & > div:nth-child(9) {
    top: -10px;
    left: -17px;
    transform: rotate(-60deg);
    animation: ${lineSpinFadeLoader} 1.2s -0.72s infinite ease-in-out;
  }

  & > div:nth-child(10) {
    top: 0;
    left: -20px;
    transform: rotate(90deg);
    animation: ${lineSpinFadeLoader} 1.2s -0.8s infinite ease-in-out;
  }
  & > div:nth-child(11) {
    top: 10px;
    left: -17px;
    transform: rotate(60deg);
    animation: ${lineSpinFadeLoader} 1.2s -0.88s infinite ease-in-out;
  }

  & > div:nth-child(12) {
    top: 17px;
    left: -10px;
    transform: rotate(40deg);
    animation: ${lineSpinFadeLoader} 1.2s 0s infinite ease-in-out;
  }
`

const Loading = () => (
  <Wrapper>
    <Container>
      {Array(12)
        .fill(0)
        .map((_, index) => (
          <div key={index} />
        ))}
    </Container>
  </Wrapper>
)

export default Loading
