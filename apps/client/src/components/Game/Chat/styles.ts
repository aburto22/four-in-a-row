import styled from "styled-components";
import { colors } from "@styles/cssVariables";

export const Section = styled.section`
  height: 100%;
  display: flex;
  align-items: center;
`;

export const Chat = styled.div`
  background-color: ${colors.blueDark};
  padding: 0.7rem;
  color: ${colors.snow};
  max-width: 25rem;
  margin: 0 auto;
  border-radius: 0.5rem;
`;

export const Messages = styled.div`
  background-color: ${colors.snow};
  color: ${colors.blueDark};
  height: 15rem;
  overflow: auto;
  padding: 0.5rem;
  margin-bottom: 0.7rem;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`;
