import styled from "styled-components";
import { colors } from "@styles/cssVariables";

export const Chat = styled.div`
  color: ${colors.snow};
  height: 100%;
  display: grid;
  grid-template-rows: 1fr auto;
  gap: 0.7rem;
  width: 100%;
  overflow: hidden;
`;

export const Messages = styled.div`
  background-color: ${colors.snow};
  color: ${colors.blueDark};
  overflow: auto;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`;
