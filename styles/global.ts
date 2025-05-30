import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: \${props => props.theme.background};
    color: \${props => props.theme.text};
    font-family: 'Segoe UI', sans-serif;
  }

  a {
    color: \${props => props.theme.primary};
    text-decoration: none;
  }

  input, select, button {
    border-radius: 4px;
    padding: 10px;
    font-size: 16px;
    margin-top: 8px;
    margin-bottom: 16px;
  }

  input, select {
    background-color: \${props => props.theme.surface};
    color: \${props => props.theme.text};
    border: 1px solid \${props => props.theme.border};
  }

  button {
    background-color: \${props => props.theme.primary};
    color: white;
    border: none;
    cursor: pointer;
  }

  button:hover {
    background-color: ${props => props.theme.hover};
  }
`;