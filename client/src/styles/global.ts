import { createGlobalStyle } from "styled-components";
import { colors } from "./cssVariables";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: ${colors.blueDark};
    background: radial-gradient(circle at 50% 50%, ${colors.yellowOrange}, ${colors.yellowOrangeDarker});
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: inherit;
    font-family: inherit;
    font-size: inherit
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  input {
    border: none;
  }

  ul {
    list-style: none;
  }

  h1, h2, h3, h4, h5, h6 {
    font-size: inherit;
    font-weight: inherit;
  }
`;

export default GlobalStyle;
