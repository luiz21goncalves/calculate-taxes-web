import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --white: #ffffff;

  --gray-100: #F5F8FA;
  --gray-300: #A0ACB2;
  --gray-500: #617480;
  
  --red-500: #F25D27;
  --blue-500: #123952;
}

@media (max-width: 1080px) {
  html {
    font-size: 93.75%;
  }
}

@media (max-width: 720px) {
  html {
    font-size: 87.5%;
  }
}

body {
  background: var(--gray-100);
  color: var(--gray-500);
}

body, input, textarea, select, button {
  font: 400 1rem 'Roboto Slab', sans-serif; 
}

#__next, body, html {
  width: 100%;
}

button {
  cursor: pointer;
}

a {
  color: inherit;
  text-decoration: none;
}

`;
