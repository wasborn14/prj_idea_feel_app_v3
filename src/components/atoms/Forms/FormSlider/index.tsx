import { Color } from '@/const'
import styled, { css } from 'styled-components'
import 'react-datepicker/dist/react-datepicker.css'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { useIsSp } from '@/hooks/util/useIsSp'

const marks = {
  0: {
    style: {
      color: '#39a0b7'
    },
    label: <strong>-5</strong>
  },
  10: {
    style: {
      color: '#39a0b7'
    },
    label: <strong>-4</strong>
  },
  20: {
    style: {
      color: '#39a0b7'
    },
    label: <strong>-3</strong>
  },
  30: {
    style: {
      color: '#39a0b7'
    },
    label: <strong>-2</strong>
  },
  40: {
    style: {
      color: '#39a0b7'
    },
    label: <strong>-1</strong>
  },
  50: '0',
  60: {
    style: {
      color: 'orange'
    },
    label: <strong>1</strong>
  },
  70: {
    style: {
      color: 'orange'
    },
    label: <strong>2</strong>
  },
  80: {
    style: {
      color: 'orange'
    },
    label: <strong>3</strong>
  },
  90: {
    style: {
      color: 'orange'
    },
    label: <strong>4</strong>
  },
  100: {
    style: {
      color: 'orange'
    },
    label: <strong>5</strong>
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
  width: 340px;

  ${({ isSp }) =>
    isSp &&
    css`
      width: 320px;
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
