import { colors } from "@styles/cssVariables";
import styled, { css } from "styled-components";

export const Container = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Board = styled.div`
  margin: 2rem 0;
  display: flex;
  background-color: ${colors.board};
  border: 5px solid ${colors.boardBorder};
`;

interface ButtonProps {
  disabled?: boolean;
}

export const Button = styled.button<ButtonProps>`
  padding: 0.5rem 1rem;
  background-color: red;

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: default;
      opacity: 0.7;
    `}
`;
