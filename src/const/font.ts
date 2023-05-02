import { pxToRem } from '@/utils/pxToRem'
import { css, FlattenSimpleInterpolation } from 'styled-components'

export type TextSize =
  | '10px'
  | '11px'
  | '12px'
  | '14px'
  | '16px'
  | '18px'
  | '20px'
  | '24px'
  | '28px'
  | '32px'
  | '36px'
  | '42px'

export const fontStyles: Record<TextSize, FlattenSimpleInterpolation> = {
  '10px': css`
    font-size: ${pxToRem(10)};
    line-height: ${pxToRem(14)};
  `,
  '11px': css`
    font-size: ${pxToRem(11)};
    line-height: ${pxToRem(15)};
  `,
  '12px': css`
    font-size: ${pxToRem(12)};
    line-height: ${pxToRem(17)};
  `,
  '14px': css`
    font-size: ${pxToRem(14)};
    line-height: ${pxToRem(20)};
  `,
  '16px': css`
    font-size: ${pxToRem(16)};
    line-height: ${pxToRem(22)};
  `,
  '18px': css`
    font-size: ${pxToRem(18)};
    line-height: ${pxToRem(25)};
  `,
  '20px': css`
    font-size: ${pxToRem(20)};
    line-height: ${pxToRem(28)};
  `,
  '24px': css`
    font-size: ${pxToRem(24)};
    line-height: ${pxToRem(32)};
  `,
  '28px': css`
    font-size: ${pxToRem(28)};
    line-height: ${pxToRem(36)};
  `,
  '32px': css`
    font-size: ${pxToRem(32)};
    line-height: ${pxToRem(40)};
  `,
  '36px': css`
    font-size: ${pxToRem(36)};
    line-height: ${pxToRem(44)};
  `,
  '42px': css`
    font-size: ${pxToRem(42)};
    line-height: ${pxToRem(50)};
  `
}
