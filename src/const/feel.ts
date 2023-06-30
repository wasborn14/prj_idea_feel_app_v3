import { Color } from '.'

export type FeelValue = 1 | 2 | 3 | 4 | 5

export const feelValue: Record<FeelValue, string> = {
  1: 'very unhappy',
  2: 'unhappy',
  3: 'normal',
  4: 'happy',
  5: 'very happy'
}

export const feelColor: Record<FeelValue, string> = {
  1: Color.FEEL_VERY_UNHAPPY_COLOR,
  2: Color.FEEL_UNHAPPY_COLOR,
  3: Color.FEEL_NORMAL_COLOR,
  4: Color.FEEL_HAPPY_COLOR,
  5: Color.FEEL_VERY_HAPPY_COLOR
}
