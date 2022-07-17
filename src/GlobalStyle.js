import { createGlobalStyle, css } from 'styled-components';

export const GlobalStyle = createGlobalStyle`${css`
  :root {
    --primary: #222831;
    --secondary: #393e46;
    --tertiary: #00adb5;
    --quaternary: #eeeeee;
  }
  body {
    background-color: var(--primary);
  }
`}`;
