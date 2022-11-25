import { colors } from "@styles/cssVariables";
import styled, { css } from "styled-components";

interface ColumnProps {
  disabled?: boolean;
}

export const Column = styled.button<ColumnProps>`
  position: relative;
  padding: 0.3rem;
  border: 1px solid black;
  display: flex;
  gap: 0.5rem;
  flex-direction: column-reverse;
  cursor: pointer;

  :hover {
    background-color: ${colors.boardHover};
  }

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: default;

      :hover {
        background-color: inherit;
      }
    `}
`;
