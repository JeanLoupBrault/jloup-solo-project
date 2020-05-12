import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
body {
  margin: 0;
  padding: 0;
  background: #ffffff;

}

*,
*:before,
*:after {
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  font-family: 'Source Sans Pro', sans-serif;
}
`;
