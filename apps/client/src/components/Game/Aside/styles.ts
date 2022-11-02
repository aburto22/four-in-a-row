import styled from "styled-components";
import { colors, dimensions } from "@styles/cssVariables";

export const Aside = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: ${dimensions.asideWidth};
  background-color: ${colors.blueDark};
  display: grid;
  grid-template-rows: 10rem 1fr;
  padding: 1rem;
  gap: 1rem;
`;
