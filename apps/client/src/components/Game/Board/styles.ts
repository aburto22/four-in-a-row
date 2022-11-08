import { colors } from "@styles/cssVariables";
import styled, { css } from "styled-components";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Message = styled.p`
  font-size: 2rem;
  color: ${colors.blueDark};
  text-shadow: 0 0 3px ${colors.snow};
`;

export const Board = styled.div`
  margin: 3.5rem 0 2rem;
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
