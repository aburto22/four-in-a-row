import { dimensions } from "@styles/cssVariables";
import styled from "styled-components";

export const App = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 5rem 1fr;
  padding: 1rem;
  margin-left: ${dimensions.asideWidth};
`;
