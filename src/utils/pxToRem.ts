/**
 * html要素のフォントサイズを10px(font-size:62.5%とする)
 * 10pxを1remに変換する
 * see:global-styles.ts
 */

const BASE_SIZE = 10
export const pxToRem = (px: number) => `${px / BASE_SIZE}rem`
