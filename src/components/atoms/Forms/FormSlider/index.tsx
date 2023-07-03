import { Color } from '@/const'
import styled, { css } from 'styled-components'
import 'react-datepicker/dist/react-datepicker.css'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { useIsSp } from '@/hooks/util/useIsSp'
import { fontStyles } from '@/const/font'

const TextWrapper = styled.div`
  position: relative;
`

const Text = styled.div`
  position: absolute;
  top: 14px;
  left: -20px;
  transform: rotate(-8deg);
  ${fontStyles['14px']}
  font-weight: bold;
`

const TwoLineText = styled.div`
  position: absolute;
  top: 4px;
  left: -20px;
  transform: rotate(-8deg);
  ${fontStyles['14px']}
  font-weight: bold;
`

const marks = {
  0: {
    style: {
      color: `${Color.FEEL_VERY_UNHAPPY_COLOR}`
    },
    label: (
      <TextWrapper>
        <TwoLineText>very unhappy</TwoLineText>
      </TextWrapper>
    )
  },
  25: {
    style: {
      color: `${Color.FEEL_UNHAPPY_COLOR}`
    },
    label: (
      <TextWrapper>
        <Text>unhappy</Text>
      </TextWrapper>
    )
  },
  50: {
    style: {
      color: `${Color.FEEL_NORMAL_COLOR}`
    },
    label: (
      <TextWrapper>
        <Text>normal</Text>
      </TextWrapper>
    )
  },
  75: {
    style: {
      color: `${Color.FEEL_HAPPY_COLOR}`
    },
    label: (
      <TextWrapper>
        <Text>happy</Text>
      </TextWrapper>
    )
  },
  100: {
    style: {
      color: `${Color.FEEL_VERY_HAPPY_COLOR}`
    },
    label: (
      <TextWrapper>
        <TwoLineText>very happy</TwoLineText>
      </TextWrapper>
    )
  }
}

type Props = {
  sliderValue: number
  onChange: (value: number) => void
}

export const FormSlider = ({ sliderValue, onChange }: Props) => {
  const isSp = useIsSp()

  return (
    <Container isSp={isSp}>
      <Slider
        min={0}
        marks={marks}
        step={null}
        value={sliderValue}
        onChange={(value) => {
          if (typeof value === 'number') {
            onChange(value)
          }
        }}
      />
    </Container>
  )
}

const Container = styled.div<{ isSp: boolean }>`
  width: 400px;

  ${({ isSp }) =>
    isSp &&
    css`
      width: 270px;
    `}

  .rc-slider-rail {
    background-color: ${Color.LIGHT_BROWN};
  }
  .rc-slider-track {
    background-color: ${Color.DARK_BROWN1};
  }
  .rc-slider-dot {
    border: solid 2px ${Color.DARK_BROWN1};
  }
  .rc-slider-handle {
    border: solid 2px ${Color.DARK_BROWN1};
  }
  .rc-slider-mark-text {
    font-size: 20px;
    color: black;

    ${({ isSp }) =>
      isSp &&
      css`
        font-size: 16px;
      `}
  }
`
