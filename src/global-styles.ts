import { createGlobalStyle } from 'styled-components'
import { pxToRem } from './utils/pxToRem'

export const GlobalStyles = createGlobalStyle`
  /* Box sizing rules */
  *,
  *::before,
  *::after {
  box-sizing: border-box;
  }

  /* Remove default margin */
  body,
  h1,
  h2,
  h3,
  h4,
  p,
  figure,
  blockquote,
  dl,
  dd,
  input {
      margin: 0;
  }

  input {
      padding: 0;
  }

  h1,
  h2,
  h3,
  h4 {
      font-weight: normal;
  }

  html {
      font-size: 62.5%;
      text-size-adjust: 100%;
  }

  body {
      min-height: 100vh;
      text-rendering: optimizeSpeed;
      line-height: 1.5;
      font-size: ${pxToRem(16)};
      font-family: "Times New Roman", Times, serif;
  }

  a {
      text-decoration-skip-ink: auto;
      text-decoration: none;
  }

  img,
  picture {
      max-width: 100%;
      display: block;
  }

  input,
  button,
  textarea,
  select {
      font: inherit;
      outline: none;
      border: none;
      appearance: none;
  }

  button {
      border: 0;
      background: transparent;
  }
  `
