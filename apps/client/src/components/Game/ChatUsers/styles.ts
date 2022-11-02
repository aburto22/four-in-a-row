import { colors } from "@styles/cssVariables";
import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
`;

export const Users = styled.ul`
  height: 100%;
  background-color: ${colors.snow};
  padding: 0.1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

export const User = styled.li`
  display: flex;
  gap: 0.3rem;
  align-items: center;
  padding: 0.3rem;

  :first-child {
    background-color: ${colors.blueDark};
    color: ${colors.snow};
  }
`;
